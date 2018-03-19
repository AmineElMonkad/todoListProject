import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../models/user/user.model";
import {UserService} from "../../services/user/user.service";
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the ShareListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-list',
  templateUrl: 'share-list.html',
})
export class ShareListPage {

  user: User = {
    email: ''
  }

  list: List = {
    key: '',
    name: ''
  }

  listOrigin: List = {
    userListDes: '',
    userDes: ''
  };

  sharedList: any = {
    idUser: '',
    idList: ''
  }

  idList: string = '';
  user$: Observable<User[]>;
  private subscription: Subscription = new Subscription();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private userService: UserService,
              private rAuth: AngularFireAuth,
              private toast: ToastService,
              private listService: ListService) {
    this.idList = navParams.get('idList');
    this.list = navParams.get('list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareListPage');
  }



  getUserByEmail(email: string) {
    var exist: boolean = false;
    var key: string = '';
    this.user$ = this.userService.getUsers().snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );

    this.subscription = this.user$.subscribe(result => {
      result.forEach(result => {
        if(result.email == email) {
          exist = true;
          key = result.key;
        }
      });
      if(!exist) {
        this.toast.show('There\'s no user with this email');
        this.ngOnDestroy();
      } else {
        this.sharedList.idList = this.list.key;
        this.sharedList.idUser = this.rAuth.auth.currentUser.uid;
        this.listService.addSharedList(this.sharedList, key).then(ref => {
          console.log(ref.key);
          // this.shUs.idFriend = key;
          // this.shUs.idShList = ref.key;
          this.listOrigin.key =  this.list.key;
          this.listOrigin.userListDes = ref.key;
          console.log(this.listOrigin.userListDes);
          this.listOrigin.userDes = key;
          this.listService.editList(this.listOrigin, this.rAuth.auth.currentUser.uid).then(res => {
            this.toast.show(`List shared with success !`);
            this.navCtrl.setRoot('HomePage', {uid: this.rAuth.auth.currentUser.uid});
          });
        });
        console.log("1");
        this.ngOnDestroy();

      }
    });


      // function(providers) {
      // if(providers.length == 0) {
      //   alert("There's no user with this email !")
      // } else {
      //   console.log(providers.user);
      // }
      // });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}