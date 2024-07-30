import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MessageResponse, MessageService, UpdateMessageRequest } from 'src/app/services/apis/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  items: MessageResponse[] = [];
  filteredItems: MessageResponse[] = [];
  searchtext: string = '';
  messageForm: FormGroup;

  constructor(private messageService: MessageService) {
    this.messageForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.loadMessages();
    this.messageForm.get('query')?.valueChanges.subscribe(query => {
      this.filterMessages(query);
    });
  }

  markAsRead(messageId: string): void {
    const updateMessageRequest: UpdateMessageRequest = {
      id: messageId,
      isSeen: true
    };

    this.messageService.updateMessage(updateMessageRequest).subscribe({
      next: () => {
        console.log('Message marked as seen:', messageId);
        this.loadMessages();
      },
      error: (error) => {
        console.error('Error marking message as seen:', error);
      }
    });
  }

  markAllAsRead(): void {
    const unreadItems = this.items.filter(item => !item.isSeen);
    unreadItems.forEach(item => this.markAsRead(item.id));
  }

  deleteMessage(id: string): void {
    this.messageService.deleteMessage({ id }).subscribe({
      next: () => {
        console.log('Message deleted:', id);
        // Remove the deleted message from the local array
        this.items = this.items.filter(item => item.id !== id);
        this.filteredItems = this.filteredItems.filter(item => item.id !== id);
      },
      error: (error) => {
        console.error('Error deleting message:', error);
      }
    });
  }

  loadMessages(): void {
    this.messageService.getAllMessages().subscribe({
      next: (messages) => {
        this.items = messages;
        this.filteredItems = messages;
      },
      error: (error) => {
        console.error('Error loading messages:', error);
      }
    });
  }

  filterMessages(query: string): void {
    if (query) {
      this.filteredItems = this.items.filter(item =>
        item.email.toLowerCase().includes(query.toLowerCase()) ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subject.toLowerCase().includes(query.toLowerCase()) ||
        item.text.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.filteredItems = this.items;
    }
  }
}
