import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientService, UpdateClientRequest } from 'src/app/services/apis/client.service';

@Component({
  selector: 'app-update-client-dialog',
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
  templateUrl: './update-client-dialog.component.html',
  styleUrls: ['./update-client-dialog.component.scss']
})
export class UpdateClientDialogComponent implements OnInit {
  clientForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateClientDialogComponent>,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: { clientId: string }
  ) {
    this.clientForm = new FormGroup({
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
      CommentUz: new FormControl(''),
      CommentEn: new FormControl(''),
      CommentRu: new FormControl(''),
      CommentUzRu: new FormControl(''),
      Photo: new FormControl<File | null>(null)
    });
  }

  ngOnInit(): void {
    this.clientService.getClientById(this.data.clientId).subscribe({
      next: (client) => {
        if (client) {
          this.clientForm.patchValue({
            Id: client.id,
            Firstname: client.firstname,
            FirstnameRu: client.firstnameRu,
            Lastname: client.lastname,
            LastnameRu: client.lastnameRu,
            Phone: client.phone,
            PositionUz: client.positionUz,
            PositionEn: client.positionEn,
            PositionRu: client.positionRu,
            PositionUzRu: client.positionUzRu,
            CommentUz: client.commentUz,
            CommentEn: client.commentEn,
            CommentRu: client.commentRu,
            CommentUzRu: client.commentUzRu,
          });
        }
      },
      error: (error) => {
        console.error('Error fetching client data:', error);
      }
    });
  }

  updateClientRequest: UpdateClientRequest = {
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
      this.updateClientRequest = {
        Id: this.clientForm.get('Id')?.value,
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

      this.clientService.updateClient(this.updateClientRequest).subscribe({
        next: () => {
          console.log('Client updated successfully!');
        },
        error: (error) => {
          console.error('Error updating client:', error);
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
