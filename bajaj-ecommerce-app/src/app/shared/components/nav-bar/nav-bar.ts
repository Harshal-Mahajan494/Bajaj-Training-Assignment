import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationStart } from "@angular/router";
import { Login } from '../../../features/security/components/login/login';
import { SecurityApi } from '../../../features/security/services/securirty-api';
@Component({
  selector: 'bajaj-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  private _router = inject(Router);
  private _securityApi = inject(SecurityApi);
  protected isLoggedIn: boolean = false;
  protected isAdmin: boolean = false;
  // protected role: string | null;


  ngOnInit(): void {
    this._router.events.subscribe({
      next: event => {
        if (event instanceof NavigationStart) {
          if (this._securityApi.getToken() !== null) {
            // this.role = this._securityApi.getRole();
            this.isLoggedIn = true;
          
            const role = localStorage.getItem('userRole');
            this.isAdmin = role === 'admin';


          

            console.log(this.isAdmin);
          }
        }
      }
    });
  }
  logout(): void {
    this.isLoggedIn = false;
    this._securityApi.logout();
  }

}
