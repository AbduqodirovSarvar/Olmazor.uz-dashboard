import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BaseApiService, EnumResponse } from 'src/app/services/apis/base.api.service';
import { UserService, CreateUserRequest, UserResponse } from 'src/app/services/apis/user.service';

@Component({
  selector: 'app-create-user-dialog',
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
    MatSelectModule
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {
  userForm!: FormGroup;
  selectedFileName: string | null = null;
  userRoles: EnumResponse[] = [];
  genders: EnumResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
    private userService: UserService,
    private baseApiService: BaseApiService,
    @Inject(MAT_DIALOG_DATA) public data: { userId?: string }
  ) {
    baseApiService.getUserRoles().subscribe({
      next: (roles: EnumResponse[]) => {
        this.userRoles = roles;
      },
      error: (error) => {
        console.error('Error fetching user roles:', error);
      }
    })

    baseApiService.getGenders().subscribe({
      next: (genders: EnumResponse[]) => {
        this.genders = genders;
      },
      error: (error) => {
        console.error('Error fetching gender data:', error);
      }
    });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      Firstname: new FormControl('', Validators.required),
      FirstnameRu: new FormControl('', Validators.required),
      Lastname: new FormControl('', Validators.required),
      LastnameRu: new FormControl('', Validators.required),
      Phone: new FormControl('', Validators.required),
      Userrole: new FormControl('', Validators.required),
      Gender: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', Validators.required),
      Photo: new FormControl<File | null>(null)
    });
  }

  createUserRequest: CreateUserRequest = {
    Firstname: '',
    FirstnameRu: '',
    Lastname: '',
    LastnameRu: '',
    Phone: '',
    Userrole: 0,
    Gender: 0,
    Email: '',
    Password: '',
    Photo: new File([], '')
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.createUserRequest = {
        Firstname: this.userForm.get('Firstname')?.value,
        FirstnameRu: this.userForm.get('FirstnameRu')?.value,
        Lastname: this.userForm.get('Lastname')?.value,
        LastnameRu: this.userForm.get('LastnameRu')?.value,
        Phone: this.userForm.get('Phone')?.value,
        Userrole: this.userForm.get('Userrole')?.value,
        Gender: this.userForm.get('Gender')?.value,
        Email: this.userForm.get('Email')?.value,
        Password: this.userForm.get('Password')?.value,
        Photo: this.userForm.get('Photo')?.value
      };

      console.log(this.createUserRequest);
      this.userService.createUser(this.createUserRequest).subscribe({
        next: (response: UserResponse) => {
          console.log('User created successfully!', response);
        },
        error: (error) => {
          console.error('Error creating user:', error);
        }
      });
      this.dialogRef.close();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }
}
