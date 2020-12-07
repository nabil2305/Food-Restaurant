import { Time } from "@angular/common";


export class EventReserve{
    type: string;
    no: number;
    menu: string;
    start_date: Date;
    start_time: Time;
    end_date: string;
    end_time: string;
    instructions: string;
}