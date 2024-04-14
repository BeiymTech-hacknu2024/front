import { Form } from "@remix-run/react";
import { useState } from "react";

import styles from "../styles/build/account.json";

export default function ImportDoc() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Form className={styles.load_document}>
      <div className={styles.info}>
        <svg
          width="65"
          height="65"
          viewBox="0 0 65 65"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setShowModal(!showModal)}
        >
          <rect width="65" height="65" rx="12" fill="white" />
          <path
            d="M54.9829 39V48.6667C54.9829 49.9485 54.4747 51.1779 53.5702 52.0843C52.6657 52.9908 51.4389 53.5 50.1598 53.5H16.3984C15.1192 53.5 13.8925 52.9908 12.988 52.0843C12.0835 51.1779 11.5753 49.9485 11.5753 48.6667V39"
            stroke="#15A0FE"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M45.3369 22.0833L33.2792 10L21.2216 22.0833"
            stroke="#15A0FE"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M33.2791 10V39"
            stroke="#15A0FE"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Загрузить файл</p>
      </div>
    </Form>
  );
}
