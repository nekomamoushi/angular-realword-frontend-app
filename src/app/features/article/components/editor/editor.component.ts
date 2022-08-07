import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { iif } from 'rxjs';
import { Article } from 'src/app/core/models/article';
import { Errors } from 'src/app/core/models/errors';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  slug: string | null = null;
  article: Article | null = null;
  editorForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    body: ['', [Validators.required]],
    tag: [''],
  });
  errorList: Errors | null = null;

  tagList: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.articleService
        .getArticle(this.slug)
        .subscribe((response: Article) => {
          this.article = response;
          this.editorForm.patchValue({
            title: this.article.title,
            description: this.article.description,
            body: this.article.body,
          });
          this.tagList = this.article.tagList;
        });
    }
  }

  get tag() {
    return this.editorForm.get('tag') as FormControl;
  }

  addTag(event: Event) {
    event.preventDefault();
    const name = this.tag.value;

    if (!this.tagList.includes(name)) {
      this.tagList.push(name);
    }

    this.tag.reset();
  }

  onSubmit() {
    const { title, description, body } = this.editorForm.value;
    const article = {
      title: title as string,
      body: body as string,
      description: description as string,
      tagList: this.tagList,
    };

    let saveOrUpdate = this.articleService.createArticle(article);
    if (this.slug) {
      saveOrUpdate = this.articleService.updateArticle(this.slug, article);
    }
    saveOrUpdate.subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err.error);
        this.errorList = err.error;
      },
    });
  }
}
