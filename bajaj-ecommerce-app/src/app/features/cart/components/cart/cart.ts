import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartItem, CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  private cart = inject(CartService);
  private router = inject(Router);

  items: CartItem[] = [];
  showLoginPopup = false;

  ngOnInit(): void {
    this.cart.cart$.subscribe(items => this.items = items);
  }

  remove(id: string) {
    this.cart.removeItem(id);
  }

  changeQty(id: string, e: Event) {
    const v = +(e.target as HTMLInputElement).value;
    this.cart.updateQuantity(id, v);
  }

  clear() {
    this.cart.clear();
  }

  getTotal() {
    return this.cart.getTotal();
  }

  checkout() {
    console.log("check out ");
    const token = localStorage.getItem('token');
    if (token) {
      const cartItems = this.cart.getItems();

      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');


      const newOrder = {
        id: Date.now(), // simple unique id
        date: new Date().toLocaleString(),
        items: this.items,
        total: this.getTotal()
      };

       storedOrders.push(newOrder);

       localStorage.setItem('orders', JSON.stringify(storedOrders));

        this.cart.clear();

  // 6️⃣ Navigate to Orders page
  this.router.navigate(['/orders']);

      // if (cartItems.length > 0) {
      //   // Get existing orders
      //   const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      //   existingOrders.push({
      //     id: Date.now(),
      //     date: new Date().toLocaleString(),
      //     items: cartItems,
      //     total: this.cart.getTotal()
      //   });

      //   localStorage.setItem('orders', JSON.stringify(existingOrders));
      //   this.cart.clear();

      //   this.router.navigate(['/orders']);
  
        // this.router.navigate(['/payment']);
    //}

      } else {

        this.showLoginPopup = true;

      }

    }
  

  closePopup() {
    this.showLoginPopup = false;
  }

  goToLogin() {
    this.showLoginPopup = false;
    this.router.navigate(['/auth/login'], { queryParams: { redirect: 'cart' } });
  }
}





