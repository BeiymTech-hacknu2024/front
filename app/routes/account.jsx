import { Outlet, useOutletContext } from "@remix-run/react";

import { isAuthorised } from "~/utils/utils";
import { redirect } from "@remix-run/node";

import stylesHref from "../styles/build/account.css";
import styles from "../styles/build/account.json";

import Menu from "~/components/Menu";

export function links() {
  return [{ rel: "stylesheet", href: stylesHref }];
}

export const loader = async ({ request }) => {
  // isAuthorised(request);
  const url = new URL(request.url);

  if (url.pathname === "/account") {
    return redirect("/account/history");
  }

  return null;
};

export default function Account() {
  const info = useOutletContext();

  return (
    <div className={styles.account}>
      <Menu info={info} />
      <Outlet context={info} />
    </div>
  );
}
