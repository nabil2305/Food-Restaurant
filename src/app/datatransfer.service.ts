import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  GSTvalue:number;
  Coupon:string;
  totalamount:number;
  constructor() { 
    this.GSTvalue=0;
    this.Coupon="";
    this.totalamount=0;
  }
}
