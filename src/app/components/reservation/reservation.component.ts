import { Component, OnInit } from '@angular/core';
import { Restaurant } from './../restaurants/restaurant/restaurant.model';
import { RestaurantsService } from './../restaurants/restaurants-json.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'lacc-reservation',
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    restaurants: Restaurant[] = [];
    filters: any = {};
    selectedFilters: {} = {
        category: '',
        location: '',
        cuisine: '',
        sort:''
    };
    searchtext: string;
    favourite:any[]=[];

    constructor(private restaurantService: RestaurantsService, private route: ActivatedRoute,
        private router: Router) {
    }

    ngOnInit() {
        this.restaurants = this.restaurantService.getAllRestaurants();
        this.filters = this.getFilterData();
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
        this.restaurants = this.restaurants.sort(
            (low, high) => +high.rating - +low.rating
          );
    }

    getBGcolorForRating(rating: number): string {
        return rating < 2.5 ? 'bg-red' : (rating < 3.5 ? 'bg-orange' : 'bg-green');
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

    clearFilter() {
        let activeElements: any = document.getElementsByClassName('filter-option');
        for (let i: number = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove('active');
        }
        Object.keys(this.selectedFilters).forEach(k => {
            this.selectedFilters[k] = '';
        });
        this.restaurants = this.restaurantService.getAllRestaurants();
    }

    clearSortFilter() {
        let activeElements: any = document.getElementsByClassName('filter-sort');
        for (let i: number = 0; i < activeElements.length; i++) {
            activeElements[i].classList.remove('active');
        }
        Object.keys(this.selectedFilters).forEach(k => {
            this.selectedFilters[k] = '';
        });
    }
    
    
    selectFilter(id: string, $event) {
        let currentElement: any = $event.target || $event.srcElement;
        if (document.getElementById(id).getElementsByClassName('active')[0] !== undefined) {
            document.getElementById(id).getElementsByClassName('active')[0].classList.remove('active');
        }
        currentElement.classList.add('active');
        this.filterRestaurants(id, currentElement.innerText);
        currentElement.classList.add('active');

    }

    // navigateToReservationPage(redirectTo: string, id: string) {
    //     this.router.navigate(['reservation/reservation-entry', id, redirectTo]);
    // }

    onChange(val, id:string) {
        if(val == "BookATable"){
            this.router.navigate(['reservation/reservation-entry', id, 'reserve-table']);
       }
       else if(val == 'BookAnEvent'){
        this.router.navigate(['reservation/reservation-entry', id, 'reserve-event']);
       }
    }

    getFilterData(): {} {
        this.filters = {
            'category': this.getFiterObject('category'),
            'location': this.getFiterObject('area'),
            'cuisine': this.getFiterObject('type'),
        };
        return this.filters;
    }

    getFiterObject(type: string): any[] {
        return this.restaurants.map(item => item[type])
        .filter((value, index, self) => self.indexOf(value) === index);
    }

    getFilterCount(name:string, value:string):number{
        return this.restaurants.filter(x => x[name] === value).length;
    }

    filterRestaurants(type, name) {
        this.selectedFilters[type] = name;
        this.restaurants = this.restaurantService.getAllRestaurants();
        if (this.selectedFilters['cuisine'] !== '') {
            this.restaurants=this.restaurants.filter(x=>x.type === this.selectedFilters['cuisine']);
        }
        if (this.selectedFilters['category'] !== '') {
            this.restaurants=this.restaurants.filter(x=>x.category === this.selectedFilters['category']);
        }
        
        if (this.selectedFilters['location'] !== '') {
            this.restaurants=this.restaurants.filter(x=>x.area === this.selectedFilters['location']);
        }
        if (this.selectedFilters['sortDR'] !== '') {
            this.restaurants === this.restaurants.sort((a,b)=>b[this.selectedFilters['sortDR'].toLowerCase()]-a[this.selectedFilters['sortDR'].toLowerCase()]);
            this.clearSortFilter();
        }
        if (this.selectedFilters['sortAR'] !== '') {
            this.restaurants === this.restaurants.sort((a,b)=>a[this.selectedFilters['sortAR'].toLowerCase()]-b[this.selectedFilters['sortAR'].toLowerCase()]);                
            this.clearSortFilter();
        }
    }

    
    mymodel:any;
    handlereservation(){
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

    sort(order){
        switch (order.target.value) {
         
          case "Name1": {
            this.restaurants = this.restaurants.sort(
              (low, high) => high.name.toLowerCase().trim() >  low.name.trim().toLowerCase() ? 1 : -1
            );
            break;
          }
          case "Name": {
            this.restaurants = this.restaurants.sort(
              (low, high) => high.name.toLowerCase().trim() <  low.name.trim().toLowerCase() ? 1 : -1
            );
            break;
          }
        }
    }

    public toggleSelected(id:string,$event) {

        let currentElement: any = $event.target || $event.srcElement;
        
        console.log(currentElement.classList)
        if(currentElement.classList.contains('fa-heart-o'))
        {  // Adding to favourite
            currentElement.classList.remove('fa-heart-o')
            currentElement.classList.add('fa-heart');
            currentElement.parentElement.lastElementChild.innerText =""
        }
        else
        { // Removing from favourite
            currentElement.classList.remove('fa-heart')
            currentElement.classList.add('fa-heart-o');
            currentElement.parentElement.lastElementChild.innerText ="add to fav"
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


