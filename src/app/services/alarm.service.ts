import { Injectable } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Subject } from 'rxjs/Subject';



@Injectable()
export class AlarmService {
   public invokeEvent:Subject<any> = new Subject();
   constructor(private FlashMessage: FlashMessagesService) {}
     setUpAlarms(time: number){
  

   	var storage =  JSON.parse(localStorage.getItem('users'));
   	var alarms = [];
    var miliseconds = [];
    var eventNow = new Date();
	  for(var i=0; i < storage.length; i++){
    	var eventEndTime = storage[i]['hours'];
      var flag = storage[i]['flag'];
    	if (eventEndTime >= new Date()) {
          alarms.push(storage[i]);
          var duration = eventEndTime.valueOf() - eventNow.valueOf();
          miliseconds.push(duration);
          miliseconds = miliseconds.sort((a, b) => a - b);
      }
      }
      localStorage.setItem('users', JSON.stringify(alarms));

      return miliseconds;
     }
  }

