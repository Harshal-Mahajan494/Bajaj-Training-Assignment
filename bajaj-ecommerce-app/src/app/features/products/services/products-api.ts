import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ProductListResponse } from '../models/product-list-response';
import { ProductDetailsResponse } from '../models/product-details-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsApi {
  private _baseUrl: string = "http://localhost:9090/api";
  private _httpClient = inject(HttpClient);

  // Get products by page
  getProducts(page: number = 1, limit: number = 10): Observable<ProductListResponse> {
    return this._httpClient.get<ProductListResponse>(`${this._baseUrl}/products?page=${page}&limit=${limit}`);
  }

  getProductDetails(id: string): Observable<ProductDetailsResponse> {
    return this._httpClient.get<ProductDetailsResponse>(`${this._baseUrl}/products/${id}`);
  }

    constructor(private http: HttpClient) {}

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this._baseUrl}/products?category=${categoryId}`);
  }

}
