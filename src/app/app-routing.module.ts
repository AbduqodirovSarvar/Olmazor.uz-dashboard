import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { HomeSlideComponent } from './components/home-slide/home-slide.component';
import { ServiceComponent } from './components/service/service.component';
import { ProjectComponent } from './components/project/project.component';
import { TeamComponent } from './components/team/team.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { UserComponent } from './components/user/user.component';
import { ClientComponent } from './components/client/client.component';
import { ContactComponent } from './components/contact/contact.component';
import { MessageComponent } from './components/message/message.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path: "home", component: DashboardComponent},
      {path: "about", component: AboutComponent},
      {path: "home-slides", component: HomeSlideComponent},
      {path: "services", component:ServiceComponent},
      {path: "projects", component: ProjectComponent},
      {path: "team", component: TeamComponent},
      {path: "clients", component: ClientComponent},
      {path: "blogs", component: BlogPostComponent},
      {path: "contacts", component: ContactComponent},
      {path: "messages", component: MessageComponent},
      {path: "users", component: UserComponent},
    ]
  },

  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
