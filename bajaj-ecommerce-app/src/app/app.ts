import { Component, signal } from '@angular/core';
import { ProductsList } from './features/products/components/products-list/products-list';
import { NavBar } from './shared/components/nav-bar/nav-bar';
import { Banner } from './shared/components/banner/banner';
import { Footer } from './shared/components/footer/footer';
import { ProductDetails } from "./features/products/components/product-details/product-details";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'bajaj-root',
  imports: [NavBar,RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bajaj-ecommerce-app');
}
