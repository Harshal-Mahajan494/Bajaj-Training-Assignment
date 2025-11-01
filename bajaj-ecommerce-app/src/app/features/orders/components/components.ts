import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../orders/servicess/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './components.html',
  styleUrls: ['./components.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  today = new Date();
  private router = inject(Router);

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
    this.calculateTotals();
  }

  // ✅ Calculate total for each order
  calculateTotals(): void {
    this.orders = this.orders.map(order => {
      const total = order.items.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      return { ...order, total };
    });
  }

  // ✅ Navigate to payment
  payment(): void {
    this.router.navigate(['/payment']);
  }
}
