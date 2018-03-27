import {Item} from "../item/item.model";

export interface List {
  key?: string;
  name?: string;
  items? : Item[];
  userDes?: string;
  userListDes?: string;
  created_at?: number;
  pending?: boolean;
  idShList?: string;
}
