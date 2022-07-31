import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Errors } from 'src/app/core/models/errors';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm = this.fb.group({
    image: [''],
    username: [''],
    bio: [''],
    email: [''],
    password: [''],
  });
  errorList: Errors | null = null;

  constructor(
    private router: Router,
    private fb: NonNullableFormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user: User) => {
      this.settingsForm.patchValue({
        image: user.image,
        username: user.username,
        bio: user.bio,
        email: user.email,
      });
    });
  }

  onUpdate() {
    this.userService.updateUser(this.settingsForm.getRawValue()).subscribe({
      next: (user: User) => {
        this.router.navigate(['/']);
      },
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
