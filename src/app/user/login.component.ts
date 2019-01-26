import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as userActions from './state/user.actions';
import * as userState from './state/user.reducer';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;


  constructor(
    private store: Store<any>,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //TODO: Unsubscribe
    this.store.pipe(select(userState.getMaskUserName)).subscribe(
      maskUserName => this.maskUserName = maskUserName
    );
  }

  canel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new userActions.MaskUserName(value));
  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password'
    }
  }
}