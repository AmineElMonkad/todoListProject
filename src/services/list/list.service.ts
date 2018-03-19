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

  checkIfListExist(uid: string, idList: string) {
    let path: string = 'user/' + uid + '/todoList';

    return this.db.app.database().ref(path).child(idList);
    // this.db.object(path).snapshotChanges().map(snap => {
    //   // var exists = snap.key != null;
    //   console.log("SNAP " + snap.);
    // });
  }

  removeSharedList(userDes: string, userListDes: string) {
    console.log("fuckk " + userDes + " " + userListDes);
    let path: string = 'user/' + userDes+ '/sharedList/' + userListDes;
    return this.db.object(path).remove();

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

  addSharedList(sharedList: any, uid: string) {
    let path: string = 'user/' + uid + '/sharedList';
    console.log("aaa " + sharedList.idList + " " + uid);
    return this.db.list(path).push(sharedList);
  }

  getSharedList(idList: string, idUser: string) {
    let path: string = 'user/' + idUser + '/todoList';
    try {
      this.listRef = this.db.list<List>(path, ref => ref.orderByKey().equalTo(idList));
    } catch (err) {
      console.log("zeeue" + err.message);
    }

    return this.listRef;
  }

  editList(list: List, uid: string) {
    let path: string = 'user/' + uid + '/todoList';
    this.listRef = this.db.list<List>(path);
    return this.listRef.update(list.key, list);
  }

  addShUsList(shUs: any, uid: string, idList: string) {
    let path: string = 'user/' + uid + '/todoList/' + idList + '/friend';
    this.listRef = this.db.list(path);
    return this.listRef.push(shUs);
  }



  removeList(list: List, uid: string) {
    let path: string = 'user/' + uid + '/todoList';
    this.listRef = this.db.list<List>(path);
    return this.listRef.remove(list.key);
  }

  getListOfShared(uid: string) {
    let path: string = 'user/' + uid + '/sharedList';
    this.listRef = this.db.list(path);
    return this.listRef;
  }

  // shareList(list: List) {
  //   let path: string = 'user/' + uid + '/todoList';
  //   this.listRef = this.db.list<List>(path);
  //   return this.listRef.push(list);
  // }

}
