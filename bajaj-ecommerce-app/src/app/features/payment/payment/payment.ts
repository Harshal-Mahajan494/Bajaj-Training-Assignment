import { Component ,inject} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../cart/services/cart';
import { OrderService} from '../../orders/servicess/order'
 
@Component({
  selector: 'bajaj-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  private router = inject(Router);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
 confirmPayment() {
    
  alert("payment done Sucessfully");  
  this.cartService.clear();
  this.orderService.clearOrders();
  this.router.navigate(['/products']);
}
}
