import stylesHref from "../styles/build/index.css";
import styles from "../styles/build/index.json";

import main_bg from "../../public/images/image_main.png";

import speed from "../../public/images/vectors/speed.svg";
import accuracy from "../../public/images/vectors/accuracy.svg";
import multitasking from "../../public/images/vectors/multitasking.svg";
import ai from "../../public/images/vectors/ai.svg";
import { redirect } from "@remix-run/node";

export const meta = () => {
  return [{ title: "Beyim" }];
};

export function links() {
  return [{ rel: "stylesheet", href: stylesHref }];
}

export const loader = async ({ request }) => {
  return redirect("/reports");
};

export default function Index() {
  const differences = [
    {
      img: speed,
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      img: accuracy,
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      img: multitasking,
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      img: ai,
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.main__main}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <h2>Beyim</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>

            <button>Попробовать</button>
          </div>
          <div className={styles.right}>
            <img src={main_bg} alt="" />
            <div>{/* <img src={button_next} alt="" /> */}</div>
          </div>
        </div>
      </div>

      <div className={styles.differences}>
        <div className={styles.inner}>
          <div className={styles.wrapper}>
            {differences.map((difference) => (
              <li key={difference.name} className={styles.list}>
                <div>
                  <img src={difference.img} alt={difference.name} />
                </div>
                <h3>{difference.name}</h3>
                <p>{difference.description}</p>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
