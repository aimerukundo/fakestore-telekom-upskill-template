import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  public visible = true;
  constructor() {}

  closeModal() {
    this.visible = false;
  }

  openModal() {
    this.visible = true;
  }
}
