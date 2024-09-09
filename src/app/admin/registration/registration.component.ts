import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/admin/registration.service';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  signupForm: FormGroup;
  signinForm: FormGroup;
  resetPasswordForm: FormGroup;
  showLoader: boolean = false;
  constructor(private fb: FormBuilder, private _apiService: RegistrationService, private _authService: AuthService, private router: Router) {
    // Initialize signup form
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7), this.passwordValidator()]]
    });

    // Initialize signin form
    this.signinForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(7), this.passwordValidator()]]
    });

    // Initialize reset password form
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required, Validators.minLength(7), this.passwordValidator()]],
      password: ['', [Validators.required, Validators.minLength(7), this.passwordValidator()]],
      confirmPassword: ['', [Validators.required, Validators.minLength(7)]]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator for password complexity
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.value;
      if (password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&*])[A-Za-z\d@#$!%&*]{7,}/.test(password)) {
        return { 'passwordStrength': true };
      }
      return null;
    };
  }

  // Validator for matching passwords
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { 'mismatch': true } : null;
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      this.showLoader = true; // Start loader when form is valid
      this._apiService.signup(this.signupForm.value).subscribe(
        response => {
          localStorage.setItem('userId', response.userId)
          this._authService.saveToken(response.token)
          this.router.navigate(['/Dashboard/home'])
          this.showLoader = false; // Stop loader on success
        },
        error => {
          console.error('Error during signup', error);
          this.showLoader = false; // Stop loader on error
        }
      );
    } else {
    }
  }

  onSigninSubmit(): void {
    this.showLoader = true;  // Show loader
    if (this.signinForm.valid) {
      this._apiService.signin(this.signinForm.value).subscribe(
        response => {
          this._authService.saveToken(response.token)
          localStorage.setItem('userId', response.userId)
          this.router.navigate(['/Dashboard/home'])
          this.showLoader = false;  // Hide loader on success
        },
        error => {
          console.error('Error during signin', error);
          this.showLoader = false;  // Hide loader on error
        }
      );
    } else {
      this.showLoader = false;  // Hide loader if form is invalid
    }
  }

  onResetPasswordSubmit(): void {
    this.showLoader = true;  // Show loader
    if (this.resetPasswordForm.valid) {
      this._apiService.resetPassword(this.resetPasswordForm.value).subscribe(
        response => {
          this.showLoader = false;  // Hide loader on success
        },
        error => {
          console.error('Error resetting password', error);
          this.showLoader = false;  // Hide loader on error
        }
      );
    } else {
      this.showLoader = false;  // Hide loader if form is invalid
    }
  }
}
