import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/core/models/article';
import { Tag } from 'src/app/core/models/tag';
import { ArticleService } from 'src/app/core/services/article.service';
import { TagService } from 'src/app/core/services/tag.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoggedIn$ = this.auth.isLoggedIn$;

  allArticles: Article[] = [];
  allTags: Tag[] = [];
  mode: 'feed' | 'all' | '' = '';

  constructor(
    private auth: AuthService,
    private article: ArticleService,
    private tag: TagService
  ) {}

  ngOnInit(): void {
    this.updateFeed('all');
    this.tag.getAllTags().subscribe((tags: Tag[]) => {
      this.allTags = tags;
    });
  }

  updateFeed(feed: 'feed' | 'all') {
    if (this.mode === feed) {
      return;
    }

    this.mode = feed;
    this.article.getAllArticle().subscribe((articles) => {
      if (feed === 'all') {
        this.allArticles = articles;
      } else if (feed === 'feed') {
        this.allArticles = articles.filter((article) => {
          return article.author.following;
        });
      }
    });
  }
}
