import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {HeaderComponent} from "./header/header.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { LayoutsComponent } from './layouts/layouts.component';
import { ProfilePersonalComponent } from './profile-personal/profile-personal.component';
import { RegisterWorkScheduleComponent } from './register-work-schedule/register-work-schedule.component';
import { AppModule } from 'src/app/app.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import {ChatComponent} from "../chat/chat.component";
import { LayoutsAdminComponent } from './layouts-admin/layouts-admin.component';


@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LayoutsComponent,
    ChatComponent,
    ProfilePersonalComponent,
    LayoutsAdminComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ]
})
export class SharedModule { }
