export type TodoModalType = "create" | "change";
export interface ITodo {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  status: boolean;
}
export interface ITodoModalData {
  info?: ITodo;
  show: boolean;
  type: TodoModalType;
}

export interface ITodoModalProps {
  handleClose: (isUpdate?: boolean) => void;
  data: ITodoModalData;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IHeaderTodoProps {
  user: IUser;
  handleShowModal: (data: ITodoModalData) => void;
}
