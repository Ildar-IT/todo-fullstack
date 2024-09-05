"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./index.module.scss";
import { Button } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import AddChangeTodoModal from "@/components/screens/todos/components/add-change-todo-modal";
import {
  ITodo,
  ITodoModalData,
  IUser,
} from "@/components/screens/todos/helpers/types";
import { getDateFormat } from "@/utils/date";
import { getTodosFetch } from "@/components/screens/todos/helpers/fetch";
import { sortTodosByTime } from "@/components/screens/todos/helpers/helper";
import TodosHeader from "@/components/screens/todos/components/header";
import Todo from "@/components/screens/todos/components/todo";

export default function Todos({
  todos,
  userInfo,
}: {
  todos: Array<ITodo>;
  userInfo: IUser;
}) {
  const [todosState, setTodosState] = useState<Array<ITodo>>(
    sortTodosByTime(todos)
  );

  useEffect(() => {
    setTodosState(sortTodosByTime(todos));
  }, [todos]);

  const query = useSearchParams();
  const [modalData, setModalData] = useState<ITodoModalData>({
    show: false,
    type: "create",
  });

  const updateTodos = async () => {
    const todos = await getTodosFetch(query.get("date"));
    setTodosState(sortTodosByTime(todos));
  };

  const handleCloseModal = async (isUpdate?: boolean) => {
    if (isUpdate) {
      await updateTodos();
    }
    setModalData({
      show: false,
      type: "create",
    });
  };

  const handleShowModal = (data: ITodoModalData) => {
    setModalData(data);
  };

  return (
    <div className="container">
      <div className={styles.main}>
        <TodosHeader user={userInfo} handleShowModal={handleShowModal} />
        <div className={styles.body}>
          {todosState.length > 0 ? (
            todosState.map((el) => (
              <Todo
                key={el.id}
                todo={el}
                handleShowModal={handleShowModal}
                updateTodos={updateTodos}
              />
            ))
          ) : (
            <h4>
              На {query.get("date") || getDateFormat()} задач не нашлось
              &#128549;
            </h4>
          )}
        </div>
      </div>
      <AddChangeTodoModal data={modalData} handleClose={handleCloseModal} />
    </div>
  );
}
