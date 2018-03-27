import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {List} from "../../models/list/list.model";
import {User} from "../../models/user/user.model";

@Injectable()
export class ListService {


  user: User;

  constructor(private db: AngularFireDatabase) {

  }


  getList(uid: string): AngularFireList<List> {
    return this.db.list<List>('user/' + uid + '/todoList', ref => ref.orderByChild('created_at'));
  }

  getListSharedWithOthers(uid: string, idList: string) {
    return this.db.list('user/' + uid + '/todoList/' + idList + '/listShared');
  }

  removeSharedList(userDes: string, userListDes: string): Promise<void> {
    return this.db.object('user/' + userDes + '/sharedList/' + userListDes).remove();
  }


  addList(list: List, uid: string) {
    return this.db.list<List>('user/' + uid + '/todoList').push(list);
  }

  addSharedList(sharedList: any, uid: string) {
    return this.db.list('user/' + uid + '/sharedList').push(sharedList);
  }

  getSharedList(idList: string, idUser: string) {
    try {
      return this.db.list<List>('user/' + idUser + '/todoList', ref => ref.orderByKey().equalTo(idList));
    } catch (err) {
      console.log(err.message);
    }
  }

  editList(list: List, uid: string) {
    return this.db.list<List>('user/' + uid + '/todoList/' + list.key + '/listShared').push(list);
  }

  editSh(uid: string, idListSh: string, listSh: any) {
    return this.db.list('user/' + uid + '/sharedList').update(idListSh, listSh);
  }

  removeSh(uid: string, idListSh: string) {
    return this.db.list('user/' + uid + '/sharedList').remove(idListSh);
  }

  removeList(list: List, uid: string) {
    return this.db.list<List>('user/' + uid + '/todoList').remove(list.key);
  }

  getListOfShared(uid: string) {
    return this.db.list('user/' + uid + '/sharedList');
  }


}
