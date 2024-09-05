import { ITodo } from "@/components/screens/todos/helpers/types";
import { getCookie } from "@/utils/cookies";
import { getDateFormat } from "@/utils/date";

export const updateTodoFetch = async (
  form: HTMLFormElement | null,
  todo: ITodo
) => {
  const body = {
    ...todo,
  };
  if (form) {
    for (const el of form.elements as HTMLElement) {
      if (form.elements.hasOwnProperty(el.name)) {
        body[el.name] = el.value;
      }
    }
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(body),
  });

  checkResponseStatus(response);

  const payload = await response.json();
  payloadValidateForm(form, payload);
};

export const createTodoFetch = async (form: HTMLFormElement) => {
  const body = {
    status: false,
  };
  for (const el of form.elements) {
    if (form.elements.hasOwnProperty(el.name)) {
      body[el.name] = el.value;
    }
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    body: JSON.stringify(body),
  });
  checkResponseStatus(response);

  const payload = await response.json();
  payloadValidateForm(form, payload);
};

export const getTodosFetch = async (
  query: string | null
): Promise<Array<ITodo> | never> => {
  if (!query) {
    query = getDateFormat();
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/todos?date=${query}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + getCookie("token"),
      },
    }
  );
  checkResponseStatus(response);
  const todos = await response.json();

  return todos;
};

export const payloadValidateForm = (
  form: HTMLFormElement,
  payload: {
    messages?: {
      [key: string]: string;
    };
  }
) => {
  if (payload.messages) {
    for (const key in payload?.messages) {
      const el = form?.elements[key];
      if (el) {
        el.setCustomValidity(payload?.messages[key]);
        el.reportValidity();
      }
    }
  }
};

export const checkResponseStatus = (response: Response) => {
  if (response.status < 200 || response.status > 299) {
    console.log(`Status=${response.status}, statusText=${response.statusText}`);
  }
};
