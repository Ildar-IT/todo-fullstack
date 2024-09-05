"use client";
import React, { useMemo, useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { getDateFormat } from "@/utils/date";
import { Button } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import { IHeaderTodoProps } from "@/components/screens/todos/helpers/types";
import { svgIcons } from "@/svgIcons";

const TodosHeader = ({ user, handleShowModal }: IHeaderTodoProps) => {
  const router = useRouter();
  const query = useSearchParams();
  const [date, setDate] = useState<string>(
    query.get("date") || getDateFormat()
  );
  return (
    <div className={styles.header}>
      <div className={"container"}>
        <div className={styles.wrap}>
          <div className={styles.avatar}>
            <Image src={"/avatar.png"} width={40} height={40} alt={"Avatar"} />
            <span>{user.name}</span>
          </div>
          <h1>{query.get("date") || getDateFormat()}</h1>
          <div className={styles.btns}>
            <button className={styles.dateBtn}>
              <input
                type="date"
                value={date}
                onChange={(event) => {
                  const value = event.target.value;
                  setDate(value);
                  if (value) router.push(`/todos?date=${value}`);
                }}
              />
              {svgIcons.date}
            </button>
            <Button
              onClick={() =>
                handleShowModal({
                  show: true,
                  type: "create",
                })
              }
            >
              {svgIcons.add}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosHeader;
