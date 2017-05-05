import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AlarmService} from '../../services/alarm.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AlarmService]
})
export class RegisterComponent implements OnInit {

  hours;
  id: String;
  timeid: String;
  time;
  heroes: any[];
  name: string;
  hero = [1, 2, 3, 4, 5].map(id => < any > {
      id: id,
      time: new Date(2017, 5, id)
  })


  constructor(
      private validateService: ValidateService,
      private FlashMessage: FlashMessagesService,
      private Router: Router,
      private AlarmService: AlarmService,
  ) {
      setTimeout(() => {
          this.ui();
      }, 10);
  }

  ngOnInit() {

      // this.ui();
  }

  onRegisterSubmit() {

      this.heroes = JSON.parse(localStorage.getItem('users'));

      var timeStr = new Date(this.hours);
      var date = new Date(timeStr);
      var day = date.getUTCDate();
      var year = date.getUTCFullYear();
      var month = date.getUTCMonth() + 1;
      var hour = date.getUTCHours();
      var minutes = date.getUTCMinutes();
      var dateStr = " The alarm time is " + hour + " Hours and " + minutes + " minutes and on date " + day + "/" + month + "/" + year;

      var user = {
          hours: (new Date(this.hours.replace('T', ' ').replace('-', '/'))).valueOf(),
          id: new Date().getTime(),
          time: dateStr,
          flag: 0,
      }

      let time = new Date().getTime();

      var storage = localStorage.getItem('users');
      var final = [];
      let fromAlarmService;
      if (storage == null || typeof(storage) == undefined) {
          final.push(user);
          localStorage.setItem('users', JSON.stringify(final));
          // this.ui();
          fromAlarmService = this.AlarmService.setUpAlarms();
      } else {
          var get = JSON.parse(localStorage.getItem('users'));
          var size = Object.keys(get).length;

          for (var i = 0; i < get.length; i++) {
              if (get[i].hours == user.hours) {
                  this.FlashMessage.show('You Enterted Same Time! Try Again!', {
                      cssClass: 'alert-danger',
                      timeout: 5000
                  });
              } else {
                  final.push(get[i]);
              }
          }
          final.push(user);
          localStorage.setItem('users', JSON.stringify(final));


          // fromAlarmService = this.AlarmService.setUpAlarms(time);


      }
          this.ui();
          // console.log(fromAlarmService);

  }


  ui() {
      let fromAlarmService = this.AlarmService.setUpAlarms();

      setTimeout(() => {

          var storage = localStorage.getItem('users');

          if (storage != null || typeof(storage) != undefined) {

              this.heroes = JSON.parse(storage);
          }
      }, 100);

      for (var i = 0; i < fromAlarmService.length; i--) {
          setTimeout(() => {
              this.FlashMessage.show('ALARM CLOCK WAKE UP', {
                  cssClass: 'alert-danger',
                  timeout: 10000
              });
              let time = new Date().getTime()
              this.ui();
              this.AlarmService.setUpAlarms();
          }, fromAlarmService[i]);
              break;
      }
  }

  alarm(){
    
  }

  check(e) {
      this.ui();
      console.log(e);
      console.log(e.target.checked);
      console.log(e.target.value);

      let get = JSON.parse(localStorage.getItem('users'));
      for (var i = get.length - 1; i > -1; i--) {
          if (get[i].id == e.target.value) {
              get.splice(i, 1);
          }
      }
      localStorage.setItem('users', JSON.stringify(get));

      console.log(get);


      let time = new Date().getTime()

      this.AlarmService.setUpAlarms();
  }
}