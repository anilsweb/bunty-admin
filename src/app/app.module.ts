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
import { ApiUrlComponent } from './pages/api-url/api-url.component';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './pages/login/login.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './@common/material.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ModalComponent } from './@common/modal/modal.component';
import { LoginHistoryComponent } from './pages/login-history/login-history.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RolesComponent } from './pages/roles/roles.component';
import { PermissionComponent } from './pages/permission/permission.component';


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
    ApiUrlComponent,
    ChangePasswordComponent,
    ModalComponent,
    LoginHistoryComponent,
    RolesComponent,
    PermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    MatSnackBarModule,
    MatButtonModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatDatepickerModule, MatMomentDateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [AuthGuard,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
