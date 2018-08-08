import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from "rxjs";
import {Subscription} from "rxjs";


interface Product {
  id: number,
  title: string,
  price: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  products: Product[] = [];
  theDataSource$: Observable<Product[]>;
  productSubscription: Subscription;
  error: string;
  title: string;

  constructor (private httpClient: HttpClient){
    this.title="Oops";
    this.theDataSource$=this.httpClient.get<Product[]>("https://nodeexpresscicd.azurewebsites.net/api/products");
  }

  ngOnInit(){
    this.productSubscription = this.theDataSource$.subscribe(
      data => this.products=data,
        (err: HttpErrorResponse) =>
        this.error = `Can't get products. Got ${err.message}`
    );
  }
}
