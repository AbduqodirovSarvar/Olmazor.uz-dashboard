import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTeamRequest, TeamResponse, TeamService } from 'src/app/services/apis/team.service';
import { CreateTeamDialogComponent } from './create-team-dialog/create-team-dialog.component';
import { UpdateTeamDialogComponent } from './update-team-dialog/update-team-dialog.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    CommonModule
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  members: TeamResponse[] = [];
  filteredMembers: TeamResponse[] = [];
  searchtext: string = '';
  teamForm: FormGroup;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) {
    this.teamForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadTeamMembers(null);
    this.teamForm.get('query')?.valueChanges.subscribe(searchText => {
      this.loadTeamMembers(searchText);
    });
  }

  onCreateNewMember() {
    console.log('onCreateNewMember');
    this.dialog.open(CreateTeamDialogComponent).afterClosed().subscribe({
      next: () => {
        this.loadTeamMembers(this.teamForm.get('query')?.value);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  onEditMember(memberId: string): void {
    console.log('onEditMember:', memberId);
    this.dialog.open(UpdateTeamDialogComponent, { data: { memberId: memberId } }).afterClosed().subscribe({
      next: () => {
        this.loadTeamMembers();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  deleteMember(memberId: string): void {
    const deleteMemberRequest: DeleteTeamRequest = {
      Id: memberId,
    };

    this.teamService.deleteTeamMember(deleteMemberRequest).subscribe(
      {
        next: () => {
          console.log('Member deleted successfully');
          this.loadTeamMembers();
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
    );
  }

  loadTeamMembers(searchText?: string | null): void {
    this.teamService.getAllTeamMembers().subscribe(
      {
        next: (data) => {
          if (searchText) {
            console.log('Search');
            this.onSearch(searchText);
            this.members = this.filteredMembers;
          } else {
            console.log(data);
            this.members = data;
            this.filteredMembers = data;
          }
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
    );
  }

  getPhoto(member: TeamResponse): string {
    return `http://45.130.148.137:8080/api/File/${member.photo}`;
  }

  onSearch(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredMembers = this.members.filter(member =>
      (member.firstname && member.firstname.toLowerCase().includes(lowerQuery)) ||
      (member.firstnameRu && member.firstnameRu.toLowerCase().includes(lowerQuery)) ||
      (member.lastname && member.lastname.toLowerCase().includes(lowerQuery)) ||
      (member.lastnameRu && member.lastnameRu.toLowerCase().includes(lowerQuery)) ||
      (member.positionUz && member.positionUz.toLowerCase().includes(lowerQuery)) ||
      (member.positionEn && member.positionEn.toLowerCase().includes(lowerQuery)) ||
      (member.positionRu && member.positionRu.toLowerCase().includes(lowerQuery)) ||
      (member.positionUzRu && member.positionUzRu.toLowerCase().includes(lowerQuery))
    );
  }
}
