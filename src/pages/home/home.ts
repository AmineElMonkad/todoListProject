import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import {AddListPage} from "../add-list/add-list";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  list$: Observable<List[]>;
  uid: string;
  pushPage: any;

  constructor(public navCtrl: NavController, public navParam: NavParams, private list: ListService, private toast: ToastService, private rAuth: AngularFireAuth) {


    this.uid = this.navParam.get('uid');
    this.pushPage = 'AddListPage';

    this.list$ = this.list.getList(this.uid).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
  }

  goToAddPage() {
    this.navCtrl.setRoot('AddListPage', { uid: this.uid })
  }

  logout() {
    this.rAuth.auth.signOut().then(() => {
      this.toast.show('Good Bye !');
      this.navCtrl.setRoot('LoginPage');
    });
  }

}
