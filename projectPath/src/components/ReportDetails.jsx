import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/reports/${id}`)
            .then((res) => setReport(res.data))
            .catch(() => setReport(null));
    }, [id]);

    if (!report) return <p>Loading or Report not found...</p>;

    return (
        <div>
            <h1>Report Details</h1>
            <p>Report Name: {report.report_name}</p>
            <p>Report Date: {report.report_date}</p>
            <p>Details: {report.details || "No details"}</p>
            <p>Employee ID: {report.employee_id}</p>
            <Link to="/archive">Back</Link>
        </div>
    );
}

export default ReportDetails;
