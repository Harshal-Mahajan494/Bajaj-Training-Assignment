import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesApi } from '../../services/categories-api';
import { ProductsApi } from '../../../products/services/products-api';
import { Category } from '../../models/category';
import { ProductData } from '../../../products/models/product-data';

@Component({
  selector: 'bajaj-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.html',
  styleUrls: ['./categories-list.css']
})
export class CategoriesList implements OnInit {
  categories: Category[] = [];
  products: ProductData[] = [];
  selectedCategoryName: string = '';
  loading: boolean = false;

  constructor(
    private categoryApi: CategoriesApi,
    private productsApi: ProductsApi
  ) {}

  ngOnInit() {
    // Fetch all categories
    this.categoryApi.getCategories().subscribe({
      next: (response) => {
        this.categories = response.categories || [];
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  // Fetch products by category ID
  showProducts(categoryId: string, categoryName: string) {
    this.selectedCategoryName = categoryName;
    this.loading = true;
    this.products = []; // Clear old data

    this.productsApi.getProductsByCategory(categoryId).subscribe({
      next: (response) => {
        this.products = response.data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
      }
    });
  }
}
