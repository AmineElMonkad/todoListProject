import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Item} from "../../models/item/item.model";
import {ItemService} from "../../services/item/item.service";
import {ToastService} from "../../services/toast/toast.service";

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

  item: Item = {
    name: '',
    desc: ''
  }

  idList: string = '';
  uid: string = '';

  checked : boolean = true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private itemService: ItemService,
              private toast: ToastService) {
    this.idList = navParams.get('idList');
    this.uid = navParams.get('uid');
    this.item = this.navParams.get('item');
    this.checked = this.item.complete;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }

  editItem(item: Item) {
    if(this.checked)
      this.item.complete = true;
    else
      this.item.complete = false;
    this.itemService.editItem(item).then( res => {
      this.toast.show(`${item.name} edited !`);
      this.navCtrl.setRoot('ItemPage', {idList: this.idList, uid: this.uid});
    });
  }

  addValue(e): void {
    var isChecked = e.currentTarget.checked;
    console.log(this.checked);//it is working !!!

  }

}
