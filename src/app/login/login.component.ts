import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loginForm.reset();
      return;
    }

    this.loading = true;
    this.loginService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          this.loginService.setToken(data);
        },
        error => {
          this.error = error.error.non_field_errors;
          this.loading = false;
          this.submitted = false;
        }
      );
  }

}
