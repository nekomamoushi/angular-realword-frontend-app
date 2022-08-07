import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { EditorComponent } from './components/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, ReactiveFormsModule, ArticleRoutingModule],
})
export class ArticleModule {}
