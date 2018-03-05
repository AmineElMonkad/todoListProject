import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {User} from "../../models/user/user.model";




@Injectable()
export class UserService {


  private listRef = this.db.list<User>('user');


  constructor(private db: AngularFireDatabase) {

  }

  addUser(uid: string, user: User) {
    return this.listRef.set(uid, user);
  }

  getUser(uid: string) {
    let path: string = 'user/' + uid;
    this.listRef = this.db.list<User>(path);
    return this.listRef;
  }

}
