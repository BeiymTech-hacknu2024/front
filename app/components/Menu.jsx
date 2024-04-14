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
  // const userInfo = info.user;

  const userInfo = {
    name: "TEST",
    email: "TEST@gmail.com",
    role: "TEST",
  };

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
      <div className={visible ? styles.full : styles.hidden}>
        <ul className={styles.links}>
          <li
            className={"tasks" === active ? styles.active : ""}
            onClick={() => setActive(`tasks`)}
          >
            <Link to={"/tasks"}>
              <div>
                <svg
                  fill="#000000"
                  width="800px"
                  height="800px"
                  viewBox="0 0 36 36"
                  version="1.1"
                  preserveAspectRatio="xMidYMid meet"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <title>tasks-line</title>
                  <path
                    class="clr-i-outline clr-i-outline-path-1"
                    d="M29.29,34H6.71A1.7,1.7,0,0,1,5,32.31V6.69A1.75,1.75,0,0,1,7,5H9V7H7V32H29V7H27V5h2.25A1.7,1.7,0,0,1,31,6.69V32.31A1.7,1.7,0,0,1,29.29,34Z"
                  ></path>
                  <path
                    class="clr-i-outline clr-i-outline-path-2"
                    d="M16.66,25.76,11.3,20.4A1,1,0,0,1,12.72,19l3.94,3.94,8.64-8.64a1,1,0,0,1,1.41,1.41Z"
                  ></path>
                  <path
                    class="clr-i-outline clr-i-outline-path-3"
                    d="M26,11H10V7.33A2.34,2.34,0,0,1,12.33,5h1.79a4,4,0,0,1,7.75,0h1.79A2.34,2.34,0,0,1,26,7.33ZM12,9H24V7.33A.33.33,0,0,0,23.67,7H20V6a2,2,0,0,0-4,0V7H12.33a.33.33,0,0,0-.33.33Z"
                  ></path>
                  <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
                </svg>
              </div>
              Tasks
            </Link>
          </li>

          <li
            className={"reports" === active ? styles.active : ""}
            onClick={() => setActive(`reports`)}
          >
            <Link to={"/reports"}>
              <div>
                <img src={report} alt="report" />
              </div>
              Reports
            </Link>
          </li>

          <li
            className={"subjects" === active ? styles.active : ""}
            onClick={() => setActive(`subjects`)}
          >
            <Link to={"/subjects"}>
              <div>
                <img src={books} alt="books" />
              </div>
              Subjects
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
