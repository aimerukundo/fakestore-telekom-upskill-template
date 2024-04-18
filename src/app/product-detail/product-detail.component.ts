import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct } from '../types/product.type';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  public product: IProduct | null = null;
  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Access the id parameter using paramMap observable
    this.route.paramMap.subscribe((params) => {
      // Get the id value from the route
      const id = params.get('id');
      console.log('Product ID:', typeof id);
      this.productService.getProduct(Number(id)).subscribe({
        next: (product) => {
          console.log(product);
          this.product = product;
        },
        error: (error) => {
          console.error(error);
        },
      });
      // You can now use the id in your component logic
    });
  }

  addProductToCart(product: IProduct | null) {
    const products = JSON.parse(localStorage.getItem('products') || '[]')

    const modifiedProducts = products.map((item: IProduct) => {
      if (item.id === product?.id) {
        product.cart = product.cart + 1
        return product
      }
      return item
    })
    // console.log(modifiedProducts)
    localStorage.setItem('products', JSON.stringify(modifiedProducts))
    this.cartService.addToCart(product)
  }
}
