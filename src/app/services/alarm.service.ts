import { Injectable } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class AlarmService {
   public invokeEvent:Subject<any> = new Subject();
   constructor(private FlashMessage: FlashMessagesService) {}
     setUpAlarms(){
         	var storage =  JSON.parse(localStorage.getItem('users'));
         	var alarms = [];
          var miliseconds = [];
          for(var i= storage.length - 1; i > -1; i--){
            var eventEndTime = storage[i]['hours'];
            var flag = storage[i]['flag'];
            var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,-8);         
            if(eventEndTime == localISOTime){
                  storage.splice(i, 1);
                  localStorage.setItem('users', JSON.stringify(storage));    
                  this.notification();      

             }
            }  
     }

    notification(){
        this.FlashMessage.show('ALARM CLOCK WAKE UP', {
        cssClass: 'alert-danger',
        timeout: 10000
        });

     }
  }

