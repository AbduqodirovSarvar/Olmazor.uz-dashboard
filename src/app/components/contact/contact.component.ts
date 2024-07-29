import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ContactService, ContactResponse, CreateContactRequest } from 'src/app/services/apis/contact.service';
import { BaseApiService, EnumResponse } from 'src/app/services/apis/base.api.service';
import { UpdateContactDialogComponent } from './update-contact-dialog/update-contact-dialog.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactTypes: EnumResponse[] = [];
  contacts: ContactResponse[] = [];
  contactForm: FormGroup;

  constructor(
    private baseApiService: BaseApiService,
    private contactService: ContactService,
    private dialog: MatDialog
  ) {
    this.contactForm = new FormGroup({
      query: new FormControl('')
    });

    this.baseApiService.getCommunications().subscribe({
      next: (types: EnumResponse[]) => {
        this.contactTypes = types;
      },
      error: (error) => {
        console.error('Error fetching contact types:', error);
      }
    });
  }

  ngOnInit(): void {
    this.loadContacts();
    this.contactForm.get('query')?.valueChanges.subscribe({
      next: (searchText: string) => this.filterContacts(searchText),
      error: (error) => console.error('Error:', error)
    });
  }

  loadContacts(): void {
    this.contactService.getAllContacts().subscribe({
      next: (contacts: ContactResponse[]) => {
        this.contacts = [];
        const existingContacts = contacts;

        this.contactTypes.forEach(item => {
          const existingContact = existingContacts.find(x => x.name === item.id);
          if (existingContact) {
            this.contacts.push(existingContact);
          } else {
            const createContactRequest: CreateContactRequest = {
              name: item.id,
              link: 'http://localhost'
            };
            this.contactService.createContact(createContactRequest).subscribe({
              next: (createdContact: ContactResponse) => this.contacts.push(createdContact),
              error: (error) => console.error('Error creating contact:', error)
            });
          }
        });
      },
      error: (error) => console.error('Error fetching contacts:', error)
    });
  }

  filterContacts(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.contacts = this.contacts.filter(contact =>
      (contact.link && contact.link.toLowerCase().includes(lowerQuery))
    );
  }

  getEnumName(id: number): string | undefined {
    return this.contactTypes.find(x => x.id === id)?.name;
  }

  onEditContact(contactId: string): void {
    this.dialog.open(UpdateContactDialogComponent, { data: { contactId: contactId } }).afterClosed().subscribe({
      next: () => this.loadContacts(),
      error: (error) => console.error('Error:', error)
    });
    console.log('Edit contact:', contactId);
  }
}
