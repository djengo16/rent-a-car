import styles from "./main.module.css";
import "../../sider/Search.css";

import VehiclesList from "../../vehicles/vehicle-list/VehiclesList";
export function Main() {
  return (
    <div className={styles["main-content"]}>
      <div id="sider">
        <input
          className="col-lg-6"
          type="text"
          placeholder="Search..."
          name="search"
        />
      </div>
      <VehiclesList />
    </div>
  );
}
