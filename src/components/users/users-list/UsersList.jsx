import { useEffect, useState } from "react";
import { getAllUsers } from "../../../core/services/usersService";
import { UserCard } from "../user-card/UserCard";
import '../../sider/Search.css'

export function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
    <div id="sider">
    <input
      className="col-lg-6"
      type="text"
      placeholder="Search..."
      name="search"
    />
  </div>
    <div className="container" style={{display: "flex",flexWrap: "wrap"}}>
      {(users.map((user) => (
      <UserCard key={user.id} user={user} />
      )))}
    </div>
    </>
  );
}
