import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthModalService {
  public visible = false;
  constructor() {}

  closeModal() {
    this.visible = false;
  }

  openModal() {
    this.visible = true;
  }
}
