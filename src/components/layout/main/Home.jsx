import styles from "./main.module.css";
import "../../sider/Search.css";

import VehiclesList from "../../vehicles/vehicle-list/VehiclesList";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BiSort, BiSortDown, BiSortUp } from "react-icons/bi";
export function Home() {
  const [searchParams, setSearchParams] = useState("");
  const [sort, setSort] = useState("ascending");

  const searchChange = (e) => {
    setSearchParams(e.target.value);
  };

  return (
    <div className={styles["main-content"]}>
      <div id="searchSider">
        <input
          className="col-lg-6"
          type="text"
          placeholder="Search..."
          name="search"
          onChange={searchChange}
        />
      </div>
      <div className="container">
        <Dropdown
          id="dropdown-item-button"
          variant="dark"
          style={{ float: "left", marginTop: "10px" }}
        >
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Sort <BiSort />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSort("lowerPrice")}>
              <BiSortDown /> Price
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("biggerPrice")}>
              <BiSortUp /> Price
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("lowerYear")}>
              {" "}
              <BiSortDown /> Year
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSort("biggerYear")}>
              {" "}
              <BiSortUp /> Year
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <VehiclesList searchParams={searchParams} sort={sort} />
    </div>
  );
}
