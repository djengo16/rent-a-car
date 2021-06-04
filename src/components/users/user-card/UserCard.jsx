import { RiVipCrownFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export function UserCard({user}) {
  return (
      <div className="card" style={{margin: "20px"}}>
        <div className="row no-gutters">
          <div className="col-sm-5" 
              style={{width: "200px",height: "200px"}}>
            <img
              className="card-img"
              src={user.avatar}
              alt="Suresh Dasari Card"
            />
          </div>
          <div className="col-sm-7" style={{width: "auto"}}>
            <div className="card-body">
            {user.isVip && (<p>
              <RiVipCrownFill /> VIP
            </p>)}
              <h5 className="card-title">{user.fullName}</h5>
              <Link to={`/user/${user.id}`} params={user}  class="btn btn-dark">
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
