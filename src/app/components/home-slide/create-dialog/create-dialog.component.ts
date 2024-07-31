import { HomepostService } from './../../../services/apis/homepost.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateHomePostRequest } from 'src/app/services/apis/homepost.service';
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
import { CommonModule } from '@angular/common';
import { TranslationPipe } from 'src/app/services/translation.pipe';

@Component({
  selector: 'app-create-dialog',
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
  templateUrl: './create-dialog.component.html',
  styleUrl: './create-dialog.component.scss'
})
export class CreateDialogComponent implements OnInit {
  homeSlideForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    private homePostService: HomepostService
  ) {}

  ngOnInit(): void {
    this.homeSlideForm = new FormGroup({
      TitleUz: new FormControl('', Validators.required),
      TitleEn: new FormControl('', Validators.required),
      TitleRu: new FormControl('', Validators.required),
      TitleUzRu: new FormControl('', Validators.required),
      SubtitleUz: new FormControl('', Validators.required),
      SubtitleEn: new FormControl('', Validators.required),
      SubtitleRu: new FormControl('', Validators.required),
      SubtitleUzRu: new FormControl('', Validators.required),
      DescriptionUz: new FormControl('', Validators.required),
      DescriptionEn: new FormControl('', Validators.required),
      DescriptionRu: new FormControl('', Validators.required),
      DescriptionUzRu: new FormControl('', Validators.required),
      Photo: new FormControl<File | null>(null, Validators.required) // For file input
    });
  }

  homeSlide: CreateHomePostRequest = {
    TitleUz: '',
    TitleEn: '',
    TitleRu: '',
    TitleUzRu: '',
    SubtitleUz: '',
    SubtitleEn: '',
    SubtitleRu: '',
    SubtitleUzRu: '',
    DescriptionUz: '',
    DescriptionEn: '',
    DescriptionRu: '',
    DescriptionUzRu: '',
    Photo: new File([], '')
  };

  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.homeSlideForm.valid) {
      this.homeSlide = {
        TitleUz: this.homeSlideForm.get('TitleUz')?.value,
        TitleEn: this.homeSlideForm.get('TitleEn')?.value,
        TitleRu: this.homeSlideForm.get('TitleRu')?.value,
        TitleUzRu: this.homeSlideForm.get('TitleUzRu')?.value,
        SubtitleUz: this.homeSlideForm.get('SubtitleUz')?.value,
        SubtitleEn: this.homeSlideForm.get('SubtitleEn')?.value,
        SubtitleRu: this.homeSlideForm.get('SubtitleRu')?.value,
        SubtitleUzRu: this.homeSlideForm.get('SubtitleUzRu')?.value,
        DescriptionUz: this.homeSlideForm.get('DescriptionUz')?.value,
        DescriptionEn: this.homeSlideForm.get('DescriptionEn')?.value,
        DescriptionRu: this.homeSlideForm.get('DescriptionRu')?.value,
        DescriptionUzRu: this.homeSlideForm.get('DescriptionUzRu')?.value,
        Photo: this.homeSlideForm.get('Photo')?.value
      };

      console.log(this.homeSlide);
      this.homePostService.createHomePost(this.homeSlide).subscribe({
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.homeSlideForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }
}
