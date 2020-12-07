
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { OrderService } from './order.service';
import { CartItem } from '../restaurants/restaurant-detail/shopping-cart/cart-item.model';
import { PATTERS } from '../shared/patterns';
import { RadioOption } from '../shared/radio/radio-option.model';
import { Order, OrderItem } from './order.model';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'lacc-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    orderForm: FormGroup;
    delivery: number = 10;
    orderId: string;
    isDeliverySummary: boolean = false;
    url: string;
    city: string;
    loc: boolean = false;


    paymentOptions: RadioOption[] = [
        { label: 'Money', value: 'MON' },
        { label: 'Credit cart', value: 'CC' },
        { label: 'Debit cart', value: 'CD' },
        { label: 'Other', value: 'NN' }
    ];

    constructor(private orderService: OrderService,
                private router: Router,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private http: HttpClient) {
    }




    ngOnInit() {

        this.getLocationService();
        this.orderForm = this.formBuilder.group({
            // name: new FormControl('', {
            //     validators: [Validators.required, Validators.minLength(3)]
            // }),
            address: new FormControl(this.getGeoLocation(), [Validators.required, Validators.minLength(5)]),
            number: new FormControl('', [Validators.required, Validators.pattern(PATTERS.number)]),
            landmark: new FormControl('', [Validators.required]),
            zipcode: new FormControl('', [Validators.required, Validators.pattern(PATTERS.number)]),
            addresstag: new FormControl(''),
            save: new FormControl(''),
            // email: new FormControl('', [Validators.required, Validators.pattern(PATTERS.email)]),
            // emailConfirmation: new FormControl('', [Validators.required, Validators.pattern(PATTERS.email)]),
            // optionalAddress: this.formBuilder.control(''),
            paymentOption: new FormControl('card', [Validators.required]),
        }
            // ,{validators: [this.emailEqualsTo], updateOn: 'blur'}
        );
    }

    // private emailEqualsTo(group: AbstractControl): { [key: string]: boolean } {
    //     const email = group.get('email');
    //     const emailConfirmation = group.get('emailConfirmation');

    //     if (!email || !emailConfirmation) {
    //         return undefined;
    //     }

    //     if (email.value !== emailConfirmation.value) {
    //         return {emailsNotMatch: true};
    //     }

    //     return undefined;
    // }
    clicked() {
        this.loc = true;
    }
    getGeoLocation(): string {


        var mycity: string;
        this.getLocationService().then(resp => {
            console.log(resp.lng);
            console.log(resp.lat);
            this.url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + resp.lng + "," + resp.lat + ".json?access_token=pk.eyJ1IjoibmFiaWwtMjMiLCJhIjoiY2toYWVxM2NiMDA4YTJycDFiNnhlNGI2byJ9.2txRJF6anjPfrXkCQMPRCA";
            console.log(this.url);
            this.http.get<any>(this.url).subscribe(data => {
                let feature = data["features"];
                mycity = feature[0].place_name;
                this.city = mycity;
                this.orderService.address = mycity;
                //console.log("My Current Location"+feature[0].place_name);
            });
        });


        return mycity;
    }
    getLocationService(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude })

            })
        })
    }

    itemsValue(): number {
        return this.orderService.itemsValue();
    }

    cartItems(): CartItem[] {
        return this.orderService.cartItems();
    }

    decreaseQtd(item: CartItem) {
        return this.orderService.decreaseQtd(item);
    }

    increaseQtd(item: CartItem) {
        return this.orderService.increaseQtd(item);
    }

    remove(item: CartItem) {
        return this.orderService.remove(item);
    }

    checkOrder(order: Order) {
        //  this.router.navigate(['/order-summary', this.route.parent.snapshot.params['id']]);
        console.log(this);
        order.orderItems = this.cartItems()
            .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));

        this.orderService.checkOrder(order)
            .pipe(
                tap((orderId: string) => {
                    this.orderId = orderId;
                    console.log(order);
                })
            )
            .subscribe(() => {
                this.router.navigate(['/order-summary', this.route.parent.snapshot.params['id']]);
                this.orderService.clear();
                console.log(order, "order");
                this.orderService.order = order;

                if (order.save == true) {
                    if (order.addresstag == "Home") {
                        localStorage.setItem("HomeAdd", JSON.stringify(order))
                        var orderlist1 = JSON.parse(localStorage.getItem("HomeAdd"))
                        console.log(orderlist1, "output")

                    }
                    else if (order.addresstag == "Work") {
                        localStorage.setItem("WorkAdd", JSON.stringify(order))
                        var orderlist1 = JSON.parse(localStorage.getItem("WorkAdd"))
                        console.log(orderlist1, "output")
                    }
                    else {
                        localStorage.setItem("OtherAdd", JSON.stringify(order))
                        var orderlist1 = JSON.parse(localStorage.getItem("OtherAdd"))
                        console.log(orderlist1, "output")

                    }
                }
            });
    }

    isOrderCompleted(): boolean {
        return this.orderId !== undefined;
    }

    showDeliverySummary() {
        this.isDeliverySummary = !this.isDeliverySummary;
    }
}
