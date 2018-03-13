import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {ToastService} from "../../services/toast/toast.service";
import {User} from "../../models/user/user.model";
import {Observable} from "rxjs/Observable";
import {UserService} from "../../services/user/user.service";

/**
 * Generated class for the AddListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-list',
  templateUrl: 'add-list.html',
})
export class AddListPage {

  list: List = {
    name: ''
  }

  uid: string = '';
  user: User;
  user$: Observable<User[]>;

  constructor(public navCtrl: NavController,
              public navParam: NavParams,
              private listService: ListService,
              private toast: ToastService,
              private userService: UserService) {
    this.uid = this.navParam.get('uid');
    this.user$ = this.userService.getUser(this.uid).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );

    var that = this;
    console.log("imdsds");
    console.log(this.user$);
    this.user$.subscribe(result => {
      console.log("fuck ionic");
      result.forEach(function (value) {
        console.log("fuck this shit");
        that.user.key = value.key;
        that.user.email = value.email;
        that.user.password = value.password;
        console.log("fuck this shit");
        console.log("hohookodfodfk " + that.user);
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListPage');
  }

  addList(list: List) {
    // const date = new Date();
    // this.list.date = date;
    console.log(this.user);
    // this.user.list.push(list);
    // this.userService.editUser(this.uid, this.user).then(ref => {
    //     this.toast.show(`${list.name} added !`);
    //     this.navCtrl.setRoot('HomePage', {uid: this.uid});
    //   });
    this.listService.addList(list, this.uid).then(ref => {
      this.toast.show(`${list.name} added !`);
      this.navCtrl.setRoot('HomePage', {key: ref.key, uid: this.uid});
    })
  }


}
