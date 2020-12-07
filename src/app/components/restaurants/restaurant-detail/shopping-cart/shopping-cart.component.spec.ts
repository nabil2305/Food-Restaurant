import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '../../../shared/messages/notification.service';
import {ShoppingCartComponent} from  './shopping-cart.component';
import { ShoppingCartService } from './shopping-cart.service';

describe('ShoppingCartComponent', () =>{

    let component = ShoppingCartComponent;
    let fixture: ComponentFixture<ShoppingCartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShoppingCartComponent],
            providers:[ShoppingCartService,NotificationService]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingCartComponent);
      /*   component = fixture.componentInstance;  */
        fixture.detectChanges();
    });

 it('should be added', () => {
    expect(component).toBeTruthy();
}); 
it('should be multipled', () => {
    expect(component).toBeTruthy();
}); 

});