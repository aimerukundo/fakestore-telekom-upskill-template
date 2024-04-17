import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct } from '../types/product.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Example: Fetch products
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err),
    });
  }
}
