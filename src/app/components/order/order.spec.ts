import {TestBed} from '@angular/core/testing';
import {OrderComponent} from '../order/order.component';
import {ReactiveFormsModule} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderService } from './order.service';
import { ShoppingCartService } from '../restaurants/restaurant-detail/shopping-cart/shopping-cart.service';
import { NotificationService } from '../shared/messages/notification.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }
describe('Component: Order',()=>{
    
    beforeEach(()=> {
        TestBed.configureTestingModule({
            declarations: [OrderComponent],
            schemas: [NO_ERRORS_SCHEMA],
            imports:[ReactiveFormsModule],
            providers:[OrderService,ShoppingCartService,NotificationService,HttpClient, HttpHandler, {provide: Router, useClass: MockRouter}, {provide:ActivatedRoute, useClass: MockRouter}],
            
        }).compileComponents();
    })
    it('should create the app',()=>{
        let fixture=TestBed.createComponent(OrderComponent);
        let app=fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
    it('user have not clicked detect my location button',()=>{
        let fixture=TestBed.createComponent(OrderComponent);
        let app=fixture.debugElement.componentInstance;
        app.loc=false;
        fixture.detectChanges();
        let compiled=fixture.debugElement.nativeElement;
        expect(compiled.querySelector('textarea').textContent).toBe('');
    })
});