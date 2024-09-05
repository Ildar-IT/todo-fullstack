import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function checkUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token?.value) redirect("/auth");

  redirect("/todos");
  return {};
}

export default async function Page() {
  const data = await checkUser();
  return <div>Ты не должен был сюда попасть</div>;
}
