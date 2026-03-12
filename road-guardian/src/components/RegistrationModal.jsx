import { useState } from "react";

export default function RegistrationModal({ onClose }) {

  const [formData, setFormData] = useState({
    hospital_name: "",
    city: "",
    contact_number: "",
    email: "",
    password: "",
    latitude: "",
    longitude: ""
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function getLocation() {

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setFormData({
          ...formData,
          latitude: lat,
          longitude: lng
        });

        setLoadingLocation(false);
      },

      () => {
        alert("Unable to retrieve your location");
        setLoadingLocation(false);
      }
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Hospital Registration Data:", formData);

    // Later you will send this to Supabase
    // supabase.from("hospitals").insert([formData])

    alert("Hospital Registered Successfully");

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>🏥 Hospital Registration</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="hospital_name"
            placeholder="Hospital Name"
            required
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            required
            onChange={handleChange}
          />

          <input
            name="contact_number"
            placeholder="Contact Number"
            required
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Emergency Email"
            required
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={getLocation}
            style={{ marginTop: "10px" }}
          >
            {loadingLocation ? "Getting Location..." : "📍 Get Current Location"}
          </button>

          <input
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            readOnly
          />

          <input
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            readOnly
          />

          <div className="modal-actions">

            <button type="submit">
              Register
            </button>

            <button type="button" onClick={onClose}>
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}