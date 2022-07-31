import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../features/auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, AuthModule.forRoot()],
  exports: [NavbarComponent],
})
export class CoreModule {}
