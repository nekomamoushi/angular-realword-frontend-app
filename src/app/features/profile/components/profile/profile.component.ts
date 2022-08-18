import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import { Profile } from 'src/app/core/models/profile';
import { ProfileService } from 'src/app/core/services/profile.service';
import { AuthService } from 'src/app/features/auth/auth.service';
import { ArticleService } from 'src/app/core/services/article.service';

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
  allArticles: Article[] = [];

  mode: 'mine' | 'fav' | '' = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private profile: ProfileService,
    private article: ArticleService
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.profile.getProfile(username).subscribe((profile: Profile) => {
      this.currentProfile = profile;
      this.updateArticles('mine');
    });
  }

  updateArticles(mode: 'mine' | 'fav') {
    if (this.mode === mode) {
      return;
    }

    this.mode = mode;
    const username = this.currentProfile?.username as string;

    let allArticles$ = this.article.getMyArticles(username);
    if (mode === 'fav') {
      allArticles$ = this.article.getFavArticles(username);
    }

    allArticles$.subscribe((articles: Article[]) => {
      this.allArticles = articles;
    });
  }
}
