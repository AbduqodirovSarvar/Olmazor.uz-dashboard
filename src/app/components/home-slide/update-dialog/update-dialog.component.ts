import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateHomePostRequest, HomepostService, UpdateHomePostRequest } from 'src/app/services/apis/homepost.service';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from 'src/app/services/translation.pipe';

@Component({
  selector: 'app-update-dialog',
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
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.scss'
})
export class UpdateDialogComponent {
  selectedFileName: string | null = null;
  homeSlideForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    private homePostService: HomepostService,
    @Inject(MAT_DIALOG_DATA) public data: { postId: string } // Correctly inject MAT_DIALOG_DATA
  ) {
    this.homeSlideForm = new FormGroup({
      Id: new FormControl<string>(''),
      TitleUz: new FormControl(''),
      TitleEn: new FormControl(''),
      TitleRu: new FormControl(''),
      TitleUzRu: new FormControl(''),
      SubtitleUz: new FormControl(''),
      SubtitleEn: new FormControl(''),
      SubtitleRu: new FormControl(''),
      SubtitleUzRu: new FormControl(''),
      DescriptionUz: new FormControl(''),
      DescriptionEn: new FormControl(''),
      DescriptionRu: new FormControl(''),
      DescriptionUzRu: new FormControl(''),
      Photo: new FormControl<File | null>(null) // For file input
    });
  }

  ngOnInit(): void {
    this.homePostService.getHomePost(this.data.postId).subscribe({
      next: (post) => {
        console.log("Post loaded: ", post); // Log the loaded post object

        // Ensure the object has the expected keys and values
        if (post) {
          this.homeSlideForm.patchValue({
            Id: post.id,
            TitleUz: post.titleUz,
            TitleEn: post.titleEn,
            TitleRu: post.titleRu,
            TitleUzRu: post.titleUzRu,
            SubtitleUz: post.subtitleUz,
            SubtitleEn: post.subtitleEn,
            SubtitleRu: post.subtitleRu,
            SubtitleUzRu: post.subtitleUzRu,
            DescriptionUz: post.descriptionUz,
            DescriptionEn: post.descriptionEn,
            DescriptionRu: post.descriptionRu,
            DescriptionUzRu: post.descriptionUzRu
          });

          console.log("Form after patchValue: ", this.homeSlideForm.value); // Log the form value
        }
      },
      error: (error) => {
        console.error('Error fetching post data:', error);
      }
    });
  }



  homeSlide: UpdateHomePostRequest = {
    Id: '',
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
        Id: this.homeSlideForm.get('Id')!.value,
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
      this.homePostService.updateHomePost(this.homeSlide).subscribe({
        next: () => {
          console.log('Home post updated successfully!');
        },
        error: (error: any) => {
          console.error('Error updating home post:', error);
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
