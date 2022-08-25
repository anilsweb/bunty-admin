import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiUrlComponent } from './pages/api-url/api-url.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { UsersComponent } from './pages/users/users.component';
import { WallpaperComponent } from './pages/wallpaper/wallpaper.component';
const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  { path: 'login', loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
  { path: 'category', component: CategoryComponent},
  { path: 'sub-category', component: SubCategoryComponent },
  { path: 'my-profile', component: MyProfileComponent},
  { path: 'wallpaper', component: WallpaperComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'api-url', component: ApiUrlComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
