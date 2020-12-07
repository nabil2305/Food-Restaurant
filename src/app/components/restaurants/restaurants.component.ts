import {Component, OnInit} from '@angular/core';

import {switchMap, tap, debounceTime, distinctUntilChanged, catchError} from 'rxjs/operators';

import {Restaurant} from './restaurant/restaurant.model';
import {RestaurantsService} from './restaurants-json.service';

@Component({
    selector: 'lacc-restaurants',
    templateUrl: './restaurants.component.html',
    styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

    restaurants: Restaurant[] = [];
    searchtext:string; 


    constructor(private restaurantService: RestaurantsService) {
    }

    ngOnInit() {
        // this.restaurantService.getAllRestaurants()
        //     .pipe(
        //         //tap(restaurants => console.log('R: ', restaurants))
        //     )
        //     .subscribe(restaurants => this.restaurants = restaurants);

        this.restaurants = this.restaurantService.getAllRestaurants();
        this.restaurants.forEach((item) => {
            item["newrating"] = 0;
            let ratings = JSON.parse(localStorage.getItem(item.id));
            console.log(ratings);
            let rating = item.rating;
            if(ratings) {
                rating = (item.rating + ratings["star"] * ratings["count"]) / (ratings["count"] + 1) 
            }
            item["newrating"] = Math.round(rating*10)/10;
        })
        
    }
    yourModel:any;
handlechange(){
    if(this.searchtext=="")
    {
        this.ngOnInit()
    }
    else{
        console.log(this.restaurants, this.searchtext)
        this.restaurants=this.restaurants.filter(restaurant=>{
        return restaurant.name.toLowerCase().startsWith(this.searchtext.toLowerCase())
  
        })
    }
}
    doSomething(event){
        console.log(event) 
        console.log("data",this.restaurants);
            let filterData= this.restaurants.filter(restaurant=>restaurant.name.toLowerCase().includes(event.toLowerCase())
        )
        console.log(filterData);
        this.restaurants=filterData;
        console.log(this.restaurants);
    }

    getStarForRating(rating: number, position: number): string {
        let className: string = '';
        switch (position) {
            case 1:
                className = rating >= 1 ? 'fa-star' : (rating < 1 && rating > 0 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 2:
                className = rating >= 2 ? 'fa-star' : (rating < 2 && rating > 1 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 3:
                className = rating >= 3 ? 'fa-star' : (rating < 3 && rating > 2 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 4:
                className = rating >= 4 ? 'fa-star' : (rating < 4 && rating > 3 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            case 5:
                className = rating == 5 ? 'fa-star' : (rating < 5 && rating > 4 ? 'fa-star-half-o' : 'fa-star-o');
                break;
            default:
                className = 'fa-star-o';
                break;
        }
        return className;
    }
    getBGcolorForRating(rating: number): string {
        return rating < 2.5 ? 'bg-red' : (rating < 3.5 ? 'bg-orange' : 'bg-green');
    }    

    clearFilter() {
       
        this.restaurants = this.restaurantService.getAllRestaurants();
        
    }
    

favourite:any[]=[];
public toggleSelected(id:string,$event) {

        let currentElement: any = $event.target || $event.srcElement;
        
        console.log(currentElement.classList)
        if(currentElement.classList.contains('fa-heart-o'))
        {  // Adding to favourite
            currentElement.classList.remove('fa-heart-o')
            currentElement.classList.add('fa-heart');
        
        }
        else
        { // Removing from favourite
            currentElement.classList.remove('fa-heart')
            currentElement.classList.add('fa-heart-o');
            
        }
        
       
        if(!this.favourite.find(x => x === id)){
            this.favourite.push(id);
        }
        else{
            this.favourite.splice(this.favourite.findIndex(x=> x===id), 1)
        }

        console.log("added to fav",this.favourite);
      }

      showFavourite(){
        console.log("inside show")
        this.restaurants = this.restaurants.filter(x => this.favourite.find(y=> y === x.id) )
        console.log(this.restaurants)

    }
}



