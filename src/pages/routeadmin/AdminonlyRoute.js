import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { selectEmail } from "../../redux/slice/authSlice";
var userAdmin = sessionStorage.getItem("roles")

const AdminonlyRoute = ({ children }) => {
    //   const userEmail = useSelector(selectEmail);
    // sessionStorage.setItem("roles",data.data[0].roles)


    if (userAdmin === "admin") {
        return children;
    }
    return (
        <section style={{ height: "80vh" }}>
            <div className="container">
                <h2>Permission Denied.</h2>
                <p>This page can only be view by an Admin user.</p>
                <br />
                <Link to="/">
                    <button className="--btn">&larr; Back To Home</button>
                </Link>
            </div>
        </section>
    );
};

export const AdminOnlyLink = ({ children }) => {
    //   const userEmail = useSelector(selectEmail);

    if (userAdmin === "admin") {
        return children;
    }
    return null;
};

export default AdminonlyRoute;
