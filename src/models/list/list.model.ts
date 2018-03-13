import {Item} from "../item/item.model";

export interface List {
  key?: string;
  name: string;
  items? : Item[]
}
