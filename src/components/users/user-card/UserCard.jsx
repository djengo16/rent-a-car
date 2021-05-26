import { Link } from "react-router-dom";

export function UserCard(props) {
  return (
      <div className="card" style={{margin: "20px"}}>
        <div class="row no-gutters">
          <div class="col-sm-5" 
              style={{maxWidth: "40%"}}>
            <img
              class="card-img"
              src="https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
              alt="Suresh Dasari Card"
            />
          </div>
          <div class="col-sm-7" style={{maxWidth: "60%"}}>
            <div class="card-body">
              <h5 class="card-title">{props.user.fullName}</h5>
              <p class="card-text">
                Total rents: {props.user.totalRents}
              </p>
              <Link to={`/users/${props.user.id}`} class="btn btn-dark">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
