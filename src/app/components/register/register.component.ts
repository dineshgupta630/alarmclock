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
   
   hours;
   id: String;
   timeid: String;
   time;
   heroes: any[];
   name:string;
   hero = [1,2,3,4,5].map(id => <any>{id:id, time: new Date(2017,5,id)})


  constructor(
    private validateService: ValidateService, 
    private FlashMessage: FlashMessagesService,
    private Router: Router,
    private AlarmService: AlarmService
    ) { 
        
      }

  ngOnInit() {

     this.ui();
  }

  onRegisterSubmit(){

    this.ui();

    this.heroes = JSON.parse(localStorage.getItem('users'));

    var timeStr = new Date(this.hours);
    var date = new Date(timeStr);
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth()+1;
    var hour = date.getUTCHours();
    var minutes = date.getUTCMinutes();
    var dateStr = " The alarm time is " + hour + ":"+ minutes + " on date " +day+"/"+month+"/"+year;

    console.log(dateStr);

    var user = {
      hours: (new Date(this.hours.replace('T', ' ').replace('-', '/'))).valueOf(),
      id: new Date().getTime(),
      time: dateStr,
      flag: 0,
    }    

     let time = new Date().getTime()

     var storage = localStorage.getItem('users');
     var final = [];
      if (storage == null || typeof(storage) == undefined )
      {  final.push(user);
    
       localStorage.setItem('users', JSON.stringify(final));

       this.AlarmService.setUpAlarms(time);

      }else{
       var get =  JSON.parse(localStorage.getItem('users'));
       var size = Object.keys(get).length;

       for(var i =0; i< get.length; i++){
           if(get[i].hours == user.hours){
            this.FlashMessage.show('You Enterted Same Time! Try Again!', {cssClass: 'alert-danger', timeout: 5000});
           }else{
           final.push(get[i]);         
           }
       }
       final.push(user);
       localStorage.setItem('users', JSON.stringify(final));    

       this.AlarmService.setUpAlarms(time);

       this.ui();
      }     
  } 


  ui(){
    setTimeout(() => {
     this.heroes = JSON.parse(localStorage.getItem('users'));
     console.log(this.heroes);
       }, 100);  
  }

  check(e){
    console.log(e);
    console.log(e.target.checked);
    console.log(e.target.value);

     let get = JSON.parse(localStorage.getItem('users'));
     for(var i= get.length -1 ; i > -1; i--) {
          if(get[i].id == e.target.value) {
              get.splice(i, 1);
          }
      }
     localStorage.setItem('users', JSON.stringify(get)); 

     console.log(get); 

     this.ui();

     let time = new Date().getTime()

     this.AlarmService.setUpAlarms(time);
  }
}
 