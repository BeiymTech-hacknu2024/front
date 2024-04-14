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
  Title,
} from "chart.js";
import { Bar, Radar } from "react-chartjs-2";

import Menu from "~/components/Menu";
import stylesHref from "../styles/build/account.css";
import styles from "../styles/build/account.json";
import { json } from "@remix-run/node";
import { getCookie } from "~/utils/utils";
import apiClient from "~/api/apiClient";
import { useLoaderData } from "@remix-run/react";

export function links() {
  return [{ rel: "stylesheet", href: stylesHref }];
}

export const loader = async ({ request }) => {
  let response = {};

  await apiClient
    .get(`/performance`, {
      headers: {
        Cookie: getCookie(request.headers.get("cookie")),
      },
    })
    .then((res) => {
      response = {
        status: "success",
        grades: res.data,
      };
    })
    .catch((res) => (response = { status: "error", message: res }));

  await apiClient
    .get(`/performance/all`, {
      headers: {
        Cookie: getCookie(request.headers.get("cookie")),
      },
    })
    .then((res) => {
      response = {
        ...response,
        all_grades: res.data,
      };
    })
    .catch((res) => (response = { status: "error", message: res }));

  console.log(response);
  return json(response);
};

export default function Reports() {
  const { grades, all_grades } = useLoaderData();

  console.log(all_grades);
  const reports = [
    {
      physics: [
        {
          name: "Kinematics",
          weight: 30,
        },
        {
          name: "Dynamics",
          weight: 35,
        },
        {
          name: "Electrodynamics",
          weight: 35,
        },
      ],
    },
    {
      chemistry: [
        {
          name: "Acids",
          weight: 50,
        },
        {
          name: "ChemicalBonding",
          weight: 50,
        },
      ],
    },
    {
      math: [
        {
          name: "Trigonometry",
          weight: 25,
        },
        {
          name: "LinearAlgebra",
          weight: 25,
        },
        {
          name: "Geometry",
          weight: 25,
        },
        {
          name: "Probability",
          weight: 25,
        },
      ],
    },
  ];

  // const [physGrades, setPhysGrades] = useState(0);
  // const [chemGrades, setChemGrades] = useState(0);
  // const [mathGrades, setMathGrades] = useState(0);

  function calculateGrades(reports, grades) {
    const physicsReport = reports.find((report) => report.physics);
    const chemReport = reports.find((report) => report.chemistry);
    const mathReport = reports.find((report) => report.math);

    const physicsTopics = physicsReport.physics;
    const chemTopics = chemReport.chemistry;
    const mathTopics = mathReport.math;

    // Initialize total grade
    let totalGradePhys = 0;
    let totalGradeChem = 0;
    let totalGradeMath = 0;

    // Iterate over physics topics
    physicsTopics.forEach((topic) => {
      const { name, weight } = topic;

      const topicGrade = grades[name] || 0; // If the grade is not provided, assume 0
      totalGradePhys += (topicGrade * weight) / 100; // Calculate the contribution to the total grade
    });

    chemTopics.forEach((topic) => {
      const { name, weight } = topic;
      const topicGrade = grades[name] || 0; // If the grade is not provided, assume 0
      totalGradeChem += (topicGrade * weight) / 100; // Calculate the contribution to the total grade
    });

    mathTopics.forEach((topic) => {
      const { name, weight } = topic;
      const topicGrade = grades[name] || 0; // If the grade is not provided, assume 0
      totalGradeMath += (topicGrade * weight) / 100; // Calculate the contribution to the total grade
    });

    // setPhysGrades(newPhys);
    return { totalGradePhys, totalGradeChem, totalGradeMath };
  }

  const results = calculateGrades(reports, grades);

  ChartJS.register(
    ArcElement,
    RadialLinearScale,
    PointElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  const radar_data = {
    labels: ["Physics", "Chemistry", "Math"],
    datasets: [
      {
        label: "Average of the quizzes",
        data: [
          results.totalGradePhys,
          results.totalGradeChem,
          results.totalGradeMath,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const labels = ["Phys", "Chem", "Math"];

  const bar_data = {
    labels,
    datasets: [
      {
        label: "Physics",
        data: [95, 89, 51],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Chemistry",
        data: [46, 80],
        backgroundColor: "rgba(153, 202, 235, 0.5)",
      },
      {
        label: "Math",
        data: [94, 100, 80, 30],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options_all = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className={styles.subjects}>
      <Menu />
      <div className={styles.test}>
        <div>
          <Radar data={radar_data} />
        </div>
        {/* <div>
          <Pie data={pie_data} />
        </div> */}

        <div>
          <Bar data={bar_data} />
        </div>
      </div>
    </div>
  );
}

// const pie_data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };
