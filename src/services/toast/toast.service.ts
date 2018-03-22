import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";


@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {

  }

  show(message: string, duration: number = 3000): Promise<void> {
    return this.toastCtrl.create({
      message,
      duration,
      position: 'top'}).present();
  }

}
