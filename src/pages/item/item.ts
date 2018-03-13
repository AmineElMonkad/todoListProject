import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import {Observable} from "rxjs/Observable";
import {Item} from "../../models/item/item.model";
import {ItemService} from "../../services/item/item.service";
import {List} from "../../models/list/list.model";

/**
 * Generated class for the ItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  item$ = new Observable<Item[]>();

  idList: string = '';
  uid: string = '';
  back: boolean;
  Btns: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastService,
              private rAuth: AngularFireAuth,
              private itemService: ItemService) {
    this.idList = navParams.get('idList');
    this.uid = navParams.get('uid');
    this.back = this.navCtrl.canGoBack();

    this.item$ = this.itemService.getItems(this.uid, this.idList).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

  logout() {
    this.rAuth.auth.signOut().then(() => {
      this.toast.show('Good Bye !');
      this.navCtrl.setRoot('LoginPage');
    });
  }

  goToAddItemPage() {
    this.navCtrl.push('AddItemPage', { idList: this.idList, uid: this.uid });
  }

  goBack() {
    this.navCtrl.setRoot('HomePage', { uid: this.uid });
  }

  toogleBtn() {
    this.Btns = !this.Btns;
  }

  removeToDoItem(item: Item) {
    this.itemService.removeItem(item);
  }

}
