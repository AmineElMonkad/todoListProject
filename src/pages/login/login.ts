import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user/user.model";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import * as firebase from "firebase/app";
import {UserService} from "../../services/user/user.service";
import {Observable} from "rxjs/Observable";

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

  uid: string = '';

  user$: Observable<User[]>;

  nb: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastService,
              private rAuth: AngularFireAuth,
              private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {
    this.rAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
      this.toast.show('You are loggedIn :D');
      this.navCtrl.setRoot('HomePage');
    }).catch(err => {
      this.toast.show(err.message);
    });
  }

  logWithGoogle() {

    this.rAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
      this.uid = res.user.uid;
      this.user.email = res.user.email;
      this.user$ = this.userService.getUser(this.uid).snapshotChanges().map(
        changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val()
          }))
        }
      );

      console.log("uid1 : " + this.uid);
      console.log(this.user);

      this.user$.subscribe(result => {
        if(result.length == 0) {
          this.userService.addUser(this.uid, this.user);
          console.log("uid2 : " + this.uid);
        }
      });


      this.toast.show('You are loggedIn With Google API :D');
      this.navCtrl.setRoot('HomePage', { uid: this.uid });
    }).catch(err => {
      this.toast.show(err.message);
    });
  }

}
