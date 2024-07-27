import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServicesService, UpdateServiceRequest } from 'src/app/services/apis/services.service';

@Component({
  selector: 'app-update-service-dialog',
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
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './update-service-dialog.component.html',
  styleUrl: './update-service-dialog.component.scss'
})
export class UpdateServiceDialogComponent  {

  updateServiceForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateServiceDialogComponent>,
    private service: ServicesService,
    @Inject(MAT_DIALOG_DATA) public data: { serviceId: string } // Correctly inject MAT_DIALOG_DATA
  ) {
    this.updateServiceForm = new FormGroup({
      Id: new FormControl<string>(''),
      NameUz: new FormControl(''),
      NameEn: new FormControl(''),
      NameRu: new FormControl(''),
      NameUzRu: new FormControl(''),
      DescriptionUz: new FormControl(''),
      DescriptionEn: new FormControl(''),
      DescriptionRu: new FormControl(''),
      DescriptionUzRu: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.service.getService(this.data.serviceId).subscribe({
      next: (data) => {
        console.log("Post loaded: ", data); // Log the loaded post object

        // Ensure the object has the expected keys and values
        if (data) {
          this.updateServiceForm.patchValue({
            Id: data.id,
            NameUz: data.nameUz,
            NameEn: data.nameEn,
            NameRu: data.nameRu,
            NameUzRu: data.nameUzRu,
            DescriptionUz: data.descriptionUz,
            DescriptionEn: data.descriptionEn,
            DescriptionRu: data.descriptionRu,
            DescriptionUzRu: data.descriptionUzRu
          });

          console.log("Form after patchValue: ", this.updateServiceForm.value); // Log the form value
        }
      },
      error: (error) => {
        console.error('Error fetching post data:', error);
      }
    });
  }

  updateServiceRequest: UpdateServiceRequest = {
    id: '',
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
    if (this.updateServiceForm.valid) {
      this.updateServiceRequest = {
        id: this.updateServiceForm.get('Id')!.value,
        nameEn: this.updateServiceForm.get('NameEn')?.value,
        nameRu: this.updateServiceForm.get('NameRu')?.value,
        nameUz: this.updateServiceForm.get('NameUz')?.value,
        nameUzRu: this.updateServiceForm.get('NameUzRu')?.value,
        descriptionUz: this.updateServiceForm.get('DescriptionUz')?.value,
        descriptionEn: this.updateServiceForm.get('DescriptionEn')?.value,
        descriptionRu: this.updateServiceForm.get('DescriptionRu')?.value,
        descriptionUzRu: this.updateServiceForm.get('DescriptionUzRu')?.value
      };

      console.log(this.updateServiceRequest);
      this.service.updateService(this.updateServiceRequest).subscribe({
        next: () => {
          console.log('Service updated successfully!');
        },
        error: (error: any) => {
          console.error('Error updating Service:', error);
        }
      });
      this.dialogRef.close();
    }
  }

}
