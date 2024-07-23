import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface ContactType {
  id: number;
  name: string;
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

contactTypes: ContactType[] = [
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
