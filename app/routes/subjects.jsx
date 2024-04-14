import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar, Pie, Radar } from "react-chartjs-2";

import Menu from "~/components/Menu";
import stylesHref from "../styles/build/account.css";
import styles from "../styles/build/account.json";

export function links() {
  return [{ rel: "stylesheet", href: stylesHref }];
}

export default function Account() {
  ChartJS.register(
    ArcElement,
    RadialLinearScale,
    PointElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  const radar_data = {
    labels: [
      "mechanics",
      "thermodynamics",
      "electromagnetism",
      "optics",
      "something",
    ],
    datasets: [
      {
        label: "% from quiz",
        data: [100, 45, 90, 69, 10],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pie_data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const bar_data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((num, i) => Math.random() * 100),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random() * 100),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className={styles.subjects}>
      <Menu />
      <div className={styles.test}>
        <div>
          <Radar data={radar_data} />
        </div>
        <div>
          <Pie data={pie_data} />
        </div>
        <div>
          <Bar data={bar_data} />
        </div>
      </div>
    </div>
  );
}
