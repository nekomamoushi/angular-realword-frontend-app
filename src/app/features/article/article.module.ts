import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './page/article/article.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticleComponent],
  imports: [CommonModule, ReactiveFormsModule, ArticleRoutingModule],
})
export class ArticleModule {}
