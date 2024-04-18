import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthModalService } from 'src/app/services/auth-modal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(public authModalService: AuthModalService, public authService: AuthService, private router: Router) {}

  openAuthModal() {
    this.authModalService.openModal();
  }

  checkLogin(link: unknown[]) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.name) {
      this.authModalService.openModal();
      return
    }
    this.router.navigate(link)
  }

  logoutUser(){
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
