import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderService } from '../order/order.service';
import { ShoppingCartService } from '../restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { NotificationService } from '../shared/messages/notification.service';
import {DeliveryCostsComponent} from './delivery-costs.component';

describe('DeliveryCostsComponent', () =>{

    let component = DeliveryCostsComponent;
    let fixture: ComponentFixture<DeliveryCostsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeliveryCostsComponent],
            providers:[ OrderService,ShoppingCartService,NotificationService,HttpClient, HttpHandler]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeliveryCostsComponent);
     /*  component = fixture.componentInstance; */
        fixture.detectChanges();
    });

it('should be added', () => {
    expect(component).toBeTruthy();
});


});