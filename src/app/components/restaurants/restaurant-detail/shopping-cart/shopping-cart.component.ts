import {Component, Input, OnInit} from '@angular/core';


import { TotalcartvalueService } from '../../../totalcartvalue.service';
import { DatatransferService } from '../../../../datatransfer.service';
/* <<<<<<< HEAD */
/* import { getHeapStatistics } from 'v8'; */
/* ======= */

/* >>>>>>> 7731d6306f818db8ebd20a100797fd4db3f02730 */
import {ShoppingCartService} from './shopping-cart.service';

@Component({
    selector: 'lacc-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    restaurantId: String;
    totalcart=0;
    totalcartvalue: any;
    constructor(private shooppingCartService: ShoppingCartService,private gstvalue:DatatransferService) {
    }

    ngOnInit() {
    }

    /**
     * Function that receives data from the menu item by propertBinding from the menu.component.html
     * @param item
     */
    addItem(item: any, restaurantId: String) {
        this.restaurantId = restaurantId;
        return this.shooppingCartService.addItem(item);
    }

    clear() {
        this.shooppingCartService.clear();
    }

    items() {
        return this.shooppingCartService.items;
    }

    removeItem(item: any) {
        this.shooppingCartService.removeItem(item);
    }

    GST() {
        this.gstvalue.GSTvalue=this.shooppingCartService.total()*0.05;
        return this.shooppingCartService.total()*0.05;
    }
    total() {
        return this.shooppingCartService.total();
    }
    
}
