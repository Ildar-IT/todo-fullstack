"use client";
import { Button, Form } from "react-bootstrap";

import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import styles from "../index.module.scss";
import Link from "next/link";
import { setCookie } from "@/utils/cookies";
import { emailRegExp, formInputsValidate } from "@/utils/validate";
import { useRouter } from "next/navigation";

const Registration = () => {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const sendRequest = async (form: HTMLFormElement | undefined) => {
    setIsSubmit(true);
    const body = {};
    for (const el of form.elements) {
      if (form.elements.hasOwnProperty(el.name)) {
        body[el.name] = el.value;
      }
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((payload) => {
        if (!payload.token) {
          for (const key in payload?.messages) {
            const el = form?.elements[key];
            if (el) {
              el.setCustomValidity(payload?.messages[key]);
              el.reportValidity();
            }
          }
        } else {
          setCookie("token", payload.token);
          router.push("/todos/");
        }
      })
      .catch((e) => console.log("Auth Error", e))
      .finally(() => setIsSubmit(false));
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmit) return;

    const form = event.target as HTMLFormElement;
    if (!formInputsValidate(form)) return;

    await sendRequest(form);
  };
  return (
    <div className={styles.wrap}>
      <h1>Регистрация</h1>
      <Form
        onSubmit={(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) =>
          submit(event)
        }
      >
        <Form.Group className="mb-3">
          <Form.Label column sm="2">
            Имя
          </Form.Label>
          <Form.Control
            name="name"
            type="name"
            placeholder="Иван"
            data-required
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > 2) {
                event.target.setCustomValidity("");
              } else {
                event.target.setCustomValidity(
                  "Похоже, что введен некорректное имя"
                );
              }
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label column sm="2">
            Почта
          </Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="email@example.ru"
            data-required
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              emailRegExp.test(event.target.value)
                ? event.target.setCustomValidity("")
                : event.target.setCustomValidity(
                    "Похоже, что введен некорректный адрес"
                  );
            }}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label column sm="2">
            Пароль
          </Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Пароль"
            data-required
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length > 3) {
                event.target.setCustomValidity("");
              } else {
                event.target.setCustomValidity(
                  "Похоже, что введен некорректный адрес"
                );
              }
            }}
          />
        </Form.Group>
        <div className={styles.bottom}>
          <Button type="submit" variant="outline-success" disabled={isSubmit}>
            Подтвердить
          </Button>
          <Link href={`/auth`}>Авторизация</Link>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
