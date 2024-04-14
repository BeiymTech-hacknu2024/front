import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { useEffect } from "react";

import stylesHref from "../styles/build/login.css";
import styles from "../styles/build/login.json";

import apiClient from "~/api/apiClient";

export function links() {
  return [{ rel: "stylesheet", href: stylesHref }];
}

export const meta = () => {
  return [{ title: "Авторизация" }];
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const values = {
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
  };
  // const errors = await verifyData(values);

  //   if (Object.keys(errors).length !== 0) {
  //     return json({ status: 'error', errors }, { status: 400 });
  //   }

  let response = {};

  await apiClient
    .post("/login", { ...values })
    .then(
      (res) =>
        (response = {
          status: "redirect",
          header: res.headers["set-cookie"][0],
        })
    )
    .catch((res) => (response = { status: "error", message: res }));

  if (response.status === "redirect") {
    return redirect("/", {
      headers: {
        "Set-Cookie": response.header,
      },
    });
  }

  if (response.status === "error") {
    if (response.message.status === 401) {
    }
  }

  return json(response);
};

export default function Login() {
  const dat = useActionData();
  const navigate = useNavigate();
  const authorised = useOutletContext();

  useEffect(() => {
    if (authorised.status === "success") {
      navigate("/account");
    }
  }, []);

  return (
    <div className={styles.login}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <div className={styles.right}>
            <div>
              <Form method="post" className={styles.form}>
                <h2 style={{ textAlign: "center" }}>Авторизация</h2>
                <div className={styles.inputs}>
                  <input
                    id="email"
                    aria-label="email"
                    placeholder="Адрес эл. почты"
                    type="email"
                    name="email"
                    required
                  />
                  <input
                    id="password"
                    aria-label="password"
                    placeholder="Пароль"
                    type="password"
                    name="password"
                    required
                  />

                  {dat != undefined ? (
                    <div className={styles.incorrect}>
                      Введенный вами адрес электронной почты или пароль
                      недействительны.
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className={styles.additional}>
                  <div>
                    <input
                      id="checkbox"
                      aria-label="checkbox"
                      placeholder=""
                      type="checkbox"
                      name="checkbox"
                    />
                    <p>Запомнить меня</p>
                  </div>
                  <Link to={"#"}>Забыли пароль</Link>
                </div>

                <button type="submit">Войти</button>
                <div className={styles.noAcc}>
                  <p>
                    Ещё нет аккаунта?{" "}
                    <Link to={"/registration"} style={{ color: "#59AFFF" }}>
                      Зарегистрироваться
                    </Link>
                  </p>
                  <span>
                    Нажимая на кнопку “войти”, Вы принимаете условия <br />
                    <Link to={"#"}>пользовательского соглашения</Link>
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
