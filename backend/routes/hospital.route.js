import express from "express"

import {
  registerHospital,
  loginHospital,
  getAllHospitals,
  getSingleHospital,
  updateHospital,
  deleteHospital
} from "../controllers/hospital.controller.js"

const router = express.Router()


// AUTH
router.post("/register", registerHospital)
router.post("/login", loginHospital)


// CRUD
router.get("/", getAllHospitals)
router.get("/:id", getSingleHospital)
router.put("/:id", updateHospital)
router.delete("/:id", deleteHospital)


export default router