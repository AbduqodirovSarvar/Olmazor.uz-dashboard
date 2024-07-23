import { Component } from '@angular/core';

export interface CreateAboutRequest {
  AddressUz: string;
  AddressEn: string;
  AddressRu: string;
  AddressUzRu: string;
  TitleUz: string;
  TitleEn: string;
  TitleRu: string;
  TitleUzRu: string;
  DescriptionUz: string;
  DescriptionEn: string;
  DescriptionRu: string;
  DescriptionUzRu: string;
  DescriptionFooterUz: string;
  DescriptionFooterEn: string;
  DescriptionFooterRu: string;
  DescriptionFooterUzRu: string;
  Experience: number;
  Photo: File;
}

export interface UpdateAboutRequest {
  Id: string;
  AddressUz?: string;
  AddressEn?: string;
  AddressRu?: string;
  AddressUzRu?: string;
  TitleUz?: string;
  TitleEn?: string;
  TitleRu?: string;
  TitleUzRu?: string;
  DescriptionUz?: string;
  DescriptionEn?: string;
  DescriptionRu?: string;
  DescriptionUzRu?: string;
  DescriptionFooterUz?: string;
  DescriptionFooterEn?: string;
  DescriptionFooterRu?: string;
  DescriptionFooterUzRu?: string;
  Experience?: number;
  Photo?: File; // Use File type for handling file uploads
}

export interface DeleteAboutRequest {
  Id: string;
}

export interface GetAllAboutQuery {
  search?: string; // Optional search term
  page?: number;  // Page number for pagination
  pageSize?: number; // Number of items per page
}

export interface AboutResponse {
  id: string;
  addressUz: string;
  addressEn: string;
  addressRu: string;
  addressUzRu: string;
  titleUz: string;
  titleEn: string;
  titleRu: string;
  titleUzRu: string;
  descriptionUz: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionUzRu: string;
  descriptionFooterUz: string;
  descriptionFooterEn: string;
  descriptionFooterRu: string;
  descriptionFooterUzRu: string;
  experience: number;
  photo: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
