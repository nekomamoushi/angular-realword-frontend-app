import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './components/banner/banner.component';

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule, HttpClientModule],
  exports: [BannerComponent],
})
export class SharedModule {}
