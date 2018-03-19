import {List} from "../list/list.model";

export interface User {
  key?: string;
  email: string;
  password?: string;
  lists?: List[];
  sharedList?: any;
}
