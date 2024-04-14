import {
  Outlet,
  useLoaderData,
  useOutletContext,
  useSearchParams,
} from "@remix-run/react";

import { getCookie, isAuthorised, mapFolders } from "~/utils/utils";
import { json, redirect } from "@remix-run/node";

import stylesHref from "../styles/build/account.css";
import styles from "../styles/build/account.json";

import Menu from "~/components/Menu";
import { useEffect, useRef, useState } from "react";
import ImportDoc from "~/components/ImportDoc";
import TableHistory from "~/components/TableHistory";
import apiClient from "~/api/apiClient";

export function links() {
  return [{ rel: "stylesheet", href: stylesHref }];
}

export const meta = () => {
  return [{ title: "Задания" }];
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "10", 10),
    1000
  );

  let response = {};

  await apiClient
    .get(`/reports?page=${page}&limit=${limit}`, {
      headers: {
        Cookie: getCookie(request.headers.get("cookie")),
      },
    })
    .then((res) => {
      response = {
        status: "success",
        reports: res.data.reports.map((res) => ({ ...res, Selected: false })),
        totalCount: res.data.total_count,
      };
    })
    .catch((res) => (response = { status: "error", message: res }));

  await apiClient
    .get("/folders/assigned", {
      headers: {
        Cookie: getCookie(request.headers.get("cookie")),
      },
    })
    .then((res) => (response = { ...response, folders: res.data }))
    .catch((res) => (response = { status: "error", message: res }));

  return json(response);
};

export default function Test() {
  const info = useOutletContext();

  const { user } = useOutletContext();
  const { reports, folders, totalCount } = useLoaderData();

  let [searchParams, _] = useSearchParams();

  const pageNumber = parseInt(searchParams.get("page") || "1", 10);
  const pageLimit = parseInt(searchParams.get("limit") || "10", 10);

  const [selectedReports, setSelectedReports] = useState(reports);

  const handleChangeBox = (id) => {
    const updatedData = selectedReports.map((item) =>
      item.DocumentID === id ? { ...item, Selected: !item.Selected } : item
    );

    setSelectedReports(updatedData);
  };

  const selectedReportsRef = useRef(selectedReports);

  useEffect(() => {
    selectedReportsRef.current = selectedReports;
  }, [selectedReports]);

  const all_folders = mapFolders(folders);

  return (
    <div className={styles.account}>
      <Menu info={info} />

      <div className={styles.history}>
        <ImportDoc folders={all_folders} user={user} />

        <div className={styles.inner}>
          <div className={styles.wrapper}>
            <TableHistory
              data={selectedReports}
              totalCount={totalCount}
              pageNumber={pageNumber}
              pageLimit={pageLimit}
              handleChangeBox={handleChangeBox}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
