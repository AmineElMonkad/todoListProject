import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Item} from "../../models/item/item.model";
import {List} from "../../models/list/list.model";


@Injectable()
export class ItemService {

  private itemRef = this.db.list<List>('todoList');

  constructor(private db: AngularFireDatabase) {

  }

  getListRef(uid: string, idList: string) {
    let path: string = 'user/' + uid + '/todoList/' + idList + '/todoItem';
    return this.db.list<List>(path);
  }

  getItems(uid: string, idList: string) {
    this.itemRef = this.getListRef(uid, idList);
    return this.itemRef;
  }

  addItem(item: Item, idList: string, uid: string) {
    let path: string = 'user/' + uid + '/todoList/' + idList + '/todoItem';
    this.itemRef = this.db.list<Item>(path);
    return this.itemRef.push(item);
  }

}
