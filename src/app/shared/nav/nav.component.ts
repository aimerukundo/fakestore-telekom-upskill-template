import { Component } from '@angular/core';
import { AuthModalService } from 'src/app/services/auth-modal.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public authModalService: AuthModalService, public authService: AuthService) {}

  openAuthModal() {
    this.authModalService.openModal();
  }
}
