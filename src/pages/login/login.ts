import {Component} from '@angular/core';
import {IonicPage, NavController, Platform} from 'ionic-angular';
import {User} from "../../models/user/user.model";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import {LoginService} from "../../services/login/login.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = {
    email: '',
    password: ''
  }

  constructor(public navCtrl: NavController,
              private toast: ToastService,
              private rAuth: AngularFireAuth,
              private platform: Platform,
              private loginService: LoginService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  googleLogin() {
    if (this.platform.is('cordova')) {
      this.loginService.nativeGoogleLogin().then(() => {
        this.toast.show('You are loggedIn With Google API :D');
        this.navCtrl.setRoot('HomePage', {uid: this.rAuth.auth.currentUser.uid});
      });
    } else {
      this.loginService.webGoogleLogin().then(() => {
        this.toast.show('You are loggedIn With Google API :D');
        this.navCtrl.setRoot('HomePage', {uid: this.rAuth.auth.currentUser.uid});
      });
    }
  }


}
