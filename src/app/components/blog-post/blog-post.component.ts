import { Component } from '@angular/core';

export interface BlogPostResponse {
  id: string;
  titleUz: string;
  titleEn: string;
  titleRu: string;
  titleUzRu: string;
  descriptionUz: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionUzRu: string;
  link: string;
  photo: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface CreateBlogPostRequest {
  TitleUz: string;
  TitleEn: string;
  TitleRu: string;
  TitleUzRu: string;
  DescriptionUz: string;
  DescriptionEn: string;
  DescriptionRu: string;
  DescriptionUzRu: string;
  Link: string;
  Photo: File;
}

export interface UpdateBlogPostRequest {
  Id: string;
  TitleUz?: string;
  TitleEn?: string;
  TitleRu?: string;
  TitleUzRu?: string;
  DescriptionUz?: string;
  DescriptionEn?: string;
  DescriptionRu?: string;
  DescriptionUzRu?: string;
  Link?: string;
  Photo?: File; // For the "binary" format
}

export interface DeleteBlogPostCommand {
  Id: string;
}

export interface GetAllBlogPostQuery {
  page?: number;
  pageSize?: number;
  search?: string;
}


@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {

}
