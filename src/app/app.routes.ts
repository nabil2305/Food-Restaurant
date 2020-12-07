import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RestaurantsComponent} from './components/restaurants/restaurants.component';
import {RestaurantDetailComponent} from './components/restaurants/restaurant-detail/restaurant-detail.component';
import {MenuComponent} from './components/restaurants/restaurant-detail/menu/menu.component';
import {ReviewsComponent} from './components/restaurants/restaurant-detail/reviews/reviews.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginComponent} from './components/security/login/login.component';
import {LoggedInGuard} from './components/security/loggedin.guard';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';

import { UserProfileComponent } from './components/header/user-profile/user-profile.component';
import { InnerHtmlBindingComponent } from './inner-html-binding/inner-html-binding.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path:'Security',component:InnerHtmlBindingComponent},
    {path: 'login/:to', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component:UserProfileComponent },
    {path:'changepassword' ,component:ChangePasswordComponent}
    ,
    {
        path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'chefs', loadChildren: './components/restaurants/restaurant-detail/chefs/chefs.module#ChefsModule'},
            {path: 'reviews', component: ReviewsComponent},
        ]
    },
    {path: 'restaurants', component: RestaurantsComponent},
    {
        path: 'order/:id', loadChildren: './components/order/order.module#OrderModule',
        canLoad: [LoggedInGuard],
        canActivate: [LoggedInGuard]
    },

    {path: 'about', loadChildren: './components/about/about.module#AboutModule'},
    {path: 'blog', loadChildren: './components/blog/blog.module#BlogModule'},
    {
        path: 'reservation', loadChildren: './components/reservation/reservation.module#ReservationModule',
        canLoad: [LoggedInGuard],
        canActivate: [LoggedInGuard]

    },
    {path: 'contact', loadChildren: './components/contact/contact.module#ContactModule'},
    {
        path:'orders',component:OrdersComponent,
        canLoad: [LoggedInGuard],
        canActivate: [LoggedInGuard]
    },
    

    {path: 'order-summary/:id', loadChildren: './components/order/order-summary/order-summary.module#OrderSummaryModule'},
    {path: '**', component: NotFoundComponent}
];
