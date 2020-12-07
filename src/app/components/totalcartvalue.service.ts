import { Injectable } from '@angular/core';
import { total } from '../totalcartvalueclass';

@Injectable({
  providedIn: 'root'
})
export class TotalcartvalueService {
  total:number;
  discount:number;
  constructor() { 
    this.total=0;
    this.discount=0;
  }
}
