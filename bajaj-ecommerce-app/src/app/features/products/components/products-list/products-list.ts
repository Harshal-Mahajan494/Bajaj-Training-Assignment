import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ProductsApi } from '../../services/products-api';
import { ProductListResponse } from "../../models/product-list-response";
import { ProductDetails } from '../product-details/product-details';
import { CartService } from '../../../cart/services/cart';

declare var bootstrap: any;

@Component({
  selector: 'bajaj-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css'],
})
export class ProductsList implements OnInit, OnDestroy {

  private _productApi = inject(ProductsApi);
  private _subscription = new Subscription();   // ✅ stores all subscriptions
  private cart = inject(CartService);
  protected readonly title: string = "";
  protected product: ProductListResponse;
  protected selectedProductId: string;
  protected selectedProduct: any = null;

  protected currentPage: number = 1;
  protected totalPages: number = 1;

    addToCart(p: any) {
    this.cart.addItem(p);
    // user feedback — toast/alert
    alert(`${p.name} added to cart`);
  }

  // ✅ Subscribe when component loads
  ngOnInit(): void {
    this.loadProducts(this.currentPage);
  }

  // ✅ Unsubscribe when component is destroyed (to prevent memory leaks)
  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
      console.log("Unsubscribed from all product subscriptions.");
    }
    
  }

  // ✅ Store the subscription reference inside `_subscription`
  private loadProducts(page: number): void {
    const sub = this._productApi.getProducts(page, 10).subscribe({
      next: data => {
        this.product = data;
        this.currentPage = data.page;
        this.totalPages = data.pages;
      },
      error: err => {
        console.error("Error fetching products:", err);
      }
    });

    this._subscription.add(sub); // ✅ add subscription
  }

  // ✅ Show modal for selected product
  protected onProductSelection(product: any): void {
    this.selectedProduct = product;
    const modalEl = document.getElementById('productModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // ✅ Pagination
  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.loadProducts(page);
  }

  protected trackById(index: number, item: any) {
    return item._id;
  }
}
