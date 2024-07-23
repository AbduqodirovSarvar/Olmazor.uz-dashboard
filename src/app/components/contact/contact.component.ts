import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnumType } from 'src/app/services/api.service';

export interface ContactResponse {
  name: string; // Assuming name should be a string based on context
  link: string; // Represents a phone number or a URL
  createdBy: string; // UUID of the user who created the record
  createdAt: string; // ISO 8601 date string
  updatedBy: string; // UUID of the user who last updated the record
  updatedAt: string; // ISO 8601 date string
  id: string; // UUID of the contact
}

export interface CreateContactRequest {
  name: string; // Name of the contact
  link: string; // Phone number or URL
}

export interface UpdateContactRequest {
  id: string; // Unique identifier for the contact
  name?: string; // Name of the contact (optional for updates)
  link?: string; // Phone number or URL (optional for updates)
}

export interface DeleteContactRequest {
  id: string; // Unique identifier for the contact to be deleted
}

export interface GetAllContactQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  name?: string;
  link?: string;
}




@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

contactTypes: EnumType[] = [
  {
    id: 1,
    name: "Phone"
  },
  {
    id: 2,
    name: "Email"
  },
  {
    id: 3,
    name: "Telegram"
  },
  {
    id: 4,
    name: "Instagram"
  },
  {
    id: 5,
    name: "Facebook"
  },
  {
    id: 6,
    name: "Twitter"
  },
  {
    id: 7,
    name: "Github"
  },
  {
    id: 8,
    name: "Website"
  }
];


}
