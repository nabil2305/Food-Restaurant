import { Component, OnInit } from '@angular/core';
import { EventReserve } from './event';

@Component({
  selector: 'lacc-reserve-event',
  templateUrl: './reserve-event.component.html',
  styleUrls: ['./reserve-event.component.css']
})
export class ReserveEventComponent implements OnInit {

  reserve: EventReserve = new EventReserve();
  othertype: string
  Hall=1
  //myDateValue: Date;
  //minDate: Date;

  constructor() { }

  ngOnInit() {
  //  this.myDateValue = new Date();
   // this.minDate = new Date();
  }

  storeData(){
    
    //this.reserve.type = this.othertype;
    if(this.reserve.menu && this.reserve.start_time && this.reserve.end_date && this.reserve.end_time && this.reserve.no){
        let val = this.reserve;
        let key = new Date().getTime();
        var startdate = new Date(this.reserve.start_date).getDate();
        var enddate = new Date(this.reserve.end_date).getDate();
        var todaydate = new Date().getDate();
        if(startdate < todaydate){
          alert("Start date not possible");
        }else if(startdate > enddate){
          alert("End date not possible");
        }else{
          if(this.reserve.type === "1"){
            this.reserve.type = this.othertype;
          }
          var booked = false;
          for (var i = 0; i < localStorage.length; i++){
            var key1 = localStorage.key(i);
            var stdate1 = JSON.parse(localStorage[key1]).start_date;
            var endate1 = JSON.parse(localStorage[key1]).end_date;
            var stdate = new Date(stdate1).getDate();
            var endate = new Date(endate1).getDate();
            if((startdate >= stdate && startdate <= endate) && (enddate >= stdate && enddate <= endate) ){
              booked = true;
              break;
            }
        }
        if(booked === false){
          localStorage.setItem(JSON.stringify(key),JSON.stringify(val));
          alert("Booking Successful");
        }else{
          alert("Houseful");
        }   
        }
      }else{
        alert("Booking Fail");
      }
    
    

    /*if(this.reserve.type === "1"){
      this.reserve.type = this.othertype;

      let key = this.reserve.start_date;
      var mydate = new Date(this.reserve.start_date);
      var todaydate = new Date();
      console.log(mydate);
      console.log(todaydate);

      if (mydate < todaydate){
        alert("fail");
      }
      let val = this.reserve;
      
      
      localStorage.setItem(JSON.stringify(key),JSON.stringify(val));
    }

    else{
      let key = this.reserve.start_date;
    let val = this.reserve;
    
    var mydate = new Date(this.reserve.start_date);
      var todaydate = new Date();
      console.log(mydate);
      console.log(todaydate);

      if (mydate < todaydate){
        alert("fail");
      }
    
    localStorage.setItem(JSON.stringify(key),JSON.stringify(val));
    }

    
    // console.log("eventype is "+this.eventType)
    // console.log(JSON.stringify(this.reserve))
    /*if(this.Hall<localStorage.length){
      alert("Housefull")
    }

     else if(this.reserve.type  && this.reserve.menu 
      && this.reserve.start_time && this.reserve.end_date && this.reserve.end_time && this.reserve.no ){
        alert("booking successful");
      }
      
      else{
        alert("booking failed");
      }*/
  }

}
