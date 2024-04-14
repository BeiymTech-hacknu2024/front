import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import logo from "../../public/images/logo.png";
import { json, redirect } from "@remix-run/node";
import { useEffect, useState } from "react";

import stylesHref from "../styles/build/login.css";
import styles from "../styles/build/login.json";

import apiClient from "~/api/apiClient";

export function links() {
  return [{ rel: "stylesheet", href: stylesHref }];
}

export const meta = () => {
  return [{ title: "Регистрация" }];
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const values = {
    name: formData.get("firstname") ?? "",
    surname: formData.get("secondname") ?? "",
    email: formData.get("email") ?? "",
    password: formData.get("password") ?? "",
    patronymic: "",
  };
  let response = {};

  await apiClient
    .post("/register", values)
    .then(
      () =>
        (response = {
          status: "redirect",
        })
    )
    .catch((res) => (response = { status: "error", message: res }));

  if (response.status === "redirect") {
    return redirect("/login");
  }

  return json(response);
};

export default function Registration() {
  const [password, setPassword] = useState("");
  const [passwordRecheck, setPasswordRecheck] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();
  const authorised = useOutletContext();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordRecheckChange = (e) => {
    setPasswordRecheck(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const dat = useActionData();

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
            <div className={styles.right_regis}>
              <Form method="post" className={styles.form}>
                <h2 style={{ textAlign: "center" }}>Регистрация</h2>
                <div className={styles.inputs}>
                  <input
                    id="firstname"
                    aria-label="firstname"
                    placeholder="Имя"
                    type="text"
                    name="firstname"
                    required
                  />
                  <input
                    id="secondname"
                    aria-label="secondname"
                    placeholder="Фамилия"
                    type="text"
                    name="secondname"
                    required
                  />
                  <input
                    id="email"
                    aria-label="email"
                    placeholder="Адрес эл. почты"
                    type="email"
                    name="email"
                    required
                  />

                  <label>
                    <input
                      id="password"
                      aria-label="password"
                      placeholder="Пароль"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      style={{ width: "100%" }}
                    />
                    <p className={styles.help_word}>
                      Используйте как минимум 10 символов, 1 цифру и 1 большую
                      букву
                    </p>
                  </label>
                  <input
                    id="password_recheck"
                    aria-label="password_recheck"
                    placeholder="Подтвердить пароль"
                    type="password"
                    name="password_recheck"
                    className={!passwordsMatch && styles.red}
                    value={passwordRecheck}
                    onChange={handlePasswordRecheckChange}
                    required
                  />
                  {!passwordsMatch && (
                    <p className={styles.red}>Введенные пароли не совпадают!</p>
                  )}

                  {dat != undefined ? (
                    dat.message.status === 400 ? (
                      <div className={styles.incorrect}>
                        Введите пароль минимум состоящийся из 10 символов, 1
                        заглавной буквы и 1 цифры.
                      </div>
                    ) : (
                      <div className={styles.incorrect}>
                        Введенный вами адрес электронной почты уже был
                        зарегестрирован.
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>

                <div className={styles.additional}>
                  <div>
                    <input
                      id="checkbox"
                      aria-label="checkbox"
                      type="checkbox"
                      name="checkbox"
                      required
                    />
                    <span>
                      Я принимаю условия договора /{" "}
                      <Link to={"#"} style={{ color: "#59AFFF" }}>
                        пользовательского соглашения
                      </Link>
                    </span>{" "}
                  </div>
                </div>

                <button type="submit">Готово</button>
              </Form>
              <Link to={"/login"} className={styles.sign_in}>
                Назад
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
