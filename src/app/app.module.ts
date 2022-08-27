import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './@common/sidenav/sidenav.component';
import { HeaderComponent } from './@common/header/header.component';
import { CategoryComponent } from './pages/category/category.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { WallpaperComponent } from './pages/wallpaper/wallpaper.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ApiUrlComponent } from './pages/api-url/api-url.component';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './pages/login/login.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    CategoryComponent,
    SubCategoryComponent,
    WallpaperComponent,
    MyProfileComponent,
    HomeComponent,
    UsersComponent,
    ReportsComponent,
    SettingsComponent,
    ApiUrlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MatSnackBarModule,
    MatButtonModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
