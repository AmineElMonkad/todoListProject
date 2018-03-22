import {Component, ViewChild} from '@angular/core';
import {IonicPage, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import {Observable} from "rxjs/Observable";
import {Item} from "../../models/item/item.model";
import {ItemService} from "../../services/item/item.service";

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
  uidOrigin: string = '';
  back: boolean;
  Btns: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastService,
              private rAuth: AngularFireAuth,
              private itemService: ItemService,
              private platform: Platform) {
    this.idList = this.navParams.get('idList');
    this.uid = this.navParams.get('uid');
    this.uidOrigin = this.navParams.get('uidOrigin');
    this.back = this.navCtrl.canGoBack();


    this.item$ = this.itemService.getItems(this.uid, this.idList).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );

    let backAction =  platform.registerBackButtonAction(() => {
      console.log("second");
      this.navCtrl.pop();
      backAction();
    },2)


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
    this.navCtrl.push('AddItemPage', {idList: this.idList, uid: this.uid, uidOrigin: this.uidOrigin});
  }

  goBack() {
    this.navCtrl.setRoot('HomePage', {uid: this.uidOrigin});
  }

  toogleBtn() {
    this.Btns = !this.Btns;
  }

  removeToDoItem(item: Item) {
    this.itemService.removeItem(item);
    // this.navCtrl.setRoot('ItemPage', {idList: this.idList, uid: this.uid, uidOrigin: this.uidOrigin});
  }

}
