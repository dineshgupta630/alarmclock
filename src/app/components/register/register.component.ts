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

    if (typeof (Storage) == undefined)
      {
          localStorage.setItem('user', JSON.stringify(user));
      }else{
       var abc = [];
       var get =  JSON.parse(localStorage.getItem('user'));
       for(var i =0; i< get.length; i++){
           abc.push(get[i]);
       }
       abc.push(user);
       localStorage.setItem('user', JSON.stringify(abc));        
      }        

     let time = new Date().getTime()

     this.AlarmService.setUpAlarms(time);

  }
}
 