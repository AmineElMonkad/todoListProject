import {ChangeDetectorRef, Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {List} from "../../models/list/list.model";
import {ListService} from "../../services/list/list.service";
import {ToastService} from "../../services/toast/toast.service";
import {User} from "../../models/user/user.model";
import {SpeechRecognition} from "@ionic-native/speech-recognition";

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
    name: '',
    created_at: 0
  }

  uid: string = '';
  user: User;
  matches: Array<string> = [];
  isSpeechAvailable = false;
  isListening = false;
  choosedValue: string = '';
  isFinish: boolean = false;

  constructor(public navCtrl: NavController,
              public navParam: NavParams,
              private listService: ListService,
              private toast: ToastService,
              private view: ViewController,
              private speechRecognition: SpeechRecognition,
              private cd: ChangeDetectorRef,
              private platform:  Platform) {
    this.uid = this.navParam.get('uid');

    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        // Check feature available
        this.speechRecognition.isRecognitionAvailable()
          .then((available: boolean) => this.isSpeechAvailable = available)
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListPage');
  }

  addList(list: List) {
    list.created_at = Date.now();
    if(list.name != '') {
      this.listService.addList(list, this.uid).then(() => {
        this.toast.show(`${list.name} added !`);
        this.view.dismiss();
        // this.navCtrl.setRoot('HomePage', {uid: this.uid});
      });
    }
  }


  startListening(): void {
    this.isListening = true;
    this.matches = [];
    let options = {
      language: 'en-US',
      matches: 5
    }

    // Start the recognition process
    this.speechRecognition.startListening(options)
      .subscribe(
        (matches: Array<string>) => {
          this.isListening = false;
          this.matches = matches;
          this.isFinish = true;
          this.cd.detectChanges();
        },
        (onerror) => {
          this.isListening = false;
          console.log(onerror.message);
          this.cd.detectChanges();
        }
      )

  }

  public stopListening(): void {
    this.speechRecognition.stopListening();
  }

  chooseIt(match: string) {
    this.choosedValue = match;
    this.cd.detectChanges();
  }



}
