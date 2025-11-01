import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Banner } from '../../../shared/components/banner/banner';
import { ProductsList } from '../../products/components/products-list/products-list';  // ✅ import your product component

@Component({
  selector: 'bajaj-ep-home',
  standalone: true,
  imports: [CommonModule, Banner, ProductsList], // ✅ add here
  templateUrl: './ep-home.html',
  styleUrl: './ep-home.css'
})
export class EpHome { }
