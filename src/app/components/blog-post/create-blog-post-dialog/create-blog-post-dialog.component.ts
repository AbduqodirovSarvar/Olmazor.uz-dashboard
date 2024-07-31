import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BlogService, CreateBlogPostRequest } from 'src/app/services/apis/blog.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseApiService } from 'src/app/services/apis/base.api.service';
import { TranslationPipe } from 'src/app/services/translation.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-blog-post-dialog',
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
  templateUrl: './create-blog-post-dialog.component.html',
  styleUrl: './create-blog-post-dialog.component.scss'
})
export class CreateBlogPostDialogComponent implements OnInit {
  blogPostForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateBlogPostDialogComponent>,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogPostForm = this.fb.group({
      TitleUz: ['', Validators.required],
      TitleEn: ['', Validators.required],
      TitleRu: ['', Validators.required],
      TitleUzRu: ['', Validators.required],
      DescriptionUz: ['', Validators.required],
      DescriptionEn: ['', Validators.required],
      DescriptionRu: ['', Validators.required],
      DescriptionUzRu: ['', Validators.required],
      Link: ['', Validators.required],
      Photo: [null, Validators.required] // For file input
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.blogPostForm.valid) {
      const formData: CreateBlogPostRequest = {
        TitleUz: this.blogPostForm.get('TitleUz')?.value,
        TitleEn: this.blogPostForm.get('TitleEn')?.value,
        TitleRu: this.blogPostForm.get('TitleRu')?.value,
        TitleUzRu: this.blogPostForm.get('TitleUzRu')?.value,
        DescriptionUz: this.blogPostForm.get('DescriptionUz')?.value,
        DescriptionEn: this.blogPostForm.get('DescriptionEn')?.value,
        DescriptionRu: this.blogPostForm.get('DescriptionRu')?.value,
        DescriptionUzRu: this.blogPostForm.get('DescriptionUzRu')?.value,
        Link: this.blogPostForm.get('Link')?.value,
        Photo: this.blogPostForm.get('Photo')?.value
      };

      this.blogService.createBlogPost(formData).subscribe({
        next: () => {
          console.log('Blog post created successfully!');
          this.dialogRef.close(true); // Pass true to indicate success
        },
        error: (error) => {
          console.error('Error creating blog post:', error);
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.blogPostForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }
}
