import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  photoURL: string = '';
  email: string = '';
  displayName: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private rAuth: AngularFireAuth) {
    this.photoURL = rAuth.auth.currentUser.photoURL;
    this.email = rAuth.auth.currentUser.email;
    this.displayName = rAuth.auth.currentUser.displayName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
