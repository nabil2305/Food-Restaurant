import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { from } from 'rxjs';
import {CartItem} from '../../restaurants/restaurant-detail/shopping-cart/cart-item.model';
import {ReorderService} from '../../../reorder.service'
import { RestaurantsService } from '../../restaurants/restaurants-json.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
@Component({
    selector: 'lacc-order-items',
    templateUrl: './order-items.component.html',
    styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

    @Input() items: CartItem[];
    @Output() increaseQtd = new EventEmitter<CartItem>();
    @Output() decreaseQtd = new EventEmitter<CartItem>();
    @Output() remove = new EventEmitter<CartItem>();

    reorderItems: CartItem[];



    constructor(private reorderService: ReorderService, private restaurantService: RestaurantsService, private route: ActivatedRoute, private orderService: OrderService) {
        this.reorderItems = this.reorderService.items;
    }

    ngOnInit() {
        this.reorderService.menu = this.restaurantService.getMenuOfRestaurant(this.route.parent.snapshot.params['id']);
        this.orderService.orderedItems = this.items;
        console.log('You required items: '+this.items);
    }

    emitIncreaseQtd(item: CartItem) {
        this.increaseQtd.emit(item);
    }

    emitDecreaseQtd(item: CartItem) {
        this.decreaseQtd.emit(item);
    }

    emitRemove(item: CartItem) {
        this.remove.emit(item);
    }

}
