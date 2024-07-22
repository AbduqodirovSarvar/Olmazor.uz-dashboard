import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-flexy-module';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { HomeSlideComponent } from './home-slide/home-slide.component';
import { ProjectComponent } from './project/project.component';
import { ServiceComponent } from './service/service.component';


@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    UserComponent,
    TeamComponent,
    BlogPostComponent,
    HomeSlideComponent,
    ProjectComponent,
    ServiceComponent
  ],
  exports: [
    UserComponent,
    TeamComponent,
    BlogPostComponent,
    HomeSlideComponent,
    ProjectComponent,
    ServiceComponent
  ]
})
export class ComponentsModule { }
