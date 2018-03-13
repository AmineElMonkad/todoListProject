import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  list$: Observable<List[]>;
  uid: string;
  todoList: any;

  constructor(public navCtrl: NavController,
              public navParam: NavParams,
              private listService: ListService,
              private toast: ToastService,
              private rAuth: AngularFireAuth) {


    this.uid = this.navParam.get('uid');


    // if(this.uid) {
    //   storage.set('uid', this.uid);
    //   console.log("uid is not null : " + this.uid);
    // } else {
    //   storage.get('uid').then((val) => {
    //     console.log("uid now is  null : " + this.uid);
    //     this.uid = val;
    //     console.log("uid now is not null : " + this.uid);
    //   });
    // }

    this.getList();

    this.list$.subscribe(result => {
      this.todoList = result;
    });

  }


  getList() {
    this.list$ = this.listService.getList(this.uid).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
  }


  logout() {
    this.rAuth.auth.signOut().then(() => {
      this.toast.show('Good Bye !');
      this.navCtrl.setRoot('LoginPage');
    });
  }

  stopProp() {
    event.stopPropagation();
  }

  removeToDoList(list: List) {
    this.listService.removeList(list);
    event.stopPropagation();
  }

}
