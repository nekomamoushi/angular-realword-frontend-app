import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../features/auth/auth.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, AuthModule.forRoot()],
  exports: [NavbarComponent],
})
export class CoreModule {}
