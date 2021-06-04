import { useEffect, useState } from "react";
import { getAllUsers } from "../../../core/services/usersService";
import { UserCard } from "../user-card/UserCard";
import "../../sider/Search.css";

export function UsersList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchParams, setSearchParams] = useState("");

  useEffect(() => {
    getAllUsers().then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });
  }, []);

  useEffect(() => {

    if (searchParams.trim() !== "") {
      setFilteredUsers(
        users.filter((x) => {
          return `${x.fullName} ${x.email}`
            .toLowerCase()
            .includes(searchParams.toLowerCase());
        })
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchParams, users]);

  const handleSearchParams = (e) => {
    setSearchParams(e.target.value);
  };

  return (
    <>
      <div id="searchSider">
        <input
          className="col-lg-6"
          type="text"
          placeholder="Search..."
          name="search"
          onChange={handleSearchParams}
        />
      </div>
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}
