import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from "../../models/item/item.model";
import {ItemService} from "../../services/item/item.service";
import {ToastService} from "../../services/toast/toast.service";

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  item: Item = {
    name: ''
  }

  idList: string = '';

  uid: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private itemService: ItemService,
              private toast: ToastService) {
    this.idList = this.navParams.get('idList');
    this.uid = navParams.get('uid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  addItem(item: Item) {
    this.itemService.addItem(item, this.idList, this.uid).then(ref => {
      this.toast.show(`${item.name} added !`);
      this.navCtrl.setRoot('ItemPage', {key: ref.key, uid: this.uid, idList: this.idList});
    })
  }

}
