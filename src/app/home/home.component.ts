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
  scrollable = true
  currentNumber = 6

  constructor(private productService: ProductService) {
    this.productService.getProducts(this.currentNumber).subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll);
    }
    // Example: Fetch products
    this.productService.getProducts(this.currentNumber).subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error(err),
    });
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

    if (bottomOfWindow) {
      this.currentNumber = this.currentNumber + 6
      this.productService.getProducts(this.currentNumber).subscribe({
        next: (data) => this.products = data,
        error: (err) => console.error(err),
      });
    }
  };

  ngOnDestroy() {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll);
    }

    this.products = []
  }
}
