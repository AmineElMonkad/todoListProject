import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {List} from "../../models/list/list.model";
import {User} from "../../models/user/user.model";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user/user.service";

@Injectable()
export class ListService {





  private listRef = this.db.list<List>('todoList');

  user: User;

  constructor(private db: AngularFireDatabase,
              private  userService: UserService) {

  }


  getList(uid: string) {
    let path: string = 'user/' + uid + '/todoList';
    this.listRef = this.db.list<List>(path);
    console.log("I'm heeeeeeeeeeere !!!");
    return this.listRef;
  }

  getNbTask(uid: string, idList: string) {
    let path: string = 'user/' + uid + '/todoList/' + idList + '/todoItem';
    this.listRef = this.db.list<List>(path);
    return this.listRef;
  }

  addList(list: List, uid: string) {


    let path: string = 'user/' + uid + '/todoList';
    this.listRef = this.db.list<List>(path);
    return this.listRef.push(list);
  }

  editList(list: List, uid: string) {
    let path: string = 'user/' + uid + '/todoList';
    this.listRef = this.db.list<List>(path);
    return this.listRef.update(list.key, list);
  }

  removeList(list: List) {
    return this.listRef.remove(list.key);
  }

}
