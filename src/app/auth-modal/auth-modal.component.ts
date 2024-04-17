import { Component, OnDestroy } from '@angular/core';
import { AuthModalService } from '../services/auth-modal.service';
import { AuthService } from '../services/auth.service';
import { IUser } from '../types/user.type';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
})
export class AuthModalComponent implements OnDestroy {
  isPasswordVisible = false;
  user: IUser | null = null;
  alertMessage: string = '';
  alertClass: string = 'alert-pending';
  showAlert: boolean = false;

  credentials = {
    email: '',
    password: '',
  };
  constructor(
    public authModalService: AuthModalService,
    public authService: AuthService
  ) {}

  login() {
    this.showAlert = true;
    this.alertClass = 'alert-pending';
    this.alertMessage = 'Logging in...';
    this.authService.getUsers().subscribe({
      next: (users) => {
        const user = users.find((user) => {
          if (
            user.email === this.credentials.email &&
            user.password === this.credentials.password
          ) {
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
            this.alertClass = 'alert-success';
            this.alertMessage = 'Login successful';
            setTimeout(() => {
              this.credentials = {
                email: '',
                password: '',
              };
              this.authModalService.closeModal();
            }, 2000);
            return user;
          }
          return null;
        });
        if (!user) {
          this.alertClass = 'alert-error';
          this.alertMessage = 'Invalid credentials';
        }
        // console.log(users)
        console.log('the user from observable', user);
        console.log(this.user);
      },
      error: (err) => {
        this.alertMessage = `Error: ${err.message}`;
        this.alertClass = 'alert-error';
      },
    });

    return this.user;
  }

  ngOnDestroy() {
    this.credentials = {
      email: '',
      password: '',
    };
  }

  // console.log(this.authService.login('john@gmail.com', 'm38rmF$'))

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
