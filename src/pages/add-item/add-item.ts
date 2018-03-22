import {ChangeDetectorRef, Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {Item} from "../../models/item/item.model";
import {ItemService} from "../../services/item/item.service";
import {ToastService} from "../../services/toast/toast.service";
import {SpeechRecognition} from "@ionic-native/speech-recognition";

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  item: Item = {
    name: '',
    desc: ''
  }

  idList: string = '';
  uidOrigin: string = '';

  uid: string = '';

  matches: Array<string> = [];
  isSpeechAvailable = false;
  isListening = false;
  choosedValue: string = '';
  choosedValueName: string = '';
  choosedValueDesc: string = '';
  isFinish: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private itemService: ItemService,
              private toast: ToastService,
              private view: ViewController,
              private speechRecognition: SpeechRecognition,
              private cd: ChangeDetectorRef,
              private platform:  Platform) {
    this.idList = this.navParams.get('idList');
    this.uid = navParams.get('uid');

    this.uidOrigin = navParams.get('uidOrigin');
    if (platform.is('cordova')) {
      platform.ready().then(() => {
        // Check feature available
        this.speechRecognition.isRecognitionAvailable()
          .then((available: boolean) => this.isSpeechAvailable = available)
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  addItem(item: Item) {
    this.item.complete = false;
    this.itemService.addItem(item, this.idList, this.uid).then(ref => {
      this.toast.show(`${item.name} added !`);
      this.view.dismiss();
      // this.navCtrl.setRoot('ItemPage', {key: ref.key, uid: this.uid, idList: this.idList, uidOrigin: this.uidOrigin});
    })
  }

  startListening(val: string): void {
    this.choosedValue = val;
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
    if(this.choosedValue == 'name')
      this.choosedValueName = match;
    if(this.choosedValue == 'description')
      this.choosedValueDesc = match;
    this.cd.detectChanges();
  }

}
