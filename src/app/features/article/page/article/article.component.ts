import { isIdentifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, iif, map, Observable, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import { Comment } from 'src/app/core/models/comment';
import { Profile } from 'src/app/core/models/profile';
import { ArticleService } from 'src/app/core/services/article.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  article: Article | null = null;
  comments: Comment[] = [];
  isAuthenticated$ = this.authService.isLoggedIn$;
  isAuthorized$!: Observable<boolean>;

  commentForm = this.fb.group({
    comment: ['', [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private authService: AuthService,
    private articleService: ArticleService,
    private profileService: ProfileService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        tap((data: any) => {
          this.article = data.article;
          this.isAuthorized$ = this.authService.currentUser$.pipe(
            map((currentUser) => {
              return currentUser?.username === this.article?.author.username;
            })
          );
        }),
        switchMap(() => {
          return this.commentService.getComments(this.article?.slug as string);
        })
      )
      .subscribe((comments: Comment[]) => {
        this.comments = comments.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      });
  }

  addComment() {
    if (!this.article) {
      return;
    }

    const slug = this.article.slug;
    const comment = this.commentForm.get('comment')?.value as string;

    this.commentService.addComment(slug, comment).subscribe({
      next: (comment: Comment) => {
        this.comments.unshift(comment);
        this.commentForm.get('comment')?.reset();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onEditArticle() {
    if (!this.article) {
      return;
    }
    this.router.navigate(['/editor', this.article.slug]);
  }

  onDeleteArticle() {
    if (!this.article) {
      return;
    }

    this.articleService
      .deleteArticle(this.article.slug)
      .pipe(delay(500))
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  onDeleteComment(id: number) {
    if (!this.article) {
      return;
    }
    this.commentService.deleteComment(this.article.slug, id).subscribe({
      next: () => {
        this.updateComments(id);
      },
    });
  }

  onMayBeFollow() {
    if (!this.article) {
      return;
    }
    const author = this.article.author.username;
    const isFollowing = this.article.author.following;
    let followOrNot$ = this.profileService.followUser(author);
    if (isFollowing) {
      followOrNot$ = this.profileService.unfollowUser(author);
    }

    followOrNot$.subscribe({
      next: (profile: Profile) => {
        this.updateArticleProfile(profile);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onMayBeFavorite() {
    if (!this.article) {
      return;
    }
    const slug = this.article.slug as string;
    const isFavorited = this.article.favorited;
    let favoriteOrNot$ = this.articleService.favoriteArticle(slug);
    if (!isFavorited) {
      favoriteOrNot$ = this.articleService.unfavoriteArticle(slug);
    }

    favoriteOrNot$.subscribe({
      next: (article: Article) => {
        this.updateArticle(article);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  private updateArticle(article: Article) {
    this.article = article;
  }

  private updateArticleProfile(profile: Profile) {
    if (!this.article) {
      return;
    }
    this.article.author = profile;
  }

  private updateComments(id: number) {
    if (!this.comments) {
      return;
    }
    this.comments = this.comments.filter((comment) => comment.id !== id);
  }
}
