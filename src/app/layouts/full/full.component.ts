import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';
import { UserResponse } from 'src/app/services/apis/user.service';
import { AuthService } from 'src/app/services/apis/auth.service';
import { MessageService } from 'src/app/services/apis/message.service';
import { BaseApiService, EnumResponse } from 'src/app/services/apis/base.api.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCurrentUserDialogComponent } from './update-current-user-dialog/update-current-user-dialog.component';

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
  userRoles: EnumResponse[] = [];
  currentUser!: UserResponse;
  notificationNumber: number | null = null;

  constructor(
    private helperService: HelperService,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private messageService: MessageService,
    private baseApiService: BaseApiService,
    private dialog: MatDialog
  ) {
    authService.userBehavior.subscribe({
      next: (user) => {
        this.currentUser = user!;
      },
      error: (error) => {
        console.error(error);
      }
    });

    baseApiService.getUserRoles().subscribe({
      next: (roles: EnumResponse[]) => {
        this.userRoles = roles;
      },
      error: (error) => {
        console.error('Error fetching user roles:', error);
      }
    });

    messageService.IsSeenBehaviourSubject.subscribe({
      next: (isNotSeen: number | null) => {
        this.notificationNumber = isNotSeen;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
   }

  ngOnInit(): void {
    this.helperService.setLaguage(null);
    this.messageService.getAllMessages().subscribe({
      next: (messages) => {
        this.notificationNumber = messages.filter(item => item.isSeen === false).length > 0 ? messages.filter(item => item.isSeen === false).length : null;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  clickSettings(){
    this.dialog.open(UpdateCurrentUserDialogComponent);
  }

  getPhoto() :string{
    return this.currentUser ? this.baseApiService.getPhoto(this.currentUser.photo) : '';
  }

  getEnumName() :string {
    return this.userRoles.find(x => x.id === this.currentUser.userrole)?.name ?? "undefined";
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
