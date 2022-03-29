import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorResponse: string;
  loading: boolean;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    console.log(this.form);

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.uniqueEmailValidator()],
          updateOn: 'blur',
        },
      ],
      password: ['', Validators.required],
      confirmedPassword: [
        '',
        [Validators.required, this.passwordConfirmedValidator()],
      ],
    });
  }
  get fc() {
    return this.form.controls;
  }

  async register() {
    this.loading = true;
    if (!this.form.valid) return;

    const newUser = {
      email: this.fc['email'].value,
      password: this.fc['password'].value,
      firstName: this.fc['firstName'].value,
      lastName: this.fc['lastName'].value,
    };
    this.accountService
      .registerUser(newUser)
      .then((user) => {
        if ((user as IUser)?._id) {
          this.router.navigate(['./account/login']);
        }
      })
      .catch((error) => (this.errorResponse = error))
      .finally(() => {
        this.loading = false;
      });
  }

  private passwordConfirmedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isSame = control.value == this.form?.controls['password'].value;
      return isSame ? null : { passwordNotConfirmed: true };
    };
  }

  private uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.accountService.isEmailTaken(control.value).pipe(
        map((data) => (data.isEmailTaken ? { emailExists: true } : null)),
        catchError(async (error) => {
          this.errorResponse = error.message;
          // this.store.dispatch(requestFailure({ error }));
          return null;
        })
      );
    };
  }
  getEmailError() {
    if (!this.fc['email'].errors) return '';
    const emailErrors = this.fc['email'].errors;
    if (emailErrors['required']) return 'Email is required';
    if (emailErrors['email']) return 'Please enter a valid email address';
    if (emailErrors['emailExists'])
      return 'Email exists, please choose another';
    else return '';
  }
  getPasswordError() {
    if (!this.fc['password'].errors) return '';
    const passwordErrors = this.fc['password'].errors;
    if (passwordErrors['required']) return 'Password is required';
    else return '';
  }
  getConfirmedPasswordError() {
    if (!this.fc['confirmedPassword'].errors) return '';
    const confirmedPasswordErrors = this.fc['confirmedPassword'].errors;
    if (confirmedPasswordErrors['required'])
      return 'Please confirm your password';
    if (confirmedPasswordErrors['passwordNotConfirmed'])
      return "Passwords don't match. Please check again.";
    else return '';
  }
}
