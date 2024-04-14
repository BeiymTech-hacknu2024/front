import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/node/dist";
import { useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import globalStyles from "./styles/build/app.css";
import apiClient from "./api/apiClient";
import { getCookie } from "./utils/utils";

export const links = () => [
  ...(cssBundleHref
    ? [{ rel: "stylesheet", href: cssBundleHref }]
    : [{ rel: "stylesheet", href: globalStyles }]),
];

export const loader = async ({ request }) => {
  let response = {};

  await apiClient
    .get("/user", {
      headers: {
        Cookie: getCookie(request.headers.get("cookie")),
      },
    })
    .then((res) => (response = { status: "success", user: res.data }))
    .catch((res) => (response = { status: "error", message: res }));

  return json(response);
};

export default function App() {
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header data={data} />

        <Outlet context={data} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        <Footer />
      </body>
    </html>
  );
}
