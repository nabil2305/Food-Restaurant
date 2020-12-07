import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { TableReserve } from './table';


@Component({
    selector: 'lacc-reserve-table',
    templateUrl: './reserve-table.component.html',
    styleUrls: ['./reserve-table.component.css']
})

export class ReserveTableComponent implements OnInit {

    table: TableReserve = new TableReserve();

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        
    }

    saveData(){

      if(this.table.date && this.table.guest && this.table.time && this.table.name && this.table.email && this.table.phno ){
          let val = this.table;
          let key = new Date().getTime();
          var startdate = new Date(this.table.date).getDate();
         
          var todaydate = new Date().getDate();
          if(startdate < todaydate){
            alert("Date not possible");
          }else{
            var booked = 0;
              for (var i = 0; i < localStorage.length; i++){
                var key1 = localStorage.key(i);
                var bookeddate1 = JSON.parse(localStorage[key1]).date;
                var bookeddate = new Date(bookeddate1).getDate();
                if( startdate === bookeddate){
                  booked++;
                  if(booked == 2){
                    break;
                  }
                }
              }
            if(booked <= 1){
              localStorage.setItem(JSON.stringify(key),JSON.stringify(val));
              alert("Booking Successful");
            }else{
              alert("Houseful");
            }
            
             
          }
        }else{
          alert("Booking Fail");
        }  
      
      /*let key = this.table.email;
        let val = this.table;   
        localStorage.setItem(JSON.stringify(key),JSON.stringify(val));  

        

        if(this.Table < localStorage.length){
          alert("Housefull");
        }
        else if(this.table.date && this.table.guest && this.table.time && this.table.name && this.table.email && this.table.phno ){
          alert("booking successful");
        }
        else{
          alert("booking failed");
        } */

      }
    

}
