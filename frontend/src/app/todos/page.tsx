import React from "react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Todos from "@/components/screens/todos";
import { getDateFormat } from "@/utils/date";
import { parseJwtClient, parseJwtServer } from "@/utils/jwt";
export async function getTodos(query: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos?date=${query}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token?.value,
      },
    }
  );
  if (res.status === 403) {
    redirect("/auth");
  }
  if (res.status !== 200) {
    console.log("RES", res.status);
    notFound();
  }
  return {
    userInfo: parseJwtServer(token.value),
    todosByDate: await res.json(),
  };
}
export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  let query = searchParams.date;
  if (!query) {
    query = getDateFormat();
  }
  const { todosByDate, userInfo } = await getTodos(query);
  return <Todos todos={todosByDate} userInfo={userInfo} />;
}
