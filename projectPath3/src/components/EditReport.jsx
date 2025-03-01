import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditReport() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editReport, setEditReport] = useState(null);
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        axios
            .get(`http://localhost:4000/api/reports/${id}`)
            .then((res) => {
                if (res.data) {
                    const reportData = res.data;

                    if (reportData.report_date) {
                        const dateObj = new Date(reportData.report_date);
                        reportData.report_date = dateObj.toISOString().slice(0, 16);
                    }

                    setEditReport(reportData);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching report data:", error);
                setError("Failed to fetch report data.");
                setLoading(false);
            });
    };

    const updateReport = (reportToSend) => {
        axios
            .put(`http://localhost:4000/api/reports/${id}`, reportToSend)
            .then(() => {
                setMsg("Report was updated successfully.");
                setTimeout(() => {
                    setMsg("");
                    navigate("/archive");
                }, 2000);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("Failed to update the report.");
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditReport((prevReport) => ({
            ...prevReport,
            [name]: value,
        }));
    };

    const cleanString = (str) => str.trim().replace(/\s+/g, " ");

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date().toISOString().slice(0, 16);

        if (!editReport) return;

        const cleanedReport = {
            report_name: cleanString(editReport.report_name),
            report_date: editReport.report_date,
            employee_id: editReport.employee_id,
            details: cleanString(editReport.details),
        };

        if (!cleanedReport.report_name || !cleanedReport.report_date || !cleanedReport.employee_id || !cleanedReport.details) {
            setError("Please fill in all required fields.");
            return;
        }
        if (cleanedReport.report_name.length < 5) {
            setError("Report name must be at least 5 characters long.");
            return;
        }

        if (!cleanedReport.report_date || cleanedReport.report_date > now) {
            setError("Report date must be today or earlier.");
            return;
        }

        if (isNaN(cleanedReport.employee_id) || cleanedReport.employee_id <= 0) {
            setError("Employee ID must be a positive number.");
            return;
        }

        if (cleanedReport.details.length < 11) {
            setError("Details must be at least 11 characters long.");
            return;
        }

        setError("");
        updateReport(cleanedReport);
    };

    if (loading) {
        return <div>Loading report data...</div>;
    }

    return (
        <div className="main">
            <div className="edit-report">
                <h2>Edit Report</h2>
                {error && <p className="error-message">{error}</p>}
                {msg && <p className="success-msg">{msg}</p>}
                {editReport && (
                    <form className="edit-report-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Report Name:</label>
                            <input
                                type="text"
                                name="report_name"
                                value={editReport.report_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Report Date:</label>
                            <input
                                type="datetime-local"
                                name="report_date"
                                value={editReport.report_date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Employee ID:</label>
                            <input
                                type="number"
                                name="employee_id"
                                value={editReport.employee_id}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Details:</label>
                            <textarea
                                name="details"
                                value={editReport.details}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default EditReport;
