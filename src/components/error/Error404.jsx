import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div className="container" style={{textAlign: "center"}}>
            <img alt="Error 404" src="https://image.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg" />
            <br/>
            <Link to='/home' className="btn btn-dark">Go to home page.</Link>
        </div>
    )
}