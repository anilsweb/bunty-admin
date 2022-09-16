import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ApiUrlComponent } from './pages/api-url/api-url.component';
import { CategoryComponent } from './pages/category/category.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginHistoryComponent } from './pages/login-history/login-history.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { UsersComponent } from './pages/users/users.component';
import { WallpaperComponent } from './pages/wallpaper/wallpaper.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent,canActivate: [AuthGuard] 
  },
  { path: 'login', loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
  { path: 'category', component: CategoryComponent,canActivate: [AuthGuard] },
  { path: 'sub-category', component: SubCategoryComponent,canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent,canActivate: [AuthGuard] },
  { path: 'change-password', component: ChangePasswordComponent,canActivate: [AuthGuard] },
  { path: 'wallpaper', component: WallpaperComponent,canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent,canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent,canActivate: [AuthGuard] },
  { path: 'settings', loadChildren: () => import("./pages/settings/settings.module").then(m => m.SettingsModule), canActivate: [AuthGuard] },
  { path: 'api-url', component: ApiUrlComponent,canActivate: [AuthGuard] },
  { path: 'log-history', component: LoginHistoryComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
