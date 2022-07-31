import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Profile } from 'src/app/core/models/profile';
import { ProfileService } from 'src/app/core/services/profile.service';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentProfile: Profile | null = null;
  isUserConnected$ = this.auth.currentUser$.pipe(
    map((currentUser) => {
      return currentUser?.username === this.currentProfile?.username;
    })
  );

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.profile.getProfile(username).subscribe((profile: Profile) => {
      this.currentProfile = profile;
    });
  }
}
