import { ITodo } from "@/components/screens/todos/helpers/types";

export const sortTodosByTime = (todos: Array<ITodo>) => {
  return todos.sort(function (a, b) {
    return a.time.localeCompare(b.time);
  });
};
