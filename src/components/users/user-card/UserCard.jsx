import { RiVipCrownFill } from "react-icons/ri";
import { Link } from "react-router-dom";

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
            {user.isVip && (<p>
              <RiVipCrownFill /> VIP
            </p>)}
              <h5 class="card-title">{user.fullName}</h5>
              <Link to={`/user/${user.id}`} params={user}  class="btn btn-dark">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
