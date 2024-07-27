import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  constructor(
    private helperService: HelperService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.helperService.setLaguage(null);
  }

  changeLanguage(language: string): void {
    this.helperService.setLaguage(language);
  }

  logOut(){
    this.helperService.removeAccessToken();
    this.helperService.redirectToLoginPage();
  }
  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/about",
      icon: "info",
      menu: "About Company",
    },
    {
      link: "/home-slides",
      icon: "layers",
      menu: "Home Slides",
    },
    {
      link: "/services",
      icon: "list",
      menu: "Services",
    },
    {
      link: "/projects",
      icon: "box",
      menu: "Projects",
    },
    {
      link: "/team",
      icon: "users",
      menu: "Team",
    },
    {
      link: "/clients",
      icon: "user-plus",
      menu: "Clients",
    },
    {
      link: "/blogs",
      icon: "book",
      menu: "Blogs",
    },
    {
      link: "/contacts",
      icon: "phone",
      menu: "Contacts",
    },
    {
      link: "/messages",
      icon: "mail",
      menu: "Messages",
    },
    {
      link: "/users",
      icon: "user-check",
      menu: "Users",
    },
  ]
}
