import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseApiService, EnumResponse } from 'src/app/services/apis/base.api.service';
import { ContactResponse, ContactService } from 'src/app/services/apis/contact.service';

@Component({
  selector: 'app-update-contact-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './update-contact-dialog.component.html',
  styleUrls: ['./update-contact-dialog.component.scss']
})
export class UpdateContactDialogComponent implements OnInit {
  contactForm!: FormGroup;
  contactEnums: EnumResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateContactDialogComponent>,
    private contactService: ContactService,
    private baseApiService: BaseApiService,
    @Inject(MAT_DIALOG_DATA) public data: { contactId: string }
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadContactEnums();
    this.loadContactData();
  }

  private initializeForm(): void {
    this.contactForm = new FormGroup({
      Id: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Link: new FormControl('')
    });
  }

  private loadContactEnums(): void {
    this.baseApiService.getCommunications().subscribe({
      next: (response: EnumResponse[]) => {
        this.contactEnums = response;
      },
      error: (error) => {
        console.error('Error fetching contact enums:', error);
      }
    });
  }

  private loadContactData(): void {
    this.contactService.getContactById(this.data.contactId).subscribe({
      next: (response: ContactResponse) => {
        this.contactForm.patchValue({
          Id: response.id,
          Name: response.name,
          Link: response.link
        });
      },
      error: (error) => {
        console.error('Error fetching contact data:', error);
      }
    });
  }

  getEnumName(): string | undefined {
    return this.contactEnums.find(x => x.id === this.contactForm.get('Name')?.value)?.name ?? "Undefined";
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const updateContactRequest = {
        id: this.contactForm.value.Id,
        name: this.contactForm.value.Name,
        link: this.contactForm.value.Link
      };

      this.contactService.updateContact(updateContactRequest).subscribe({
        next: () => {
          console.log('Contact updated successfully');
          this.dialogRef.close(true); // Close dialog and signal success
        },
        error: (error) => {
          console.error('Error updating contact:', error);
        }
      });
    }
  }
}
