import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import {User} from "../../models/user/user.model";
import {List} from "../../models/list/list.model";




@Injectable()
export class UserService {


  private listRef = this.db.list<User>('user');
  private userRef: AngularFireList<any>;
  private listReff;


  constructor(private db: AngularFireDatabase) {

  }

  addUser(uid: string, user: User) {
    let path: string = 'user/' + uid;
    this.listReff = this.db.object(path);
    return this.listReff.update(user);
  }

  getUser(uid: string) {
    let path: string = 'user/' + uid;
    this.listRef = this.db.list<User>(path);
    return this.listRef;
  }

  getUsers(){
    let path: string = 'user';
    this.listRef = this.db.list<User>(path);
    return this.listRef;
  }

  // getUserByEmail(email: string) {
  //   this.userRef = this.db.list('user', ref => ref.equalTo(email));
  //   return this.listRef;
  // }

  editUser(uid: string, user: User) {
    let path: string = 'user/' + uid;
    this.listRef = this.db.list<User>(path);
    return this.listRef.update(uid, user);
  }

}
