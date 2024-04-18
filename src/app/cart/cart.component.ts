import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { IProduct } from '../types/product.type';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: IProduct[] = []
  constructor(public cartService: CartService){
  }

  
}
