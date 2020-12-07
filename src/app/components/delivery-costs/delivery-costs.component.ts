import {Component, Input, OnInit} from '@angular/core';
import { OrderService } from '../order/order.service';
import { TotalcartvalueService } from '../totalcartvalue.service';
import { DatatransferService } from '../../datatransfer.service';

@Component({
    selector: 'lacc-delivery-costs',
    templateUrl: './delivery-costs.component.html',
    styleUrls: ['./delivery-costs.component.scss']
})
export class DeliveryCostsComponent implements OnInit {

    @Input() delivery: number;
    @Input() itemsValue: number;
    gst=0.44;
    totalcartdiscount=0;
    
    coupon="";
    discountapplied=0;
    totalamount=0;
    gstamount=0;
    constructor(private orderService: OrderService,private totaldiscount:TotalcartvalueService,private gstvalue:DatatransferService,private coupontransfer:DatatransferService,private totalcartamount:DatatransferService) {
    }
    couponfetched(){
        this.coupon=this.coupontransfer.Coupon;
    }
    

    ngOnInit() {
        this.orderService.itemGst = this.itemsValue;
        this.orderService.freight = this.delivery;
        this.orderService.totalAmount = this.delivery+this.itemsValue;
    }
  /////////////////////////////////GST//////////////////////////////////
    GST(){
        this.gstamount=(this.delivery+this.itemsValue)*0.05;
        return (this.delivery+this.itemsValue)*0.05;
    }
  total(): number {
       /*  return this.delivery+this.itemsValue+ ((this.delivery + this.itemsValue)*0.05);
      */   
     this.totalamount=this.delivery+this.itemsValue+this.gstamount;
     this.totalcartamount.totalamount=this.delivery+this.itemsValue+this.gstamount
     return this.delivery+this.itemsValue+this.gstamount;
    }

    discount(){
        if(this.coupon=="SAVE20"){
            if(this.totalamount>=200){
                this.discountapplied=this.totalamount*0.2;
            }
            else{
                this.discountapplied=0;
            }
        }
        else
        if(this.coupon=="SAVE30"){
            if(this.totalamount>=300){
                this.discountapplied=this.totalamount*0.3;
            }
            else{
                this.discountapplied=0;
            }
        }
        else
        if(this.coupon=="SAVE50"){
            if(this.totalamount>=500){
                this.discountapplied=this.totalamount*0.5;
            }
            else{
                this.discountapplied=0;
            }
        }
        else{
            this.discountapplied=0;
        }
        this.orderService.discount = this.discountapplied;
        return this.discountapplied;
    }
    amountpayable(){
        return this.totalamount-this.discountapplied;
    }
}
