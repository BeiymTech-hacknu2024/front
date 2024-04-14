import { Link } from "react-router-dom";

import styles from "../styles/build/app.json";

import logo from "../../public/images/vectors/logo.svg";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <div className={styles.lower}>
            <div className={styles.main}>
              <Link to={"#"}>
                <div className={styles.logo}>
                  <img src={logo} alt="" />
                </div>
              </Link>

              <p>©2023 Beyim. All rights reserved.</p>
            </div>

            <div className={styles.social}>
              <p>Соц. сети:</p>

              <Link to={"#"}>
                <svg
                  width="38"
                  height="27"
                  viewBox="0 0 38 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M36.9034 4.14595C36.6998 3.33288 36.2854 2.58791 35.7018 1.9863C35.1182 1.38468 34.3862 0.947717 33.5797 0.719545C30.633 1.53172e-07 18.8462 0 18.8462 0C18.8462 0 7.05937 5.10574e-08 4.11267 0.788073C3.30617 1.01625 2.57417 1.45321 1.9906 2.05483C1.40703 2.65644 0.992561 3.40141 0.789052 4.21448C0.249761 7.20497 -0.0140353 10.2386 0.000979343 13.2773C-0.018244 16.3389 0.245569 19.3957 0.789052 22.4087C1.01341 23.1965 1.43717 23.9131 2.01938 24.4893C2.60159 25.0655 3.32257 25.4818 4.11267 25.698C7.05937 26.4861 18.8462 26.4861 18.8462 26.4861C18.8462 26.4861 30.633 26.4861 33.5797 25.698C34.3862 25.4699 35.1182 25.0329 35.7018 24.4313C36.2854 23.8297 36.6998 23.0847 36.9034 22.2716C37.4385 19.3037 37.7023 16.2931 37.6914 13.2773C37.7107 10.2157 37.4468 7.15896 36.9034 4.14595Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M14.9915 18.8791L24.8424 13.277L14.9915 7.6748V18.8791Z"
                    fill="#F8F8F8"
                    stroke="#F8F8F8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link to={"#"}>
                <svg
                  width="18"
                  height="34"
                  viewBox="0 0 18 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 0H13.0909C10.921 0 8.83988 0.895533 7.30549 2.48959C5.7711 4.08365 4.90909 6.24566 4.90909 8.5V13.6H0V20.4H4.90909V34H11.4545V20.4H16.3636L18 13.6H11.4545V8.5C11.4545 8.04913 11.6269 7.61673 11.9338 7.29792C12.2407 6.97911 12.6569 6.8 13.0909 6.8H18V0Z"
                    fill="#3E3E3E"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
