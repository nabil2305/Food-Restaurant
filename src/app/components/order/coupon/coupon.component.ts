import { Component, OnInit, EventEmitter, Output ,Input} from '@angular/core';
import { TotalcartvalueService } from '../../totalcartvalue.service';
import { DatatransferService } from '../../../datatransfer.service';

@Component({
  selector: 'lacc-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css'],

})
export class CouponComponent implements OnInit {

    @Input() public parentData;
    totalcart=0;
  coupon="";
  total1=0;
  counter=0;
  total2=0;
  discount=0;
  @Output() modalClose = new EventEmitter<void>();

  totalcartvalue=0;
  constructor(private coupontransfer:DatatransferService,private totalcartamount:DatatransferService) { }


  ngOnInit() {
  }
  
  applycoupon(coupon){
    this.coupon=coupon.coup;
  }

  onClose(){
      this.modalClose.emit();
  }

  fetchcoupon(){
    if(this.coupon=="SAVE20"||this.coupon=="SAVE30"||this.coupon=="SAVE50"){
      this.coupontransfer.Coupon=this.coupon;
      return 1;
    }
    else
    {
      
      this.coupontransfer.Coupon=this.coupon;
      return 0;
    }
  }

  countervalue(){
    this.totalcartvalue=this.totalcartamount.totalamount;
    if(this.coupon=="SAVE20"){
      if(this.totalcartvalue<200){
        this.counter=200;
        return 1;
      }
    }
    else if(this.coupon=="SAVE30"){
      if(this.totalcartvalue<300){
        this.counter=300;
        return 1;
      }
    }
    else if(this.coupon=="SAVE50"){
      if(this.totalcartvalue<500){
        this.counter=500;
        return 1;
      }
    }
    else{
      return 0;
    }
  }
}
