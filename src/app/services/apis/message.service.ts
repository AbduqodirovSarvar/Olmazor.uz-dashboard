import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface MessageResponse {
  id: string;
  email: string;
  name: string;
  subject: string;
  text: string;
  isSeen: boolean;
  isReplied: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface UpdateMessageRequest {
  id: string;
  email?: string;
  name?: string;
  subject?: string;
  text?: string;
  isSeen?: boolean;
  isReplied?: boolean;
}

export interface DeleteMessageRequest {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseMessageUrl = 'http://45.130.148.137:8080/api/Message';

  constructor(private http: HttpClient) {}

  getMessageById(id: string): Observable<MessageResponse> {
    const params = new HttpParams().set('Id', id);
    return this.http.get<MessageResponse>(`${this.baseMessageUrl}`, { params });
  }

  updateMessage(updateCommand: UpdateMessageRequest): Observable<MessageResponse> {
    return this.http.put<MessageResponse>(`${this.baseMessageUrl}`, updateCommand);
  }

  deleteMessage(deleteCommand: DeleteMessageRequest): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseMessageUrl}`, { body: deleteCommand });
  }

  getAllMessages(): Observable<MessageResponse[]> {
    return this.http.get<MessageResponse[]>(`${this.baseMessageUrl}/all`);
  }
}
