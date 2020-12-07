import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservationComponent} from './reservation.component';
import { CommonModule } from '@angular/common';
import {ReservationEntryComponent} from './reservation-entry/reservation-entry.component';
import { ReservationMenuComponent } from './reservation-entry/reservation-menu/reservation-menu.component';
import { ReserveTableComponent } from './reservation-entry/reserve-table/reserve-table.component';
import { ReserveEventComponent } from './reservation-entry/reserve-event/reserve-event.component';
import { FormsModule } from '@angular/forms';


const ROUTES: Routes = [
    {path: '', component: ReservationComponent},
    {
        path: 'reservation-entry/:id', component: ReservationEntryComponent,
        children: [
            {path: '', redirectTo: 'reservation-menu', pathMatch: 'full'},
            {path: 'reservation-menu', component: ReservationMenuComponent, pathMatch: 'full'},
            {path: 'reserve-table', component: ReserveTableComponent, pathMatch: 'full'},
            {path: 'reserve-event', component:ReserveEventComponent, pathMatch: 'full'}
        ]
    },
];

@NgModule({
    declarations: [ReservationComponent,ReservationEntryComponent,ReservationMenuComponent,ReserveTableComponent, ReserveEventComponent],
    imports: [CommonModule,
        RouterModule.forChild(ROUTES),
    FormsModule]
})

export class ReservationModule {

}
