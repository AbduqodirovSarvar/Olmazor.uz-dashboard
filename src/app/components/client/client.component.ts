import { Component } from '@angular/core';

export interface GetClientQuery {
  Id: string; // UUID for the client
}

export interface CreateClientRequest {
  Firstname?: string;
  FirstnameRu?: string;
  Lastname?: string;
  LastnameRu?: string;
  Phone?: string;
  Photo?: File; // Use `File` type for binary data
  PositionUz?: string;
  PositionEn?: string;
  PositionRu?: string;
  PositionUzRu?: string;
  CommentUz?: string;
  CommentEn?: string;
  CommentRu?: string;
  CommentUzRu?: string;
}

export interface UpdateClientRequest {
  Id: string; // Required field for updating a client
  Firstname?: string;
  FirstnameRu?: string;
  Lastname?: string;
  LastnameRu?: string;
  Phone?: string;
  Photo?: File; // Use `File` type for binary data
  PositionUz?: string;
  PositionEn?: string;
  PositionRu?: string;
  PositionUzRu?: string;
  CommentUz?: string;
  CommentEn?: string;
  CommentRu?: string;
  CommentUzRu?: string;
}

export interface DeleteClientRequest {
  Id: string;
}

export interface GetAllClientQuery {
  page?: number;       // For pagination
  pageSize?: number;   // For pagination
  search?: string;     // For search functionality
}

export interface ClientResponse {
  id: string; // UUID
  positionUz: string;
  positionEn: string;
  positionRu: string;
  positionUzRu: string;
  commentUz: string;
  commentEn: string;
  commentRu: string;
  commentUzRu: string;
  firstname: string;
  firstnameRu: string;
  lastname: string;
  lastnameRu: string;
  phone: string;
  photo: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {

}
