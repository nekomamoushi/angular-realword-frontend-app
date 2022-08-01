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

  allArticles: Article[] | null = null;
  allTags: Tag[] | null = null;

  constructor(
    private auth: AuthService,
    private article: ArticleService,
    private tag: TagService
  ) {}

  ngOnInit(): void {
    this.article.getAllArticle().subscribe((articles) => {
      this.allArticles = articles;
    });
    this.tag.getAllTags().subscribe((tags: Tag[]) => {
      this.allTags = tags;
    });
  }
}
