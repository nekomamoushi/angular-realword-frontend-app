import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {
  public static forRoot() {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
