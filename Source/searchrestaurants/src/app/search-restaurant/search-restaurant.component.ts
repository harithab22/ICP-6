// @ts-ignore
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import {HttpClient} from '@angular/common/http';

// @ts-ignore
@Component({
  selector: 'app-search-restaurant',
  templateUrl: './search-restaurant.component.html',
  styleUrls: ['./search-restaurant.component.css']
})
export class SearchRestaurantComponent implements OnInit {

  // @ts-ignore
  @ViewChild('recipe') recipes: ElementRef;
  // @ts-ignore
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  url = '';

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;


  constructor(private http: HttpClient) {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        console.log(this.currentLat);
        this.currentLong = position.coords.longitude;
        console.log(this.currentLong);

      });


  }
  getInit() {
    this.recipeValue = this.recipes.nativeElement.value;
    if (this.recipeValue === '') {
      this.recipeValue = 'food';
    }
    this.http.get('https://api.foursquare.com/v2/venues/search' +
      '?client_id=3PPNMTIKJJNDVYPFOBGSHHV2PR5A2P05PYHXDN2MKSKTTBSX' +
      '&client_secret=0QPHT0F5RS043F4TB4KKPQSHKSAXKE5ZNOYGB5KL2MBDYAG4' +
      '&v=20160215&limit=5' +
      '&ll=' + this.currentLat + ',' + this.currentLong +
      '&query=' + this.recipeValue)
      .subscribe((data: any) => {
        for (let i = 0; i < data.response.venues.length; i++) {
          this.recipeList = [];
          this.venueList[i] = {
            name: data.response.venues[i].name,
            id: data.response.venues[i].id,
            location: data.response.venues[i].location
          };
          console.log(this.venueList[i]);

        }

      });

  }

  ngOnInit() {



  }

  getVenues() {
    console.log(this.currentLat);
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      this.http.get('https://api.edamam.com/search?q=' +
        this.recipeValue + '&app_id=585c98e4&app_key=506aeacc25eff0e29b548d95f3269079&from=0&to=5')
        .subscribe((data: any) => {
          console.log(data);
          this.venueList = [];
          for (let i = 0; i < data.hits.length; i++) {
            this.recipeList[i] = {
              name: data.hits[i].recipe.label,
              url: data.hits[i].recipe.url,
              icon: data.hits[i].recipe.image
            };
          }
        });
    }



    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      this.http.get('https://api.foursquare.com/v2/venues/search' +
        '?client_id=3PPNMTIKJJNDVYPFOBGSHHV2PR5A2P05PYHXDN2MKSKTTBSX' +
        '&client_secret=0QPHT0F5RS043F4TB4KKPQSHKSAXKE5ZNOYGB5KL2MBDYAG4' +
        '&v=20160215&limit=5' +
        '&near=' + this.placeValue +
        '&query=' + this.recipeValue)
        .subscribe((data: any) => {
          for (let i = 0; i < data.response.venues.length; i++) {
            this.venueList[i] = {
              name: data.response.venues[i].name,
              id: data.response.venues[i].id,
              location: data.response.venues[i].location
            };
            console.log(this.venueList[i]);

          }

        });
    }
  }

}
