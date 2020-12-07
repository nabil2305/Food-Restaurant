import { Component, Input, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Orders } from './orders.model';

import { OrderItemsComponent } from '../order/order-items/order-items.component'
import { from } from 'rxjs';
import { OrderService } from '../order/order.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderItem } from '../order/order.model';
import { MenuItem } from '../restaurants/restaurant-detail/menu-item/menu-item.model'
import { CartItem } from '../restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { Output } from '@angular/core/src/metadata/directives';
import { ReorderService } from '../../reorder.service';
import { RestaurantsService } from '../restaurants/restaurants-json.service';
import { LoginService } from '../security/login/login.service';
import { Review } from '../restaurants/restaurant-detail/reviews/reviews.model';

@Component({
  selector: 'lacc-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Orders[];
  // reorder: Order = new Order('', 0, '', '', null, '');
  reorderItems: CartItem[];
  reorder: Order;
  order: any;

  constructor(private ordersService: OrdersService, private reorderService: ReorderService, private router: Router, private route: ActivatedRoute,private restaurantService:RestaurantsService, private loginService: LoginService) {

  }

  ngOnInit() {
    this.orders = this.ordersService.Orders;
    this.reorderItems = this.reorderService.items;
    
    this.reorderService.menu = this.restaurantService.getMenuOfRestaurant(this.route.parent.snapshot.params['id']);
  }

  viewdetailbtn(reor: Order) {
    this.doview = true;
    this.modalview = "block";
   // this.reorder = reor;
   // this.reorderService.menu = this.ordersService.Orders.orderItems;
   // console.log('Reorder is: ' + this.reorder.address);

    //this.reorderService.reorder = reor;

  //  console.log('In Servie, Reorder is: ' + JSON.stringify(this.reorderService.reorder.orderItems));

   this.order = reor;

   // this.reorderService.viewdetails();
  }
  // constructor(private ordersService:OrdersService, private reorderService: ReorderService, private router: Router
  // ) { }

  rating: number = 0;
  comment: string = '';
  foodName: string = '';
  modalview = "block";
  modalvar = "block";
  ratePopUp = "none";
  rated = false;
  doRate = false;
  doview=false;
  date: string = Date.now().toString();
  review: Review = new Review();

  isRated1 = false;
  isRated2 = false;
  isRated3 = false;
  isRated4 = false;
  isRated5 = false;

  closePopUp() {
    this.modalvar = "none";
  }
  closeviewPopUp() {
    this.modalview = "none";
  }

  closeRateBox() {
    this.ratePopUp = "none";
  }

  changeRating1() {
    this.isRated1 = !this.isRated1;
    this.isRated2 = false;
    this.isRated3 = false;
    this.isRated4 = false;
    this.isRated5 = false;
  }
  changeRating2() {
    this.isRated2 = !this.isRated2;
    if (this.isRated2 == true) {
      this.isRated1 = true;
    }
    this.isRated3 = false;
    this.isRated4 = false;
    this.isRated5 = false;
  }
  changeRating3() {
    this.isRated3 = !this.isRated3;
    if (this.isRated3 == true) {
      this.isRated1 = true;
      this.isRated2 = true;
    }
    this.isRated4 = false;
    this.isRated5 = false;
  }
  changeRating4() {
    this.isRated4 = !this.isRated4;
    if (this.isRated4 == true) {
      this.isRated1 = true;
      this.isRated2 = true;
      this.isRated3 = true;
    }
    this.isRated5 = false;
  }
  changeRating5() {
    this.isRated5 = !this.isRated5;
    if (this.isRated5 == true) {
      this.isRated1 = true;
      this.isRated2 = true;
      this.isRated3 = true;
      this.isRated4 = true;
    }
  }

  getRatings() {
    if (this.isRated5 == true) {
      this.rating = 5;
    }
    else if (this.isRated4 == true) {
      this.rating = 4;
    }
    else if (this.isRated3 == true) {
      this.rating = 3;
    }
    else if (this.isRated2 == true) {
      this.rating = 2;
    }
    else if (this.isRated1 == true) {
      this.rating = 1;
    }
    console.log('Rating for ' + this.foodName + ' is: ')
    console.log('Rating is: ' + this.rating);
    console.log('Comment is:' + this.comment);
    this.modalvar = "none";
    this.review.comments = this.comment;
    this.review.rating = this.rating;
    this.review.name = this.loginService.user.userName;
    this.review.date = this.date;
    this.restaurantService.reviews.push(this.review);
  }

  rateBtn(order: Orders) {
    this.doRate = true;
    this.modalvar = "block";
    this.foodName = order.name;
  }



  reorderbtn(reor: Order) {
    this.reorder = reor;
    console.log('Reorder is: ' + this.reorder.address);
    this.reorderService.reorder = reor;
    console.log('In Servie, Reorder is: ' + JSON.stringify(this.reorderService.reorder.orderItems));
    this.router.navigate(["/order/{​​{​​restaurantId}​​}​​"]);
    this.reorderService.reordering();
  }



}

