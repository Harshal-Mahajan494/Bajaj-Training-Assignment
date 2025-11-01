// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartKey = 'cart';
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem(this.cartKey);
    if (stored) {
      this.items = JSON.parse(stored);
      this.cartSubject.next(this.items);
    }
  }

  private save() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }

  addItem(item: CartItem) {
    const existing = this.items.find(i => i._id === item._id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
    this.save();
  }

  removeItem(id: string) {
    this.items = this.items.filter(i => i._id !== id);
    this.save();
  }

  updateQuantity(id: string, qty: number) {
    const item = this.items.find(i => i._id === id);
    if (item) item.quantity = qty;
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  getTotal() {
    return this.items.reduce((t, i) => t + i.price * i.quantity, 0);
  }

  getItems() {
    return this.items;
  }
}
