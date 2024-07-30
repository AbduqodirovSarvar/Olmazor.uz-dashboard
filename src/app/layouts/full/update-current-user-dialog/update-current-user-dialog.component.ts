import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from 'src/app/services/apis/auth.service';
import { BaseApiService, EnumResponse } from 'src/app/services/apis/base.api.service';
import { UserService, UpdateUserRequest, UserResponse } from 'src/app/services/apis/user.service';

@Component({
  selector: 'app-update-current-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './update-current-user-dialog.component.html',
  styleUrls: ['./update-current-user-dialog.component.scss']
})
export class UpdateCurrentUserDialogComponent implements OnInit {
  userForm!: FormGroup;
  selectedFileName: string | null = null;
  userRoles: EnumResponse[] = [];
  genders: EnumResponse[] = [];
  changingPassword: boolean = false;
  hidePassword: boolean = true;


  constructor(
    public dialogRef: MatDialogRef<UpdateCurrentUserDialogComponent>,
    private userService: UserService,
    private baseApiService: BaseApiService,
    private authService: AuthService
  ) { }

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
      OldPassword: new FormControl(''),
      ConfirmNewPassword: new FormControl(''/*,  [this.passwordsMatchValidator]*/),
      Photo: new FormControl<File | null>(null)
    }
  );

    this.baseApiService.getUserRoles().subscribe({
      next: (roles: EnumResponse[]) => {
        this.userRoles = roles;
      },
      error: (error) => {
        console.error('Error fetching user roles:', error);
      }
    });

    this.baseApiService.getGenders().subscribe({
      next: (genders: EnumResponse[]) => {
        this.genders = genders;
      },
      error: (error) => {
        console.error('Error fetching gender data:', error);
      }
    });

    this.authService.userBehavior.subscribe({
      next: (user: UserResponse | null) => {
        if(user){
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
      error: (error: any) => {
        console.error('Error fetching user:', error);
      }
    });

    this.userForm.get('Password')?.valueChanges.subscribe({
      next: (password: string) => {
        this.userForm.updateValueAndValidity();
        if (password) {
          this.changingPassword = true;
          this.userForm.get('ConfirmNewPassword')?.setValidators([Validators.required]);
          this.userForm.get('OldPassword')?.setValidators([Validators.required]);
        } else {
          this.changingPassword = false;
          this.userForm.get('ConfirmNewPassword')?.clearValidators();
          this.userForm.get('OldPassword')?.clearValidators();
        }
        this.userForm.get('ConfirmNewPassword')?.updateValueAndValidity();
        this.userForm.get('OldPassword')?.updateValueAndValidity();
      },
      error: (error: any) => {
        console.error('Error validating password:', error);
      },
    });
  }

  passwordsMatchValidator(control: AbstractControl) : { [key: string]: any } | null {
    const password = this.userForm.get('Password')?.value;
    const confirmPassword = control?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true }
    }

    return null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updateUserRequest: UpdateUserRequest = {
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
        OldPassword: this.userForm.get('OldPassword')?.value,
        Photo: this.userForm.get('Photo')?.value
      };

      this.userService.updateUser(updateUserRequest).subscribe({
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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
