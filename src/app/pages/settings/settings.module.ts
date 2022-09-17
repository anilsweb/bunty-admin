import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { MaterialModule } from 'src/app/@common/material.module';
import { RouterModule, Routes } from '@angular/router';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { FormsModule } from '@angular/forms';
import { AppSettingComponent } from './app-setting/app-setting.component';

const routes: Routes = [
  { path: '', component: SettingsComponent }
]

@NgModule({
  declarations: [SettingsComponent, GeneralSettingComponent, AppSettingComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class SettingsModule { }
