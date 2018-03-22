import {Component} from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, Platform} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import {Subscription} from "rxjs/Subscription";
import {ListPage} from "../list/list";
import {SharedListPage} from "../shared-list/shared-list";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  list$: Observable<List[]>;
  lisShared$: Observable<any[]>;
  sharedList$: Observable<List[]>;
  sharedList = [];
  uid: string;
  todoList: any;
  idUserOrigin: string = '';
  tab1: any = 'ListPage';
  tab2: any;
  lis: string = "Your";

  private subscription: Subscription = new Subscription();


  constructor(public navCtrl: NavController,
              public navParam: NavParams,
              private listService: ListService,
              private toast: ToastService,
              private rAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private platform: Platform) {

    this.tab1 = ListPage;
    this.tab2 = SharedListPage;
    this.uid = this.navParam.get('uid');
    this.sharedList.splice(0, this.sharedList.length);

    platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot('HomePage', { uid: this.uid });
      console.log("backPressed 1");
    },1);

    this.getList();

    this.list$.subscribe(result => {
      this.todoList = result;
    });


    this.getListShared();

    this.lisShared$.subscribe(result => {
      let lnth = result.length;
      console.log("lnth : " + lnth);
      result.forEach(result => {
        this.idUserOrigin = result.idUser;
        this.getSharedList(result.idList, result.idUser);
        this.sharedList$.subscribe(res => {
          this.sharedList.push(res[0]);
          console.log(this.sharedList);
          console.log("length : " + this.sharedList.length);
          // if (this.sharedList.length > lnth)
          //   this.sharedList.pop();
        });
      });

      this.sharedList.splice(0, this.sharedList.length);
    });


    // this.modalCtrl.create(HomePage).onDidDismiss(() => {
    //
    // })

  }

  doRefresh(refresher) {
    this.navCtrl.setRoot('HomePage', { uid: this.uid });
    // console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 5000);
  }


  /* Get reference of shared list */

  getSharedList(idList: string, idUser: string) {
    this.sharedList$ = this.listService.getSharedList(idList, idUser).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );

  }

  /* Get List Shared from other users */

  getListShared() {
    this.lisShared$ = this.listService.getListOfShared(this.uid).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
  }

  /* Get TodoList */

  getList() {
    this.list$ = this.listService.getList(this.uid).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
  }

  /* Logout */

  logout() {
    this.rAuth.auth.signOut().then(() => {
      this.toast.show('Good Bye !');
      this.navCtrl.setRoot('LoginPage');
    });
  }

  /* Remove List */

  removeToDoList(list: List) {
    console.log("REMOVE " + list.userDes + " " + list.key);
    this.listService.removeSharedList(list.userDes, list.userListDes);
    this.listService.removeList(list, this.uid);
    event.stopPropagation();
  }

  /* Destroy subscribtion */

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /* Stop Propagation when 2 events are launched */

  stopProp() {
    event.stopPropagation();
  }

  // addList() {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Add new list',
  //     inputs: [
  //       {
  //         name: 'Name',
  //         placeholder: 'Name'
  //       },
  //       {
  //         name: 'Description',
  //         placeholder: 'Description'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           console.log('Saved clicked');
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

}
