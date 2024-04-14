import {
  useLoaderData,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";

import styles from "../styles/build/account.json";

import { getCookie, mapFolders } from "~/utils/utils";
import apiClient from "~/api/apiClient";
import ImportDoc from "~/components/ImportDoc";
import TableHistory from "~/components/TableHistory";

import loupe from "../../public/images/vectors/loupe.svg";
import trash from "../../public/images/vectors/trash.svg";
import archive from "../../public/images/vectors/archive.svg";
import translate from "../../public/images/vectors/translate.svg";
import DeleteModal from "~/components/DeleteModal";
import ArchiveModal from "~/components/ArchiveModal";
import axios from "axios";

export const meta = () => {
  return [{ title: "History" }];
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "10", 10),
    1000
  );

  let response = {};

  return json(response);
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  let response = {};

  return response;
};

export default function History() {
  const { reports, folders, teachers, totalCount } = useLoaderData();

  const [selectedReports, setSelectedReports] = useState(reports);

  const navigate = useNavigate();
  const { user } = useOutletContext();
  let [searchParams, _] = useSearchParams();

  const pageNumber = parseInt(searchParams.get("page") || "1", 10);
  const pageLimit = parseInt(searchParams.get("limit") || "10", 10);

  const [modalTranslate, setModalTranslate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalArchive, setModalArchive] = useState(false);

  const [showMessageTranslate, setShowMessageTranslate] = useState(false);
  const [showMessageDelete, setShowMessageDelete] = useState(false);
  const [showMessageArchive, setShowMessageArchive] = useState(false);

  const selectedReportsRef = useRef(selectedReports);

  const mock_info = [];

  useEffect(() => {
    selectedReportsRef.current = selectedReports;
  }, [selectedReports]);

  // useEffect(() => {
  //   let mounted = true; // Флаг для отслеживания состояния монтирования
  //   const source = axios.CancelToken.source(); // Создаем источник токена отмены

  //   const schedule = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/api/reports?page=${pageNumber}&limit=${pageLimit}`,
  //         {
  //           cancelToken: source.token, // Используем токен отмены в запросе
  //         }
  //       );

  //       if (mounted) {
  //         setSelectedReports(
  //           response.data.reports.map((res) => {
  //             const existingReport = selectedReportsRef.current.find(
  //               (report) => report.DocumentID === res.DocumentID
  //             );

  //             return {
  //               ...res,
  //               Selected: existingReport ? existingReport.Selected : false,
  //             };
  //           })
  //         );
  //       }
  //     } catch (error) {
  //       if (axios.isCancel(error)) {
  //         console.log("Запрос отменен:", error.message);
  //       } else {
  //         // Обработка других ошибок
  //       }
  //     }
  //     if (mounted) {
  //       setTimeout(schedule, 10000);
  //     }
  //   };

  //   const timer = setTimeout(schedule, 10000);

  //   return () => {
  //     mounted = false; // Указываем, что компонент был размонтирован
  //     clearTimeout(timer); // Очищаем начальный таймер
  //     source.cancel("Компонент размонтирован"); // Отменяем выполняющийся запрос
  //   };
  // }, []);

  const handleChangeBox = (id) => {
    const updatedData = selectedReports.map((item) =>
      item.DocumentID === id ? { ...item, Selected: !item.Selected } : item
    );

    setSelectedReports(updatedData);
  };

  const all_folders = mapFolders(folders);

  return (
    <div className={styles.history}>
      <ImportDoc />
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <TableHistory
            data={selectedReports}
            totalCount={totalCount}
            // role={user.Role}
            pageNumber={pageNumber}
            pageLimit={pageLimit}
            handleChangeBox={handleChangeBox}
          />
        </div>
      </div>
    </div>
  );
}
