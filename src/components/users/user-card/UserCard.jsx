import { Link } from "react-router-dom";
import { UserProfile } from "../user-profile/UserProfile";

export function UserCard({user}) {
  return (
      <div className="card" style={{margin: "20px"}}>
        <div class="row no-gutters">
          <div class="col-sm-5" 
              style={{width: "200px",height: "200px"}}>
            <img
              class="card-img"
              src={user.avatar}
              alt="Suresh Dasari Card"
            />
          </div>
          <div class="col-sm-7" style={{width: "auto"}}>
            <div class="card-body">
              <h5 class="card-title">{user.fullName}</h5>
              <p class="card-text">
                Total rents: {user.totalRents}
              </p>
              <Link to={`/users/${user.id}`} params={user}  class="btn btn-dark">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
