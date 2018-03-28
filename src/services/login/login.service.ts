import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {GooglePlus} from "@ionic-native/google-plus";
import * as firebase from "firebase/app";
import {UserService} from "../user/user.service";
import {User} from "../../models/user/user.model";
import {ToastService} from "../toast/toast.service";


@Injectable()
export class LoginService {


  user: User = {
    email: '',
    password: ''
  }

  constructor(private rAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private userService: UserService,
              private toast: ToastService) {

  }

  async nativeGoogleLogin(): Promise<void> {

    try {
      const gplusUser = await this.gplus.login({
        'webClientId': '25015540621-dc11671u54uuuqid9vlhr013vgvjbnvv.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      });

      return await this.rAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken)).then(res => {
        this.user.email = this.rAuth.auth.currentUser.email;
        this.user.photoURL = res.user.photoURL;
        this.user.displayName = res.user.displayName;
        this.userService.addUser(this.rAuth.auth.currentUser.uid, this.user);

      }).catch(err => {
        this.toast.show(err.message);
      });

    } catch(err) {
      console.log("hhh" + err);
    }
  }

  webGoogleLogin(): Promise<void> {

    return  this.rAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
      this.user.email = res.user.email;
      this.user.photoURL = res.user.photoURL;
      this.user.displayName = res.user.displayName;
      this.userService.addUser(res.user.uid, this.user);
    }).catch(err => {
      this.toast.show(err.message);
    });
  }

}
