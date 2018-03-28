import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {AngularFireAuth} from "angularfire2/auth";
import {ToastService} from "../../services/toast/toast.service";
import {Subscription} from "rxjs/Subscription";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  list$: Observable<List[]>;
  lisShared$: Observable<any[]>;
  sharedList$: Observable<List[]>;
  listSharedWithOthers$ :Observable<any[]>;
  sharedList = [];
  uid: string = '';
  todoList: any;
  idUserOrigin: string = '';
  isPending: number = 0;
  lis: string = "Your";
  listOrigin = {
    pending: false
  };

  private subscription: Subscription = new Subscription();


  constructor(public navCtrl: NavController,
              public navParam: NavParams,
              private listService: ListService,
              private toast: ToastService,
              private rAuth: AngularFireAuth) {
    // this.uid = this.navParam.get('uid');
    this.uid = rAuth.auth.currentUser.uid;
    this.getList();

    this.list$.subscribe(result => {
      this.todoList = result;
    });


    this.getListShared();

    this.lisShared$.subscribe(result => {
      result.forEach(result => {
        this.idUserOrigin = result.idUser;
        this.getSharedList(result.idList, result.idUser);
        this.sharedList$.subscribe(res => {
          if(typeof(res[0]) != 'undefined') {
            if (!this.sharedList.find(value => value.key == res[0].key)) {
              res[0].pending = result.pending;
              res[0].idShList = result.key;
              if(res[0].pending)
                this.isPending++;
              this.sharedList.push(res[0]);
            }
          }
        });
      });
      this.isPending = 0;
      this.sharedList.splice(0, this.sharedList.length);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemPage');
  }

  // ionViewWillEnter() {
  //   if(this.navCtrl.last().id == 'ItemPage')
  //     this.navCtrl.setRoot('HomePage', { uid: this.uid });
  // }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ItemPage');
  }

  doRefresh(refresher) {
    this.navCtrl.setRoot('HomePage');
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

  getListSharedWithOthers(uid: string, idList: string) {
    this.listSharedWithOthers$ = this.listService.getListSharedWithOthers(uid, idList).snapshotChanges().map(
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
    this.getListSharedWithOthers(this.uid, list.key);
    this.listSharedWithOthers$.subscribe(result => {
      result.forEach(res => {
        this.listService.removeSharedList(res.userDes, res.userListDes);
      });
    });
    // this.listService.removeSharedList(list.userDes, list.userListDes);
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

  accept(idShList: string) {
    this.listService.editSh(this.uid, idShList, this.listOrigin);
    event.stopPropagation();
  }

  decline(idShList: string) {
    this.listService.removeSh(this.uid, idShList);
    event.stopPropagation();
  }

}
