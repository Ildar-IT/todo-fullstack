import React, { useMemo } from "react";
import styles from "./index.module.scss";
import {
  ITodo,
  ITodoModalData,
} from "@/components/screens/todos/helpers/types";
import { Button } from "react-bootstrap";
import { svgIcons } from "@/svgIcons";
import { updateTodoFetch } from "@/components/screens/todos/helpers/fetch";
const Todo = ({
  todo,
  handleShowModal,
  updateTodos,
}: {
  todo: ITodo;
  handleShowModal: (data: ITodoModalData) => void;
  updateTodos: () => void;
}) => {
  return (
    <div className={styles.todo} key={todo.id}>
      <div className={styles.title}>
        <h4>{todo.title}</h4>
        <p>{todo.description}</p>
      </div>

      <div className={styles.info}>
        <p>
          Время: <span>{todo.time}</span>
        </p>
        <p>
          Статус:
          <span>{todo.status ? "Выполнен" : "Не выполнен"}</span>
        </p>
      </div>

      <div className={styles.btns}>
        <button
          className={`${styles.btnStatus} ${
            todo.status && styles.btnStatusSuccess
          }`}
          onClick={async () => {
            await updateTodoFetch(null, { ...todo, status: !todo.status });
            await updateTodos();
          }}
        >
          {svgIcons.checked}
        </button>
        <button
          onClick={() =>
            handleShowModal({
              info: {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                date: todo.date,
                time: todo.time,
                status: todo.status,
              },
              show: true,
              type: "change",
            })
          }
        >
          {svgIcons.modify}
        </button>
        <button>{svgIcons.delete}</button>
      </div>
    </div>
  );
};

export default Todo;
