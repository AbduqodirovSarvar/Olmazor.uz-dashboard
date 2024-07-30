import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService, CreateClientRequest } from 'src/app/services/apis/client.service';

@Component({
  selector: 'app-create-client-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule
  ],
  templateUrl: './create-client-dialog.component.html',
  styleUrls: ['./create-client-dialog.component.scss']
})
export class CreateClientDialogComponent implements OnInit {
  clientForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateClientDialogComponent>,
    private clientService: ClientService
  ) {
    this.clientForm = new FormGroup({
      Firstname: new FormControl('', Validators.required),
      FirstnameRu: new FormControl('', Validators.required),
      Lastname: new FormControl('', Validators.required),
      LastnameRu: new FormControl('', Validators.required),
      Phone: new FormControl('', Validators.required),
      PositionUz: new FormControl('', Validators.required),
      PositionEn: new FormControl('', Validators.required),
      PositionRu: new FormControl('', Validators.required),
      PositionUzRu: new FormControl('', Validators.required),
      CommentUz: new FormControl('', Validators.required),
      CommentEn: new FormControl('', Validators.required),
      CommentRu: new FormControl('', Validators.required),
      CommentUzRu: new FormControl('', Validators.required),
      Photo: new FormControl<File | null>(null, Validators.required)
    });
  }

  ngOnInit(): void {}

  createClientRequest: CreateClientRequest = {
    Firstname: '',
    FirstnameRu: '',
    Lastname: '',
    LastnameRu: '',
    Phone: '',
    PositionUz: '',
    PositionEn: '',
    PositionRu: '',
    PositionUzRu: '',
    CommentUz: '',
    CommentEn: '',
    CommentRu: '',
    CommentUzRu: '',
    Photo: new File([], '')
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.createClientRequest = {
        Firstname: this.clientForm.get('Firstname')?.value,
        FirstnameRu: this.clientForm.get('FirstnameRu')?.value,
        Lastname: this.clientForm.get('Lastname')?.value,
        LastnameRu: this.clientForm.get('LastnameRu')?.value,
        Phone: this.clientForm.get('Phone')?.value,
        PositionUz: this.clientForm.get('PositionUz')?.value,
        PositionEn: this.clientForm.get('PositionEn')?.value,
        PositionRu: this.clientForm.get('PositionRu')?.value,
        PositionUzRu: this.clientForm.get('PositionUzRu')?.value,
        CommentUz: this.clientForm.get('CommentUz')?.value,
        CommentEn: this.clientForm.get('CommentEn')?.value,
        CommentRu: this.clientForm.get('CommentRu')?.value,
        CommentUzRu: this.clientForm.get('CommentUzRu')?.value,
        Photo: this.clientForm.get('Photo')?.value
      };

      this.clientService.createClient(this.createClientRequest).subscribe({
        next: () => {
          console.log('Client created successfully!');
        },
        error: (error) => {
          console.error('Error creating client:', error);
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
      this.clientForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }
}
