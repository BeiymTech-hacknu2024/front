import { Link } from "@remix-run/react";

import styles from "../styles/build/app.json";

import logo from "../../public/images/vectors/logo.svg";

export default function Header({ data }) {
  const info = data;

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <div>
          <div className={styles.header__lower}>
            <Link to={"/"}>
              <div className={styles.header__logo}>
                <img src={logo} alt="logo" />
              </div>
            </Link>

            <div className={styles.right}>
              {info.status === "error" ? (
                <div>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="6"
                      r="4"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18"
                      stroke="#1C274C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  <Link to={"/login"}>Личный кабинет</Link>
                </div>
              ) : (
                <div className={styles.user}>
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5 35C27.165 35 35 27.165 35 17.5C35 7.83502 27.165 0 17.5 0C7.83502 0 0 7.83502 0 17.5C0 27.165 7.83502 35 17.5 35Z"
                      fill="#3AB8FF"
                    />
                    <path
                      d="M27.0967 28.2258V25.8422C27.0967 24.578 26.5912 23.3654 25.6913 22.4715C24.7915 21.5775 23.571 21.0752 22.2984 21.0752H12.7016C11.429 21.0752 10.2085 21.5775 9.30861 22.4715C8.40874 23.3654 7.9032 24.578 7.9032 25.8422V28.2258"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.5 16.3082C20.1501 16.3082 22.2984 14.174 22.2984 11.5412C22.2984 8.90846 20.1501 6.77419 17.5 6.77419C14.8499 6.77419 12.7016 8.90846 12.7016 11.5412C12.7016 14.174 14.8499 16.3082 17.5 16.3082Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <div className={styles.info}>
                    {info.user.Role === "individual" ? (
                      <Link to={"/account/history"}>
                        <p>{info.user.Name + " " + info.user.Surname}</p>
                      </Link>
                    ) : (
                      <Link
                        to={
                          info.user.Role === "student"
                            ? "/account/tasks"
                            : "/account/history"
                        }
                      >
                        <p>{info.user.Role}</p>
                      </Link>
                    )}
                    <a href={`mailto:${info.user.Email}`}>{info.user.Email}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
