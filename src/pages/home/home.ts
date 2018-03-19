import {Component, NgZone} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  sharedList=[];
  sharedListt: any = {
    idUser: '',
    idList: ''
  }
  sharedListDisplay=[];
  uid: string;
  todoList: any;
  idUserOrigin: string = '';
  nameOrigin: string = '';
  exist: boolean = false;
  taille = 0;


  private subscription: Subscription = new Subscription();


  constructor(public navCtrl: NavController,
              public navParam: NavParams,
              private listService: ListService,
              private toast: ToastService,
              private rAuth: AngularFireAuth,
              public events: Events,
              private zone: NgZone) {


    this.uid = this.navParam.get('uid');

    // if(this.uid) {
    //   storage.set('uid', this.uid);
    //   console.log("uid is not null : " + this.uid);
    // } else {
    //   storage.get('uid').then((val) => {
    //     console.log("uid now is  null : " + this.uid);
    //     this.uid = val;
    //     console.log("uid now is not null : " + this.uid);
    //   });
    // }

    this.getList();

    this.list$.subscribe(result => {
      result.forEach(result => {

        console.log("hereeee : " + result.userDes);
      });
      this.todoList = result;


    });

    // this.events.subscribe('updateScreen', () => {
    //   this.zone.run(() => {
    //     console.log('force update the screen');
    //   });
    // });

    this.getListShared();

    this.lisShared$.subscribe(result => {
      console.log(result.length);
      this.taille = result.length;
      console.log("taille : " + this.taille);
      result.forEach(result => {
        this.idUserOrigin = result.idUser;
        this.getSharedList(result.idList, result.idUser);
        this.sharedList$.subscribe(res => {
              this.sharedList.push(res[0]);
        });
      });
      this.sharedList.splice(0, this.sharedList.length);
      // while(this.sharedList.length > 0) {
      //   this.sharedList.pop();
      // }
      // this.ngOnDestroy();
      //this.events.publish('updateScreen');
    });



  }

  getSharedList(idList: string, idUser: string) {
    this.sharedList$ = this.listService.getSharedList(idList, idUser).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );

  }

  getListShared() {
    this.lisShared$ = this.listService.getListOfShared(this.uid).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
  }


  getList() {
    this.list$ = this.listService.getList(this.uid).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      }
    );
  }


  logout() {
    this.rAuth.auth.signOut().then(() => {
      this.toast.show('Good Bye !');
      this.navCtrl.setRoot('LoginPage');
    });
  }

  stopProp() {
    event.stopPropagation();
  }


  removeToDoList(list: List,) {
    console.log("REMOVE " + list.userDes + " " + list.key);
    this.listService.removeSharedList(list.userDes, list.userListDes);
    this.listService.removeList(list, this.uid);
    event.stopPropagation();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
