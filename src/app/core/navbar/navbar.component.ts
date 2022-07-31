import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$ = this.auth.isLoggedIn$;
  currentUser: User | null = null;

  constructor(private auth: AuthService, private user: UserService) {}

  ngOnInit(): void {
    this.user.getUser().subscribe((userData) => {
      this.currentUser = userData;
    });
  }
}
