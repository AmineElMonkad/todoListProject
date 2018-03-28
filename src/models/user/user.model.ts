import {List} from "../list/list.model";

export interface User {
  key?: string;
  email: string;
  password?: string;
  photoURL?: string;
  displayName?: string;
  lists?: List[];
  sharedList?: any;
}
