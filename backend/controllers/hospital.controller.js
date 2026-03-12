import Hospital from "../models/hospital.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// a. Register Hospital
async function registerHospital(req, res) {

  try {

    let hospitalData = req.body

    const existingHospital = await Hospital.findOne({ email: hospitalData.email })

    if (existingHospital) {
      return res.status(400).send({
        message: "Hospital already registered"
      })
    }

    hospitalData.password = bcrypt.hashSync(hospitalData.password, 10)

    hospitalData = await Hospital.create(hospitalData)

    res.send(hospitalData)

  } catch (error) {

    res.status(400).send({
      message: "Hospital not registered",
      error: error.message
    })

  }

}



// b. Login Hospital
async function loginHospital(req, res) {

  try {

    const { email, password } = req.body

    const hospital = await Hospital.findOne({ email })

    if (!hospital) {
      return res.status(404).send({
        message: "Hospital not found"
      })
    }

    const validPassword = bcrypt.compareSync(password, hospital.password)

    if (!validPassword) {
      return res.status(401).send({
        message: "Invalid credentials"
      })
    }

    const token = jwt.sign(
      { id: hospital._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.send({
      message: "Login successful",
      token,
      hospital
    })

  } catch (error) {

    res.status(500).send({
      message: "Login failed"
    })

  }

}



// c. Get all hospitals
async function getAllHospitals(req, res) {

  try {

    const hospitals = await Hospital.find().select("-password")

    res.send(hospitals)

  } catch (error) {

    res.status(500).send({
      message: "Error fetching hospitals"
    })

  }

}



// d. Get single hospital
async function getSingleHospital(req, res) {

  try {

    const hospital = await Hospital.findById(req.params.id)
      .select("-password")

    res.send(hospital)

  } catch (error) {

    res.status(500).send({
      message: "Hospital not found"
    })

  }

}



// e. Update hospital
async function updateHospital(req, res) {

  try {

    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after" }
    )

    res.send(hospital)

  } catch (error) {

    res.status(400).send({
      message: "Hospital not updated",
      error: error.message
    })

  }

}



// f. Delete hospital
async function deleteHospital(req, res) {

  try {

    await Hospital.findByIdAndDelete(req.params.id)

    res.send({
      message: "Hospital deleted successfully"
    })

  } catch (error) {

    res.status(500).send({
      message: "Hospital not deleted"
    })

  }

}



export {
  registerHospital,
  loginHospital,
  getAllHospitals,
  getSingleHospital,
  updateHospital,
  deleteHospital
}