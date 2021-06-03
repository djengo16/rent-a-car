import styles from "./main.module.css";
import "../../sider/Search.css";

import VehiclesList from "../../vehicles/vehicle-list/VehiclesList";
import { useState } from "react";
export function Home() {
  const [searchParams, setSearchParams] = useState("");

  const searchChange = (e) => {
    setSearchParams(e.target.value);
  }

  return (
    <div className={styles["main-content"]}>
      <div id="sider">
        <input
          className="col-lg-6"
          type="text"
          placeholder="Search..."
          name="search"
          onChange={searchChange}
        />
      </div>
      <VehiclesList searchParams={searchParams}/>
    </div>
  );
}
