import { Injectable } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';


@Injectable()
export class AlarmService {
   constructor(private FlashMessage: FlashMessagesService) {}

   setUpAlarms(time: number): void{
  

   	var all =  JSON.parse(localStorage.getItem('user'));
   	var mil = [];
   	console.log(all);
	  for(var i=0; i < all.length; i++){

	var hours = all[i]['hours'];
	var eventEndTime = new Date(hours.replace('T', ' ').replace('-', '/'));
	if (eventEndTime >= new Date()) {
    	var eventStartTime = new Date();
    	var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
   			 if (duration >= 0) {
		        console.log(duration);
		        mil.push(duration);
		        mil = mil.sort((a, b) => a - b);
    		}
		 }

	   }

	 for(var i=0; i < mil.length; i++){
	    setTimeout(() => {
        this.FlashMessage.show('ALARM CLOCK WAKE UP', {cssClass: 'alert-danger', timeout: 20000});
        }, mil[i]); 	    	
	  }
   	 }  
  }

