import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {List} from "../../models/list/list.model";
import {ToastService} from "../../services/toast/toast.service";
import {ListService} from "../../services/list/list.service";

/**
 * Generated class for the EditListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-list',
  templateUrl: 'edit-list.html',
})
export class EditListPage {

  list: List = {
    name: ''
  }

  uid: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private listService: ListService,
              private toast: ToastService) {

    this.uid = this.navParams.get('uid');
    this.list = this.navParams.get('list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditListPage');
  }

  editList(list: List) {
    this.listService.editList(list, this.uid).then(res => {
      this.toast.show(`${list.name} edited !`);
      this.navCtrl.setRoot('HomePage', {uid: this.uid});
    });
  }

}
