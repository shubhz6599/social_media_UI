import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { OnlinePeopleComponent } from './online-people/online-people.component';
import { PosttimePipe } from '../pipe/timezone/posttime.pipe';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CityServicesComponent } from './city-services/city-services.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'online-friends', component: OnlinePeopleComponent },
  { path: 'chat/:userId', component: ChatComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'city-services', component: CityServicesComponent },

];

@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    OnlinePeopleComponent,
    PosttimePipe,
    ProfileComponent,
    CityServicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class DashboardModule { }
