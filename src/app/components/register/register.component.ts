import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AlarmService} from '../../services/alarm.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   
   hours: String;
   id: String;


  constructor(
    private validateService: ValidateService, 
    private FlashMessage: FlashMessagesService,
    private Router: Router,
    private AlarmService: AlarmService
    ) { 

        
      }

  ngOnInit() {

  }

  onRegisterSubmit(){
  	var user = {
  		hours: this.hours,
      id: new Date().getTime()
  	}    

    setTimeout(() => {
      this.FlashMessage.show('Your alarm has been added.', {cssClass: 'alert-success', timeout: 5000});
      }, 10);  

     var storage = localStorage.getItem('user');
    if (typeof(storage) == undefined)
      {
        localStorage.setItem('user', JSON.stringify(user));
      }else{
       var final = [];
       var get =  JSON.parse(localStorage.getItem('user'));
       for(var i =0; i< get.length; i++){
           final.push(get[i]);
       }
       final.push(user);
       localStorage.setItem('user', JSON.stringify(final));        
      }        

     let time = new Date().getTime()

     this.AlarmService.setUpAlarms(time);

  }
}
 