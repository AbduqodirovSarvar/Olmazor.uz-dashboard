import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { TeamService, UpdateTeamRequest } from 'src/app/services/apis/team.service';

@Component({
  selector: 'app-update-team-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './update-team-dialog.component.html',
  styleUrl: './update-team-dialog.component.scss'
})
export class UpdateTeamDialogComponent implements OnInit {
  teamForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateTeamDialogComponent>,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: { memberId: string }
  ) {
    this.teamForm = new FormGroup({
      Id: new FormControl('', Validators.required),
      Firstname: new FormControl(''),
      FirstnameRu: new FormControl(''),
      Lastname: new FormControl(''),
      LastnameRu: new FormControl(''),
      Phone: new FormControl(''),
      PositionUz: new FormControl(''),
      PositionEn: new FormControl(''),
      PositionRu: new FormControl(''),
      PositionUzRu: new FormControl(''),
      Telegram: new FormControl(null),
      Instagram: new FormControl(null),
      Twitter: new FormControl(null),
      Email: new FormControl(null),
      Photo: new FormControl<File | null>(null)
    });
  }

  ngOnInit(): void {
    this.teamService.getTeamMember(this.data.memberId).subscribe({
      next: (member) => {
        if (member) {
          this.teamForm.patchValue({
            Id: member.id,
            Firstname: member.firstname,
            FirstnameRu: member.firstnameRu,
            Lastname: member.lastname,
            LastnameRu: member.lastnameRu,
            Phone: member.phone,
            PositionUz: member.positionUz,
            PositionEn: member.positionEn,
            PositionRu: member.positionRu,
            PositionUzRu: member.positionUzRu,
            Telegram: member.telegram,
            Instagram: member.instagram,
            Twitter: member.twitter,
            Email: member.email,
          });
        }
      },
      error: (error) => {
        console.error('Error fetching post data:', error);
      }
    });
  }

  updateTeamRequest: UpdateTeamRequest = {
    Id: '',
    Firstname: '',
    FirstnameRu: '',
    Lastname: '',
    LastnameRu: '',
    Phone: '',
    PositionUz: '',
    PositionEn: '',
    PositionRu: '',
    PositionUzRu: '',
    Telegram: '',
    Instagram: '',
    Twitter: '',
    Email: '',
    Photo: new File([], '')
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      this.updateTeamRequest = {
        Id: this.teamForm.get('Id')?.value,
        Firstname: this.teamForm.get('Firstname')?.value,
        FirstnameRu: this.teamForm.get('FirstnameRu')?.value,
        Lastname: this.teamForm.get('Lastname')?.value,
        LastnameRu: this.teamForm.get('LastnameRu')?.value,
        Phone: this.teamForm.get('Phone')?.value,
        PositionUz: this.teamForm.get('PositionUz')?.value,
        PositionEn: this.teamForm.get('PositionEn')?.value,
        PositionRu: this.teamForm.get('PositionRu')?.value,
        PositionUzRu: this.teamForm.get('PositionUzRu')?.value,
        Telegram: this.teamForm.get('Telegram')?.value,
        Instagram: this.teamForm.get('Instagram')?.value,
        Twitter: this.teamForm.get('Twitter')?.value,
        Email: this.teamForm.get('Email')?.value,
        Photo: this.teamForm.get('Photo')?.value
      };

      this.teamService.updateTeamMember(this.updateTeamRequest).subscribe({
        next: () => {
          console.log('Team member updated successfully!');
        },
        error: (error) => {
          console.error('Error creating team member:', error);
        },
        complete: () => {
          this.dialogRef.close();
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.teamForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }

}
