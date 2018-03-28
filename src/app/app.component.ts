import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SpeechRecognition} from "@ionic-native/speech-recognition";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'LoginPage';
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private speechRecognition: SpeechRecognition,
              private menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('cordova')) {
        this.speechRecognition.hasPermission()
          .then((hasPermission: boolean) => {
            if (!hasPermission) {
              this.requestSpeechRecognitionPermission();
            }
          })
      }
    });
  }

  private requestSpeechRecognitionPermission(): void {
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )
  }

  goHome() {
    this.nav.setRoot('HomePage');
    this.closeMenu();
  }

  goProfile() {
    this.nav.push('ProfilePage').then(() => {
      this.closeMenu();
    });
  }

  goQr() {
    this.nav.push('QrCodePage').then(() => {
      this.closeMenu();
    });
  }

  closeMenu() {
    this.menu.close();
  }
}

