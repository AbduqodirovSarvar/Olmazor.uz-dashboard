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
import { AboutService, CreateAboutRequest } from 'src/app/services/apis/about.service';
import { TranslationPipe } from "../../../services/translation.pipe";

@Component({
  selector: 'app-create-about-dialog',
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
  templateUrl: './create-about-dialog.component.html',
  styleUrls: ['./create-about-dialog.component.scss']
})
export class CreateAboutDialogComponent implements OnInit {
  aboutForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateAboutDialogComponent>,
    private aboutService: AboutService,
  ) {

  }

  ngOnInit(): void {
    this.aboutForm = new FormGroup({
      AddressUz: new FormControl('', Validators.required),
      AddressEn: new FormControl('', Validators.required),
      AddressRu: new FormControl('', Validators.required),
      AddressUzRu: new FormControl('', Validators.required),
      TitleUz: new FormControl('', Validators.required),
      TitleEn: new FormControl('', Validators.required),
      TitleRu: new FormControl('', Validators.required),
      TitleUzRu: new FormControl('', Validators.required),
      DescriptionUz: new FormControl('', Validators.required),
      DescriptionEn: new FormControl('', Validators.required),
      DescriptionRu: new FormControl('', Validators.required),
      DescriptionUzRu: new FormControl('', Validators.required),
      DescriptionFooterUz: new FormControl('', Validators.required),
      DescriptionFooterEn: new FormControl('', Validators.required),
      DescriptionFooterRu: new FormControl('', Validators.required),
      DescriptionFooterUzRu: new FormControl('', Validators.required),
      Experience: new FormControl('', Validators.required),
      Photo: new FormControl<File | null>(null, Validators.required),
    });
  }

  createAboutRequest: CreateAboutRequest = {
    AddressUz: '',
    AddressEn: '',
    AddressRu: '',
    AddressUzRu: '',
    TitleUz: '',
    TitleEn: '',
    TitleRu: '',
    TitleUzRu: '',
    DescriptionUz: '',
    DescriptionEn: '',
    DescriptionRu: '',
    DescriptionUzRu: '',
    DescriptionFooterUz: '',
    DescriptionFooterEn: '',
    DescriptionFooterRu: '',
    DescriptionFooterUzRu: '',
    Experience: 0,
    Photo: new File([], '')
  };

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.aboutForm.valid) {
      this.createAboutRequest = {
        AddressUz: this.aboutForm.get('AddressUz')?.value,
        AddressEn: this.aboutForm.get('AddressEn')?.value,
        AddressRu: this.aboutForm.get('AddressRu')?.value,
        AddressUzRu: this.aboutForm.get('AddressUzRu')?.value,
        TitleUz: this.aboutForm.get('TitleUz')?.value,
        TitleEn: this.aboutForm.get('TitleEn')?.value,
        TitleRu: this.aboutForm.get('TitleRu')?.value,
        TitleUzRu: this.aboutForm.get('TitleUzRu')?.value,
        DescriptionUz: this.aboutForm.get('DescriptionUz')?.value,
        DescriptionEn: this.aboutForm.get('DescriptionEn')?.value,
        DescriptionRu: this.aboutForm.get('DescriptionRu')?.value,
        DescriptionUzRu: this.aboutForm.get('DescriptionUzRu')?.value,
        DescriptionFooterUz: this.aboutForm.get('DescriptionFooterUz')?.value,
        DescriptionFooterEn: this.aboutForm.get('DescriptionFooterEn')?.value,
        DescriptionFooterRu: this.aboutForm.get('DescriptionFooterRu')?.value,
        DescriptionFooterUzRu: this.aboutForm.get('DescriptionFooterUzRu')?.value,
        Experience: this.aboutForm.get('Experience')?.value,
        Photo: this.aboutForm.get('Photo')?.value
      };

      this.aboutService.createAbout(this.createAboutRequest).subscribe({
        next: (response) => {
          console.log('About section created successfully!', response);
        },
        error: (error) => {
          console.error('Error creating about section:', error);
        }
      });
      this.dialogRef.close();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.aboutForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }
}
