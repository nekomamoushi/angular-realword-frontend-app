import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './pages/editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, ReactiveFormsModule, EditorRoutingModule],
})
export class EditorModule {}
