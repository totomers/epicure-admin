import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  errorResponse: any;
  returnPath: string;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get control() {
    return this.form.controls;
  }
  getEmailErrorMessage() {
    if (this.control['email'].hasError('required')) {
      return 'You must enter an email';
    }
    return this.control['email'].hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.control['password'].hasError('required')) {
      return 'You must enter an password';
    }
    return this.control['password'].hasError('password')
      ? 'Not a valid password'
      : '';
  }

  async onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.form.invalid) {
      console.log(`this.form.value`, this.form.value);
      return;
    }

    console.log(`going to account service to log in`);
    await this.accountService
      .authenticateUserServer(this.form.value)
      .then((user) => {
        console.log('succesfully logged in as:', user);
        this.router.navigate(['../']);
      })
      .catch((error) => {
        this.errorResponse = error.message;
      })
      .finally(() => {
        this.loading = false;
      });

    // if (response?._id)
    //   this.router.navigate(['../'], { relativeTo: this.route.root });
    // else {
    //   this.errorResponse = 'Incorrect username or password.';
  }
}
