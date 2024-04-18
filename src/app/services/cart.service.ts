import { Injectable } from '@angular/core';
import { IProduct } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: IProduct[] = [];

  constructor() {}

  addToCart(product: IProduct) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length > 0) {
      const existingProduct = cart.find(
        (item: IProduct) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.cart++;
      } else {
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
    }
    if (cart.length === 0) {
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    // console.log(this.cart);
  }

  increaseCart(product: IProduct) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find(
      (item: IProduct) => item.id === product.id
    );
    if (existingProduct) {
      existingProduct.cart++;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  decreaseCart(product: IProduct) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = cart.find(
      (item: IProduct) => item.id === product.id
    );
    if (existingProduct && existingProduct.cart > 1) {
      existingProduct.cart--;
    } else {
      cart.splice(cart.indexOf(existingProduct), 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFromCart(product: IProduct) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = cart.filter((item: IProduct) => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [];
  }

  getTotalPrice(){
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    let total = 0
    cart.forEach((item: IProduct) => {
      total += item.price * item.cart
    })
    return total
  }
}
