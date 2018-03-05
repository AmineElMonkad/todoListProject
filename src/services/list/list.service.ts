import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {List} from "../../models/list/list.model";

@Injectable()
export class ListService {

  private listRef = this.db.list<List>('todoList');

  constructor(private db: AngularFireDatabase) {

  }


  getList(uid: string) {
    let path: string = 'user/' + uid + '/todoList';
    this.listRef = this.db.list<List>(path);
    return this.listRef;
  }

  addList(list: List, uid: string) {
    let path: string = 'user/' + uid + '/todoList';
    this.listRef = this.db.list<List>(path);
    return this.listRef.push(list);
  }

  editList(list: List) {
    return this.listRef.update(list.key, list);
  }

  removeList(list: List) {
    return this.listRef.remove(list.key);
  }

}
