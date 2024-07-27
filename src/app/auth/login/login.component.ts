import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService, LoginRequest } from 'src/app/services/apis/auth.service';
import { HelperService } from 'src/app/services/helper.service';

export interface LoginCommand {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  proccessing: boolean = false;

  constructor(
    private authService: AuthService,
    private helperService: HelperService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  redirectToReset(){

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.proccessing = true;
      const loginCommand: LoginRequest = this.loginForm.value;
      this.authService.login(loginCommand).subscribe({
        next: (data) => {
          console.log(data);
          this.proccessing = false;
          this.helperService.setAccessToken(data.accessToken);
          this.helperService.redirectToDashboard();
        },
        error: (error) => {
          console.log(error.message);
          this.proccessing = false;
        },
        complete: () => {
          this.proccessing = false;
        }
      });
    }
  }
}
