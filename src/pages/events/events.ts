import {Component, OnInit} from '@angular/core';
import {AttendancePage} from "../attendance/attendance";
import {FirebaseListObservable} from "angularfire2";
import {EventsService} from "../../services/eventsSvc";
import {AlertController, NavController} from "ionic-angular";
import {EditEventPage} from "../edit-event/edit-event";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage implements OnInit{
  private today: Date;

  ngOnInit(): void {
    this.events = this.eventsSvc.getEvents();
  }
  events: FirebaseListObservable<any[]>;

  attendancePage = AttendancePage;

  constructor(private eventsSvc: EventsService,
              private navCtrl: NavController,
              private alertCtrl: AlertController){
    this.today = new Date();
  }

  getAttendanceCount(eventKey: string): number{
    return this.eventsSvc.getAttendanceCount(eventKey);
  }

  onNewEvent(){
    this.navCtrl.push(EditEventPage, {mode: 'New'});
  }

  ionViewWillEnter() {
    // this.events.subscribe(items => {
    //   // items is an array
    //   items.forEach(item => {
    //     console.log('Item:', item);
    //   });
    // });
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
