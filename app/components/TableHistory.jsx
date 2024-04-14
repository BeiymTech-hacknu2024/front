import { Form, Link } from "@remix-run/react";

import { convertDate } from "../utils/utils";

import styles from "../styles/build/account.json";

import eye from "../../public/images/vectors/eye.svg";
import more from "../../public/images/vectors/more.svg";
import Pagination from "./Pagination";

export default function TableHistory({
  data,
  totalCount,
  role,
  handleChangeBox,
  pageNumber,
  pageLimit,
}) {
  return (
    <Form>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Название задания</th>
            {/* {role !== "individual" &&
              (role === "expert" ? (
                <>
                  <th>Проверяющий</th>
                </>
              ) : (
                <>
                  <th>Автор</th>
                  <th>Проверяющий</th>
                </>
              ))} */}

            <th>Дата</th>
            <th>Папка</th>
            <th>Статус</th>
            <th>Отчет</th>
          </tr>
        </thead>
        <tbody>
          {data !== null &&
            data !== undefined &&
            data.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleChangeBox(row.DocumentID)}
                  />
                </td>
                <td>{row.Filename}</td>
                {/* {role !== "individual" &&
                  (role === "expert" ? (
                    <>
                      <td>{row.Teacher}</td>
                    </>
                  ) : (
                    <>
                      <td>{row.Author}</td>
                      <td>{row.Teacher}</td>
                    </>
                  ))} */}
                <td>{convertDate(row.UploadDate)}</td>
                <td>
                  {/* {role !== "expert" ? (
                    <h6>
                      {row.Filepath.replace(
                        `uploads/folder_${row.Teacher}/`,
                        ""
                      ).replace(`/${row.Filename}`, "")}
                    </h6>
                  ) : (
                    <h6>
                      {row.Filepath.replace(
                        `uploads/folder_${row.Author}/`,
                        ""
                      ).replace(`/${row.Filename}`, "")}
                    </h6>
                  )} */}
                </td>
                <td>
                  {(row.Status === "Completed" && "обработан") ||
                    (row.Status === "Archived" && "архивирован") ||
                    (row.Status === "Uploaded" && "в обработке")}
                </td>
                <td>
                  {row.Status === "Uploaded" ? (
                    <div>
                      <div>
                        <span style={{ fontSize: "12px" }}>
                          Отчёт <br /> обрабатывается
                        </span>
                      </div>
                      <div>
                        <Link to={`/account/report/${row.ID}`}>
                          <img src={eye} alt="link" />
                        </Link>
                        {/* <img src={more} alt="more" /> */}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>
                        <p>{row.Uniqueness}%</p>
                        <span>Процент уникальности</span>
                      </div>
                      <div>
                        <Link to={`/account/report/${row.ID}`}>
                          <img src={eye} alt="link" />
                        </Link>
                        {/* <img src={more} alt="more" /> */}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ul className={styles.pagination}>
        <Pagination
          currentPage={pageNumber}
          pageCount={Math.ceil(totalCount / pageLimit)}
          pageLimit={pageLimit}
        />
      </ul>
    </Form>
  );
}
