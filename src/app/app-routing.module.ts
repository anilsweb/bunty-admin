import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { WallpaperComponent } from './pages/wallpaper/wallpaper.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import("./pages/login/login.module").then(m => m.LoginModule) },
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: 'sub-category', component: SubCategoryComponent
  },
  {
    path: 'wallpaper', component: WallpaperComponent
  },
  {
    path: 'my-profile', component: MyProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
