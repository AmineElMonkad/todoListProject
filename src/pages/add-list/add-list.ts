import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {ToastService} from "../../services/toast/toast.service";

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

  constructor(public navCtrl: NavController, public navParam: NavParams, private listService: ListService, private toast: ToastService) {
    this.uid = this.navParam.get('uid');
    console.log("4" + this.uid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListPage');
  }

  addList(list: List) {
    this.listService.addList(list, this.uid).then(ref => {
      this.toast.show(`${list.name} added !`);
      this.navCtrl.setRoot('HomePage', {key: ref.key, uid: this.uid});
    })
  }


}
