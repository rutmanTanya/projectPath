import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateReport() {
    // State for form fields
    const [formData, setFormData] = useState({
        report_name: "",
        report_date: "",
        details: "",
        employee_id: "",
    });

    const navigate = useNavigate(); // Redirect after submission

    // Handle input changes (controlled inputs)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send data to the backend
        axios.post("http://localhost:4000/api/reports", formData)
            .then(() => {
                alert("Report submitted successfully!");
                navigate("/archive"); // Redirect after submission
            })
            .catch((error) => console.error("Error adding report:", error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Report Name:
                <input
                    type="text"
                    name="report_name"
                    value={formData.report_name}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Report Date:
                <input
                    type="datetime-local"
                    name="report_date"
                    value={formData.report_date}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Details:
                <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                />
            </label>

            <label>
                Employee ID:
                <input
                    type="number"
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                />
            </label>

            <button type="submit">Submit</button>
        </form>
    );
}

export default CreateReport;
