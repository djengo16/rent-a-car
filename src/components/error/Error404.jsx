import { Link } from "react-router-dom";

export default function Error404() {
    return (
        <div className="container" style={{textAlign: "center"}}>
            <img src="https://doyouconvert.com/wp-content/uploads/2018/04/404_Error.jpg" />
            <br/>
            <Link to='/home' className="btn btn-dark">Go to home page.</Link>
        </div>
    )
}