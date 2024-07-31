import { CommonModule } from '@angular/common';
import { CreateTeamRequest, TeamService } from './../../../services/apis/team.service';
import { Component, OnInit } from '@angular/core';
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
import { TranslationPipe } from 'src/app/services/translation.pipe';

@Component({
  selector: 'app-create-team-dialog',
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
    FormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './create-team-dialog.component.html',
  styleUrl: './create-team-dialog.component.scss'
})
export class CreateTeamDialogComponent implements OnInit {
  teamForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.teamForm = new FormGroup({
      Firstname: new FormControl('', Validators.required),
      FirstnameRu: new FormControl('', Validators.required),
      Lastname: new FormControl('', Validators.required),
      LastnameRu: new FormControl('', Validators.required),
      Phone: new FormControl(''),
      PositionUz: new FormControl('', Validators.required),
      PositionEn: new FormControl('', Validators.required),
      PositionRu: new FormControl('', Validators.required),
      PositionUzRu: new FormControl('', Validators.required),
      Telegram: new FormControl(null),
      Instagram: new FormControl(null),
      Twitter: new FormControl(null),
      Email: new FormControl(null, Validators.email),
      Photo: new FormControl<File | null>(null, Validators.required)
    });
  }

  createTeamRequest: CreateTeamRequest = {
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
      this.createTeamRequest = {
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

      console.log(this.createTeamRequest);
      this.teamService.createTeamMember(this.createTeamRequest).subscribe({
        next: () => {
          console.log('Team member created successfully!');
        },
        error: (error) => {
          console.error('Error creating team member:', error);
        }
      });
      this.dialogRef.close();
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
