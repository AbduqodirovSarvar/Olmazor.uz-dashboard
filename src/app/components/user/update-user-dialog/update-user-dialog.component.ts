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
import {MatSelectModule} from '@angular/material/select';
import { BaseApiService, EnumResponse } from 'src/app/services/apis/base.api.service';
import { UserService, UpdateUserRequest, UserResponse } from 'src/app/services/apis/user.service';

@Component({
  selector: 'app-update-user-dialog',
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
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {
  userForm!: FormGroup;
  selectedFileName: string | null = null;
  userRoles: EnumResponse[] = [];
  genders: EnumResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private userService: UserService,
    private baseApiService: BaseApiService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
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
      Id: new FormControl('', Validators.required),
      Firstname: new FormControl(''),
      FirstnameRu: new FormControl(''),
      Lastname: new FormControl(''),
      LastnameRu: new FormControl(''),
      Phone: new FormControl(''),
      Userrole: new FormControl(''),
      Gender: new FormControl(''),
      Email: new FormControl('', [Validators.email]),
      Password: new FormControl(''),
      Photo: new FormControl<File | null>(null)
    });

    this.userService.getUser(this.data.userId).subscribe({
      next: (user: UserResponse) => {
        if (user) {
          this.userForm.patchValue({
            Id: user.id,
            Firstname: user.firstname,
            FirstnameRu: user.firstnameRu,
            Lastname: user.lastname,
            LastnameRu: user.lastnameRu,
            Phone: user.phone,
            Userrole: user.userrole,
            Gender: user.gender,
            Email: user.email,
          });
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  updateUserRequest: UpdateUserRequest = {
    Id: '',
    Firstname: '',
    FirstnameRu: '',
    Lastname: '',
    LastnameRu: '',
    Phone: '',
    Userrole: 0,
    Gender: 0,
    Email: '',
    Password: '',
    OldPassword: '',
    Photo: new File([], '')
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.updateUserRequest = {
        Id: this.userForm.get('Id')?.value,
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

      this.userService.updateUser(this.updateUserRequest).subscribe({
        next: () => {
          console.log('User updated successfully!');
        },
        error: (error) => {
          console.error('Error updating user:', error);
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
      this.userForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }
}
