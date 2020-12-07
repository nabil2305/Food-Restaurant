import {Injectable} from '@angular/core';
import {CartItem} from './cart-item.model';
import {MenuItem} from '../menu-item/menu-item.model';
import {NotificationService} from '../../../shared/messages/notification.service';
import { ReorderService } from '../../../../reorder.service';

@Injectable()
export class ShoppingCartService {

    items: CartItem[] = [];
    reorderItems: CartItem[] = [];

    constructor(private notificationService: NotificationService, private reorderService: ReorderService) {
        this.reorderItems = this.reorderService.items;
    }

    clear() {
        this.items = [];
        this.notificationService.notify(`You have removed all menu items`);
    }

    addItem(item: MenuItem) {
        const foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id);

        if (foundItem) {
            this.increaseQtd(foundItem);
        } else {
            this.items.push(new CartItem(item));
        }
        this.notificationService.notify(`You added the menu ${item.name}`);
    }


    increaseQtd(item: CartItem) {
        item.quantity = item.quantity + 1;
    }

    decreaseQtd(item: CartItem) {
        item.quantity = item.quantity - 1;
        if (item.quantity === 0) {
            this.removeItem(item);
        }
    }

    removeItem(item: CartItem) {
        console.log(`Removeu item: ${item.menuItem.name}`);
        this.items.splice(this.items.indexOf(item), 1);
        this.notificationService.notify(`You have removed the ${item.menuItem.name}`);
    }

    total(): number {
/* <<<<<<< HEAD
        return this.items
            .map(item => item.value()+item.value()*0.05) */
/* =======  */
/* function to add gst to cart total */
        if(this.items.length){
            return this.items
            .map(item => item.value()+item.value()*0.05)
/* >>>>>>> 1c39bb19e1ec24f558d2311e3d3b24cfd59c8fdf */
            .reduce((prev, value) => prev + value, 0);
        }
        else{
            return this.reorderItems
            .map(reorderItem => reorderItem.value())
            .reduce((prev, value) => prev + value, 0);
        }
        
    }
}
