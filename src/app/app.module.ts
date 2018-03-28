import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CREDENTIALS} from "./firebase.credentials";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {ToastService} from "../services/toast/toast.service";
import {ListService} from "../services/list/list.service";
import {UserService} from "../services/user/user.service";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {ItemService} from "../services/item/item.service";
import {GooglePlus} from "@ionic-native/google-plus";
import {IonicStorageModule} from "@ionic/storage";
import {LoginService} from "../services/login/login.service";
import {SpeechRecognition} from "@ionic-native/speech-recognition";
import {QRScanner} from "@ionic-native/qr-scanner";
import {Camera} from "@ionic-native/camera";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Inirtialise AngularFire with credientials from the dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // Import the AngulareFireDatabaseModule to use database intercations
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastService,
    ListService,
    UserService,
    ItemService,
    GooglePlus,
    LoginService,
    SpeechRecognition,
    QRScanner,
    Camera
  ]
})
export class AppModule {}
