import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private storageKey = 'orders';

  getOrders(): any[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  addOrder(order: any): void {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
  }

  clearOrders(): void {
    localStorage.removeItem(this.storageKey);
  }
}
