import { Link, useLocation, useNavigate } from "@remix-run/react";

import styles from "../styles/build/account.json";

import settings from "../../public/images/vectors/settings.svg";
import support from "../../public/images/vectors/support.svg";
import instruction from "../../public/images/vectors/instruction.svg";

import books from "../../public/images/vectors/books.svg";
import tasks from "../../public/images/vectors/tasks_svg.svg";
import report from "../../public/images/vectors/report.svg";
import packages from "../../public/images/menu_package.png";
import users from "../../public/images/vectors/users.svg";
import leave from "../../public/images/vectors/leave.svg";

import React, { useEffect } from "react";
import axios from "axios";

export default function Menu({ info }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeLink = location.pathname.replace("/", "");

  const [active, setActive] = React.useState(activeLink);
  const [hidden, setHidden] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  const handleExit = (e) => {
    e.preventDefault();
    let response = {};

    axios
      .post("/api/logout")
      .then((res) => {
        response = {
          status: "success",
          info: res.data,
        };
      })
      .catch((res) => {
        response = { status: "error", message: res };
      })
      .finally(() => {
        if (response.status === "success") {
          navigate("/login");
        }
      });
  };

  useEffect(() => {
    setActive(activeLink);

    if (activeLink.includes("report")) {
      setVisible(!visible);
      setHidden(!hidden);
    } else {
      setVisible(true);
      setHidden(false);
    }
  }, [activeLink]);

  return (
    <div className={styles.menu}>
      <div className={styles.full}>
        <ul className={styles.links}>
          <li
            className={"reports" === active ? styles.active : ""}
            onClick={() => setActive(`reports`)}
          >
            <Link to={"/reports"}>
              <div>
                <img src={books} alt="books" />
              </div>
              Reports
            </Link>
          </li>

          <li onClick={handleExit}>
            <Link to={"#"}>
              <div>
                <img src={leave} alt="leave" />
              </div>
              Leave
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
