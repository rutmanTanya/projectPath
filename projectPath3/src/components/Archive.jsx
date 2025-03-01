import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Archive() {
    const [reports, setReports] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios
            .get("http://localhost:4000/api/reports") // Fetch reports from backend
            .then((res) => {
                setReports(res.data);
                console.log(res.data); 
            })
            .catch((error) => {
                console.error("Error:", error);
                setMsg("Failed to fetch reports.");
            });
    };

    return (
        <div className="main">
            <section>
                <div className="container-Archive">
                    <div className="archivePageContainer">
                        <h1 className="archive-page-title">
                            Here you can view archived reports
                        </h1>
                        <div className="create-report">
                            <Link to="/create-report" className="btn">
                                New Report
                            </Link>
                        </div>
                        <div className="msg">{msg}</div>
                        <div className="report-containers">
                            {reports &&
                                reports.map((report) => (
                                    <div key={report.id} className="report-card">
                                        <h1 className="report-title">{report.id}</h1>
                                        <h2 className="report-title">{report.report_name}</h2>
                                        <p className="report-p">{report.report_date}</p>
                                        <Link to={`/report/${report.id}`} className="view-button mr1">
                                            View
                                        </Link>
                                        <Link to={`/edit-report/${report.id}`} className="edit-button">
                                            Edit
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Archive;