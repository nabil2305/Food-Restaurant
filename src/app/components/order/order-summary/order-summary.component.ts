import {​​​​Component, OnInit}​​​​ from '@angular/core';
import {​​​​ ActivatedRoute }​​​​ from '@angular/router';
import {​​​​ ReorderService }​​​​ from '../../../reorder.service';
import {​​​​ CartItem }​​​​ from '../../restaurants/restaurant-detail/shopping-cart/cart-item.model';
import {​​​​ LoginService }​​​​ from '../../security/login/login.service';
import {​​​​ Order }​​​​ from '../order.model';
import {​​​​ OrderService }​​​​ from '../order.service';

@Component({
    selector: 'lacc-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.css']
})
                
export class OrderSummaryComponent implements OnInit {
    
    stars:number[]=[1,2,3,4,5];
    selectedValue:number=0;
    reorderItems: CartItem[];
    orderedItems: CartItem[];
    gst: number = 0.05;
    itemGst: number = 0;
    freight: number = 10;
    totalAmount: number = 0;
    customerName: string = '';
    restaurantName: string = '';
    address: string = '';
    date = new Date();
    time: string;
    order: Order;
    modalvar="none";
    discount: number;
    rateMessage: string = '';
    isRated1: boolean = false;
    isRated2: boolean = false;
    isRated3: boolean = false;
    isRated4: boolean = false;
    isRated5: boolean = false;
    
    constructor(private route: ActivatedRoute, private loginService: LoginService, private reorderService: ReorderService, private orderService: OrderService) {
    }

    countStar(star){
        this.selectedValue=star;
    }

    submitrating(){
        console.log('Rating done is: '+this.selectedValue);
        let ratings = {}
        ratings["star"] = this.selectedValue;
        ratings["restaurant"] =  this.route.parent.snapshot.params['id'];
        ratings["count"] = 1;

        if (localStorage.getItem(ratings["restaurant"])) {
            let restaurant = JSON.parse(localStorage.getItem(ratings["restaurant"]));
            let total_rating = restaurant["star"] * restaurant["count"] + ratings["star"];
            let avg_rating = total_rating / (restaurant["count"] + 1);

            ratings["star"] = avg_rating;
            ratings["count"] = restaurant["count"] + 1;
        }
        localStorage.setItem(ratings["restaurant"], JSON.stringify(ratings));
        if(this.selectedValue == 1){
            this.isRated1 = true;
            this.rateMessage = 'We are sorry for inconvenience.'
        }
        if(this.selectedValue == 2){
            this.isRated1 = true;
            this.isRated2 = true;
            this.rateMessage = 'We will work hard.'
        }
        if(this.selectedValue == 3){
            this.isRated1 = true;
            this.isRated2 = true;
            this.isRated3 = true;
            this.rateMessage = 'We will make sure you like it next time.'
        }
        if(this.selectedValue == 4){
            this.isRated1 = true;
            this.isRated2 = true;
            this.isRated3 = true;
            this.isRated4 = true;
            this.rateMessage = 'We are happy to serve you.'
        }
        if(this.selectedValue == 5){
            this.isRated1 = true;
            this.isRated2 = true;
            this.isRated3 = true;
            this.isRated4 = true;
            this.isRated5 = true;
            this.rateMessage = 'We are glad you liked our service and food.'
        }
        this.modalvar = "none";
    }

    addClass(star){
        console.log(star, this.selectedValue);
        let ab="";
        for(let i=0;i<star;i++){
            ab="starId"+i;
            document.getElementById(ab).classList.add("selected");
        }
    }

    removeClass(star){
        let ab="";
        for(let i=star-1;i>=this.selectedValue;i--){
            ab="starId"+i;
            document.getElementById(ab).classList.remove("selected");
        }
    }

    ngOnInit() {
        this.reorderItems = this.reorderService.items;
        this.orderedItems = this.orderService.orderedItems;
        // this.itemGst;
        // this.freight;
        // this.totalAmount;
        this.address = this.orderService.order.address;
        this.customerName = this.loginService.user.userName;
        this.time = this.date.toTimeString();
        this.order = this.orderService.order;
        this.discount = this.orderService.discount;
        console.log('Reorder Items: '+JSON.stringify(this.reorderItems));
        console.log('Ordered Items: '+JSON.stringify(this.orderedItems));
        console.log('Item + GST: '+this.itemGst);
        console.log('Freight: '+this.freight);
        console.log('Total: '+this.totalAmount);
        console.log('New Address: '+this.order.address);
        console.log('Getting payment mode: '+this.order.paymentOptions);
        console.log('Discount:'+this.discount);
        if(this.reorderItems.length){
            for(let i=0; i<this.reorderItems.length; i++){
                this.restaurantName = this.reorderItems[i].menuItem.restaurantId;
                this.itemGst = this.itemGst + this.reorderItems[i].value();
            }
        }
        if(this.orderedItems.length){
            for(let i=0; i<this.orderedItems.length; i++){
                this.restaurantName = this.orderedItems[i].menuItem.restaurantId;
                this.itemGst = this.itemGst + this.orderedItems[i].value();
            }
        }
        this.itemGst = this.itemGst + (this.gst*(this.itemGst+this.freight));
        console.log('GST: '+this.gst*(this.itemGst+this.freight));
        this.totalAmount = this.itemGst + this.freight;
        this.totalAmount = this.totalAmount - this.discount;
    }

    askRate(){
        this.modalvar = "block";
        this.isRated1 = false;
        this.isRated2 = false;
        this.isRated3 = false;
        this.isRated4 = false;
        this.isRated5 = false;
    }

    closeit(){
        this.modalvar = "none";
    }
}