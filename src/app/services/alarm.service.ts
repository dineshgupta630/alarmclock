import { Injectable } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';


@Injectable()
export class AlarmService {
   constructor(private FlashMessage: FlashMessagesService) {}

   setUpAlarms(time: number){
  

   	var all =  JSON.parse(localStorage.getItem('users'));
   	var mil = [];
    var mili = [];
    var eventNow = new Date();
	  for(var i=0; i < all.length; i++){
    	var eventEndTime = all[i]['hours'];
      var flag = all[i]['flag'];
    	if (eventEndTime >= new Date()) {
          mil.push(all[i]);
          var duration = eventEndTime.valueOf() - eventNow.valueOf();
          mili.push(duration);
          mili = mili.sort((a, b) => a - b);
      }
      }
      console.log(mili);
      localStorage.setItem('users', JSON.stringify(mil));

       for(var i =0; i< mili.length; i++){
          setTimeout(() => {
            this.FlashMessage.show('ALARM CLOCK WAKE UP', {cssClass: 'alert-danger', timeout: 20000});

            }, mili[i]);    

            return;     
          
       }
     }
  }

