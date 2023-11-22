import React from "react";
import "./NotFound.css";

function NotFound() {
    return (
        <div className="error-container">
        <p className="not-found-404">404</p>
        <p className="error-msg">Oups! La page que vous demandez n'existe pas.</p>
        </div>
    );
}

export default NotFound;
