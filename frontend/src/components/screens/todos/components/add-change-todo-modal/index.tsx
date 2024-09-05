"use client";
import React, { ChangeEvent, FormEvent, SyntheticEvent, useState } from "react";
import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import { formInputsValidate } from "@/utils/validate";

import { getDateFormat } from "@/utils/date";
import { ITodoModalProps } from "@/components/screens/todos/helpers/types";
import {
  createTodoFetch,
  updateTodoFetch,
} from "@/components/screens/todos/helpers/fetch";
import { useSearchParams } from "next/navigation";

function AddChangeTodoModal({ handleClose, data }: ITodoModalProps) {
  const [isSubmit, setIsSubmit] = useState(false);
  const query = useSearchParams();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmit) return;

    const form = event.target as HTMLFormElement;
    if (!formInputsValidate(form)) return;
    setIsSubmit(true);
    if (data.type === "create") {
      await createTodoFetch(form);
    } else if (data.info) {
      await updateTodoFetch(form, data.info);
      console.log("Обновился");
    } else {
      console.log("Разработчик где-то допустил ошибку");
    }
    setIsSubmit(false);
    if (!form.reportValidity()) return;
    console.log("Закрываем");
    handleClose(true);
  };

  return (
    <Offcanvas show={data.show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h3>
            {data.type === "create" ? "Создать задачу" : "Изменить задачу"}
          </h3>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form
          onSubmit={(event: SyntheticEvent<HTMLFormElement, SubmitEvent>) =>
            submit(event)
          }
        >
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              name="title"
              type="name"
              defaultValue={data.info?.title}
              placeholder="Название задачи"
              data-required
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event.target.value.length > 2) {
                  event.target.setCustomValidity("");
                } else {
                  event.target.setCustomValidity("Не меньше 2 символов");
                }
              }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={10}
              maxLength={255}
              defaultValue={data.info?.description}
              placeholder="Описание задачи"
              data-required
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Выберите дату и время</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  name="date"
                  type="date"
                  min="2018-01-01"
                  max="2030-01-01"
                  defaultValue={
                    data.info?.date || query.get("date") || getDateFormat()
                  }
                  data-required
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.value.length) {
                      event.target.setCustomValidity("");
                    } else {
                      event.target.setCustomValidity(
                        "Похоже, что вы не выбрали дату"
                      );
                    }
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  defaultValue={data.info?.time}
                  name="time"
                  type="time"
                  data-required
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.value.length) {
                      event.target.setCustomValidity("");
                    } else {
                      event.target.setCustomValidity(
                        "Похоже, что вы не выбрали время"
                      );
                    }
                  }}
                />
              </Col>
            </Row>
          </Form.Group>

          <Button type="submit" variant="outline-success" disabled={isSubmit}>
            Подтвердить
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
export default AddChangeTodoModal;
