import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateServiceRequest, ServicesService } from 'src/app/services/apis/services.service';

@Component({
  selector: 'app-create-service-dialog',
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
  templateUrl: './create-service-dialog.component.html',
  styleUrl: './create-service-dialog.component.scss'
})
export class CreateServiceDialogComponent implements OnInit {
  createServiceForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateServiceDialogComponent>,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
    this.createServiceForm = new FormGroup({
      NameUz: new FormControl('', Validators.required),
      NameEn: new FormControl('', Validators.required),
      NameRu: new FormControl('', Validators.required),
      NameUzRu: new FormControl('', Validators.required),
      DescriptionUz: new FormControl('', Validators.required),
      DescriptionEn: new FormControl('', Validators.required),
      DescriptionRu: new FormControl('', Validators.required),
      DescriptionUzRu: new FormControl('', Validators.required),
    });
  }

  createService: CreateServiceRequest = {
    nameUz: '',
    nameRu: '',
    nameEn: '',
    nameUzRu: '',
    descriptionUz: '',
    descriptionEn: '',
    descriptionRu: '',
    descriptionUzRu: '',
  };

  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.createServiceForm.valid) {
      this.createService = {
        nameEn: this.createServiceForm.get('NameEn')?.value,
        nameRu: this.createServiceForm.get('NameRu')?.value,
        nameUz: this.createServiceForm.get('NameUz')?.value,
        nameUzRu: this.createServiceForm.get('NameUzRu')?.value,
        descriptionUz: this.createServiceForm.get('DescriptionUz')?.value,
        descriptionEn: this.createServiceForm.get('DescriptionEn')?.value,
        descriptionRu: this.createServiceForm.get('DescriptionRu')?.value,
        descriptionUzRu: this.createServiceForm.get('DescriptionUzRu')?.value
      };

      console.log(this.createService);
      this.service.createService(this.createService).subscribe({
        next: () => {
          console.log('Home post created successfully!');
        },
        error: (error) => {
          console.error('Error creating home post:', error);
        }
      });
      this.dialogRef.close();
    }
  }

}
