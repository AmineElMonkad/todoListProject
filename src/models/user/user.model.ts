import {List} from "../list/list.model";

export interface User {
  email: string;
  password?: string;
  list?: List[];
}
