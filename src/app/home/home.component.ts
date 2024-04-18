import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct } from '../types/product.type';
import { CartService } from '../services/cart.service';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthModalService } from '../services/auth-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: IProduct[] = [];
  scrollable = true;
  currentNumber = 6;
  searchTerm = '';

  constructor(
    private productService: ProductService,
    public cartService: CartService,
    public authService: AuthService,
    public authModalService: AuthModalService,
    private router: Router
  ) {
    this.productService
      .getProducts(this.currentNumber)
      .pipe(
        map((data) => {
          return data.map((product) => ({
            ...product,
            cart: 0,
          }));
        })
      )
      .subscribe({
        next: (data) => {
          const products = JSON.parse(localStorage.getItem('products') || '[]');
          if (products.length > 0) {
            const newProducts = data.map((item) => {
              for(let i = 0; i < products.length; i++) {
                if (products[i].id === item.id) {
                  products[i]
                }
              }
              return item
            })
            localStorage.setItem('products', JSON.stringify(newProducts));
            this.products = newProducts;
          }
          if(products.length === 0) {
            localStorage.setItem('products', JSON.stringify(data));
            this.products = data;
          }
          console.log(this.products);
        },
        error: (err) => console.error(err),
      });
  }

  checkLogin(link: unknown[]) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.name) {
      this.authModalService.openModal();
      return
    }
    this.router.navigate(link)
  }

  search() {
    const products: IProduct[] = JSON.parse(localStorage.getItem('products') || '[]');
  // Filter products based on the search term (case-insensitive)
  const searchResults: IProduct[] = products.filter((item: IProduct) =>
    item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  this.products = searchResults;
  console.log(this.searchTerm);
  console.log(this.products);
  }

reset(){
  this.searchTerm = '';
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  this.products = products;
}
  ngOnInit(): void {
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll);
    }
    // Example: Fetch products
    this.productService
      .getProducts(this.currentNumber)
      .pipe(
        map((data) => {
          return data.map((product) => ({
            ...product,
            cart: 0,
          }));
        })
      )
      .subscribe({
        next: (data) => {
          const products = JSON.parse(localStorage.getItem('products') || '[]');
          if (products.length > 0) {
            const newProducts = data.map((item) => {
              for(let i = 0; i < products.length; i++) {
                if (products[i].id === item.id) {
                  products[i]
                }
              }
              return item
            })
            localStorage.setItem('products', JSON.stringify(newProducts));
            this.products = newProducts;
          }
          if(products.length === 0) {
            localStorage.setItem('products', JSON.stringify(data));
            this.products = data;
          }
          console.log(this.products);

          // localStorage.setItem('products', JSON.stringify(data));
          // this.products = data;
          // console.log(this.products);
        },
        error: (err) => console.error(err),
      });
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

    if (bottomOfWindow) {
      this.currentNumber = this.currentNumber + 6;
      this.productService
        .getProducts(this.currentNumber)
        .pipe(
          map((data) => {
            return data.map((product) => ({
              ...product,
              cart: 0,
            }));
          })
        )
        .subscribe({
          next: (data) => {
            const products = JSON.parse(localStorage.getItem('products') || '[]');
          if (products.length > 0) {
            const newProducts = data.map((item) => {
              for(let i = 0; i < products.length; i++) {
                if (products[i].id === item.id) {
                  products[i]
                }
              }
              return item
            })
            localStorage.setItem('products', JSON.stringify(newProducts));
            this.products = newProducts;
          }
          if(products.length === 0) {
            localStorage.setItem('products', JSON.stringify(data));
            this.products = data;
          }
          console.log(this.products);
            // localStorage.setItem('products', JSON.stringify(data));
            // this.products = data;
            // console.log(this.products);
          },
          error: (err) => console.error(err),
        });
    }
  };

  addProductToCart(product: IProduct) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.name) {
      this.authModalService.openModal();
      return
    }
    
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    // console.log(products)
    const modifiedProducts = products.map((item: IProduct) => {
      if (item.id === product.id) {
        product.cart = product.cart + 1
        return product
      }
      return item
    })
    // console.log(modifiedProducts)
    localStorage.setItem('products', JSON.stringify(modifiedProducts))
    this.cartService.addToCart(product)
  }
  ngOnDestroy() {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.products = [];
    localStorage.removeItem('products');
  }
}
