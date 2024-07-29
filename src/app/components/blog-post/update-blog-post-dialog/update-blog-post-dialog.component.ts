import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { BlogPostResponse, BlogService, UpdateBlogPostRequest } from 'src/app/services/apis/blog.service';
import { BaseApiService } from 'src/app/services/apis/base.api.service';

@Component({
  selector: 'app-update-blog-post-dialog',
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
    CommonModule
  ],
  templateUrl: './update-blog-post-dialog.component.html',
  styleUrl: './update-blog-post-dialog.component.scss'
})
export class UpdateBlogPostDialogComponent implements OnInit {
  blogPostForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateBlogPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { blogId: string },
    private blogService: BlogService,
    private baseApiService: BaseApiService
  ) {
    this.blogPostForm = new FormGroup({
      Id: new FormControl('', Validators.required),
      TitleUz: new FormControl(''),
      TitleEn: new FormControl(''),
      TitleRu: new FormControl(''),
      TitleUzRu: new FormControl(''),
      DescriptionUz: new FormControl(''),
      DescriptionEn: new FormControl(''),
      DescriptionRu: new FormControl(''),
      DescriptionUzRu: new FormControl(''),
      Link: new FormControl(''),
      Photo: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.blogService.getBlogPostById(this.data.blogId).subscribe({
      next: (post) => {
        if (post) {
          this.blogPostForm.patchValue({
            Id: post.id,
            TitleUz: post.titleUz,
            TitleEn: post.titleEn,
            TitleRu: post.titleRu,
            TitleUzRu: post.titleUzRu,
            DescriptionUz: post.descriptionUz,
            DescriptionEn: post.descriptionEn,
            DescriptionRu: post.descriptionRu,
            DescriptionUzRu: post.descriptionUzRu,
            Link: post.link
          });
        }
      },
      error: (error) => {
        console.error('Error fetching blog post data:', error);
      }
    });
  }

  getPhoto(item: BlogPostResponse): string{
    return this.baseApiService.getPhoto(item.photo);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.blogPostForm.valid) {
      const updateRequest: UpdateBlogPostRequest = {
        Id: this.blogPostForm.get('Id')!.value,
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

      this.blogService.updateBlogPost(updateRequest).subscribe({
        next: () => {
          console.log('Blog post updated successfully!');
          this.dialogRef.close(true); // Pass true to indicate success
        },
        error: (error) => {
          console.error('Error updating blog post:', error);
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
