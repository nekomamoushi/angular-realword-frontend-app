import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Errors } from 'src/app/core/models/errors';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorList: Errors | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
    });
  }

  onRegister() {
    const { username, email, password } = this.registerForm.value;

    this.auth.register(username, email, password).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error(err);
        this.errorList = err.error;
      },
    });
  }
}
