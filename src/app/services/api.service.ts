import { AboutResponse, CreateAboutRequest, DeleteAboutRequest, GetAllAboutQuery, UpdateAboutRequest } from './../components/about/about.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogPostResponse, CreateBlogPostRequest, DeleteBlogPostCommand, GetAllBlogPostQuery, UpdateBlogPostRequest } from '../components/blog-post/blog-post.component';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LoginCommand } from '../auth/login/login.component';
import { CreateClientRequest, DeleteClientRequest, GetAllClientQuery, GetClientQuery, UpdateClientRequest } from '../components/client/client.component';
import { ContactResponse, CreateContactRequest, DeleteContactRequest, GetAllContactQuery, UpdateContactRequest } from '../components/contact/contact.component';

export interface EnumType {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApiUrl = 'http://45.130.148.137:8080/api';

  constructor(private http: HttpClient) {}

  // Authentication Services
  // Login --> Post
  signIn(loginCommand: LoginCommand): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/Auth/sign-in`, loginCommand);
  }

  // About Services
  // Create about --> Post
  createAbout(createAboutRequest: CreateAboutRequest): Observable<any> {
    const formData = new FormData();
    formData.append('AddressUz', createAboutRequest.AddressUz);
    formData.append('AddressEn', createAboutRequest.AddressEn);
    formData.append('AddressRu', createAboutRequest.AddressRu);
    formData.append('AddressUzRu', createAboutRequest.AddressUzRu);
    formData.append('TitleUz', createAboutRequest.TitleUz);
    formData.append('TitleEn', createAboutRequest.TitleEn);
    formData.append('TitleRu', createAboutRequest.TitleRu);
    formData.append('TitleUzRu', createAboutRequest.TitleUzRu);
    formData.append('DescriptionUz', createAboutRequest.DescriptionUz);
    formData.append('DescriptionEn', createAboutRequest.DescriptionEn);
    formData.append('DescriptionRu', createAboutRequest.DescriptionRu);
    formData.append('DescriptionUzRu', createAboutRequest.DescriptionUzRu);
    formData.append('DescriptionFooterUz', createAboutRequest.DescriptionFooterUz);
    formData.append('DescriptionFooterEn', createAboutRequest.DescriptionFooterEn);
    formData.append('DescriptionFooterRu', createAboutRequest.DescriptionFooterRu);
    formData.append('DescriptionFooterUzRu', createAboutRequest.DescriptionFooterUzRu);
    formData.append('Experience', createAboutRequest.Experience.toString());
    formData.append('Photo', createAboutRequest.Photo);

    return this.http.post(`${this.baseApiUrl}/About`, formData);
  }

  // Update about --> Put
  updateAbout(about: UpdateAboutRequest): Observable<any> {
    const formData = new FormData();

    if (about.Id) formData.append('Id', about.Id);
    if (about.AddressUz) formData.append('AddressUz', about.AddressUz);
    if (about.AddressEn) formData.append('AddressEn', about.AddressEn);
    if (about.AddressRu) formData.append('AddressRu', about.AddressRu);
    if (about.AddressUzRu) formData.append('AddressUzRu', about.AddressUzRu);
    if (about.TitleUz) formData.append('TitleUz', about.TitleUz);
    if (about.TitleEn) formData.append('TitleEn', about.TitleEn);
    if (about.TitleRu) formData.append('TitleRu', about.TitleRu);
    if (about.TitleUzRu) formData.append('TitleUzRu', about.TitleUzRu);
    if (about.DescriptionUz) formData.append('DescriptionUz', about.DescriptionUz);
    if (about.DescriptionEn) formData.append('DescriptionEn', about.DescriptionEn);
    if (about.DescriptionRu) formData.append('DescriptionRu', about.DescriptionRu);
    if (about.DescriptionUzRu) formData.append('DescriptionUzRu', about.DescriptionUzRu);
    if (about.DescriptionFooterUz) formData.append('DescriptionFooterUz', about.DescriptionFooterUz);
    if (about.DescriptionFooterEn) formData.append('DescriptionFooterEn', about.DescriptionFooterEn);
    if (about.DescriptionFooterRu) formData.append('DescriptionFooterRu', about.DescriptionFooterRu);
    if (about.DescriptionFooterUzRu) formData.append('DescriptionFooterUzRu', about.DescriptionFooterUzRu);
    if (about.Experience !== undefined) formData.append('Experience', about.Experience.toString()); // Convert to string
    if (about.Photo instanceof File) formData.append('Photo', about.Photo);

    return this.http.put(`${this.baseApiUrl}/About`, formData).pipe(
      tap(response => console.log('Update response:', response)),
      catchError(error => {
        console.error('Update error:', error);
        return throwError(error);
      })
    );
  }

  // Delete about --> Delete
  deleteAbout(deleteCommand: DeleteAboutRequest): Observable<boolean> {
    return this.http.request<boolean>('DELETE', `${this.baseApiUrl}/About`, {
      body: deleteCommand,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Get about --> Get
  getAboutById(id: string): Observable<AboutResponse> {
    return this.http.get<AboutResponse>(`${this.baseApiUrl}/About`, { params: { Id: id } });
  }

  // Get all about --> Get
  getAllAbout(query: GetAllAboutQuery): Observable<any> {
    let params = new HttpParams();

    if (query.search) {
      params = params.append('search', query.search);
    }
    if (query.page !== undefined) {
      params = params.append('page', query.page.toString());
    }
    if (query.pageSize !== undefined) {
      params = params.append('pageSize', query.pageSize.toString());
    }

    return this.http.get(`${this.baseApiUrl}/About/all`, { params });
  }


  // BlogPost Services
  // Create a new blog post --> Post
  createBlogPost(blogPostRequest: CreateBlogPostRequest): Observable<BlogPostResponse> {
    const formData = new FormData();
    formData.append('TitleUz', blogPostRequest.TitleUz);
    formData.append('TitleEn', blogPostRequest.TitleEn);
    formData.append('TitleRu', blogPostRequest.TitleRu);
    formData.append('TitleUzRu', blogPostRequest.TitleUzRu);
    formData.append('DescriptionUz', blogPostRequest.DescriptionUz);
    formData.append('DescriptionEn', blogPostRequest.DescriptionEn);
    formData.append('DescriptionRu', blogPostRequest.DescriptionRu);
    formData.append('DescriptionUzRu', blogPostRequest.DescriptionUzRu);
    formData.append('Link', blogPostRequest.Link);
    formData.append('Photo', blogPostRequest.Photo);

    return this.http.post<BlogPostResponse>(`${this.baseApiUrl}/BlogPost`, formData);
  }

  // Update Blog Post  --> Put
  updateBlogPost(updateBlogPostRequest: UpdateBlogPostRequest): Observable<BlogPostResponse> {
    const formData = new FormData();
    formData.append('Id', updateBlogPostRequest.Id);
    if (updateBlogPostRequest.TitleUz) formData.append('TitleUz', updateBlogPostRequest.TitleUz);
    if (updateBlogPostRequest.TitleEn) formData.append('TitleEn', updateBlogPostRequest.TitleEn);
    if (updateBlogPostRequest.TitleRu) formData.append('TitleRu', updateBlogPostRequest.TitleRu);
    if (updateBlogPostRequest.TitleUzRu) formData.append('TitleUzRu', updateBlogPostRequest.TitleUzRu);
    if (updateBlogPostRequest.DescriptionUz) formData.append('DescriptionUz', updateBlogPostRequest.DescriptionUz);
    if (updateBlogPostRequest.DescriptionEn) formData.append('DescriptionEn', updateBlogPostRequest.DescriptionEn);
    if (updateBlogPostRequest.DescriptionRu) formData.append('DescriptionRu', updateBlogPostRequest.DescriptionRu);
    if (updateBlogPostRequest.DescriptionUzRu) formData.append('DescriptionUzRu', updateBlogPostRequest.DescriptionUzRu);
    if (updateBlogPostRequest.Link) formData.append('Link', updateBlogPostRequest.Link);
    if (updateBlogPostRequest.Photo) formData.append('Photo', updateBlogPostRequest.Photo);

    return this.http.put<BlogPostResponse>(`${this.baseApiUrl}/BlogPost`, formData);
  }

  // Delete a blog post --> Delete
  deleteBlogPost(deleteBlogPostCommand: DeleteBlogPostCommand): Observable<any> {
    return this.http.delete(`${this.baseApiUrl}/BlogPost`, {
      body: deleteBlogPostCommand
    });
  }

  // Get a blog post --> Get
  getBlogPostById(id: string): Observable<BlogPostResponse> {
    let params = new HttpParams().set('Id', id);
    return this.http.get<BlogPostResponse>(`${this.baseApiUrl}/BlogPost`, { params });
  }

  // Get all blog posts --> Get
  getAllBlogPosts(queryParams: GetAllBlogPostQuery): Observable<any> {
    let params = new HttpParams();
    if (queryParams.page) {
      params = params.set('page', queryParams.page.toString());
    }
    if (queryParams.pageSize) {
      params = params.set('pageSize', queryParams.pageSize.toString());
    }
    if (queryParams.search) {
      params = params.set('search', queryParams.search);
    }

    return this.http.get(`${this.baseApiUrl}/BlogPost/all`, { params });
  }


  // Clients
  // Get Client --> Get
  getClient(query: GetClientQuery): Observable<any> {
    let params = new HttpParams().set('Id', query.Id);

    return this.http.get(`${this.baseApiUrl}/Client`, { params });
  }

  // Get all Client --> Get
  getAllClients(queryParams: GetAllClientQuery): Observable<any> {
    let params = new HttpParams();

    // Append query parameters
    if (queryParams.page !== undefined) {
      params = params.set('page', queryParams.page.toString());
    }
    if (queryParams.pageSize !== undefined) {
      params = params.set('pageSize', queryParams.pageSize.toString());
    }
    if (queryParams.search) {
      params = params.set('search', queryParams.search);
    }

    return this.http.get(`${this.baseApiUrl}/Client/all`, { params });
  }

  // Create Client --> Post
  createClient(client: CreateClientRequest): Observable<any> {
    const formData = new FormData();

    if (client.Firstname) formData.append('Firstname', client.Firstname);
    if (client.FirstnameRu) formData.append('FirstnameRu', client.FirstnameRu);
    if (client.Lastname) formData.append('Lastname', client.Lastname);
    if (client.LastnameRu) formData.append('LastnameRu', client.LastnameRu);
    if (client.Phone) formData.append('Phone', client.Phone);
    if (client.Photo) formData.append('Photo', client.Photo);
    if (client.PositionUz) formData.append('PositionUz', client.PositionUz);
    if (client.PositionEn) formData.append('PositionEn', client.PositionEn);
    if (client.PositionRu) formData.append('PositionRu', client.PositionRu);
    if (client.PositionUzRu) formData.append('PositionUzRu', client.PositionUzRu);
    if (client.CommentUz) formData.append('CommentUz', client.CommentUz);
    if (client.CommentEn) formData.append('CommentEn', client.CommentEn);
    if (client.CommentRu) formData.append('CommentRu', client.CommentRu);
    if (client.CommentUzRu) formData.append('CommentUzRu', client.CommentUzRu);

    return this.http.post(`${this.baseApiUrl}/Client`, formData);
  }

  // Update Client --> Put
  updateClient(client: UpdateClientRequest): Observable<any> {
    const formData = new FormData();

    formData.append('Id', client.Id);
    if (client.Firstname) formData.append('Firstname', client.Firstname);
    if (client.FirstnameRu) formData.append('FirstnameRu', client.FirstnameRu);
    if (client.Lastname) formData.append('Lastname', client.Lastname);
    if (client.LastnameRu) formData.append('LastnameRu', client.LastnameRu);
    if (client.Phone) formData.append('Phone', client.Phone);
    if (client.Photo) formData.append('Photo', client.Photo);
    if (client.PositionUz) formData.append('PositionUz', client.PositionUz);
    if (client.PositionEn) formData.append('PositionEn', client.PositionEn);
    if (client.PositionRu) formData.append('PositionRu', client.PositionRu);
    if (client.PositionUzRu) formData.append('PositionUzRu', client.PositionUzRu);
    if (client.CommentUz) formData.append('CommentUz', client.CommentUz);
    if (client.CommentEn) formData.append('CommentEn', client.CommentEn);
    if (client.CommentRu) formData.append('CommentRu', client.CommentRu);
    if (client.CommentUzRu) formData.append('CommentUzRu', client.CommentUzRu);

    return this.http.put(`${this.baseApiUrl}/Client`, formData);
  }

  // Delete a client --> Delete
  deleteClient(clientId: string): Observable<any> {
    const deleteClientCommand: DeleteClientRequest = {
      Id: clientId
    };

    return this.http.delete(`${this.baseApiUrl}/Client`, {
      body: deleteClientCommand,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  // Enums --> Get
  getEnums(): Observable<EnumType> {
    return this.http.get<EnumType>(`${this.baseApiUrl}/enums`);
  }

  // Contact Services
  // Get Contact --> Get
  getContactById(id: string): Observable<ContactResponse> {
    const params = new HttpParams().set('Id', id);

    return this.http.get<ContactResponse>(`${this.baseApiUrl}/Contact`, { params });
  }

  // Get all Contact --> Get
  getAllContacts(queryParams: GetAllContactQuery): Observable<any> {
    let params = new HttpParams();

    // Append query parameters individually
    if (queryParams.name !== undefined) {
      params = params.set('name', queryParams.name);
    }
    if (queryParams.link !== undefined) {
      params = params.set('link', queryParams.link);
    }

    return this.http.get(`${this.baseApiUrl}/Contact/all`, { params });
}


  // Create Contact --> Post
  createContact(contact: CreateContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.baseApiUrl}/Contact`, contact);
  }

  // Update Contact --> Put
  updateContact(contact: UpdateContactRequest): Observable<ContactResponse> {
    return this.http.put<ContactResponse>(`${this.baseApiUrl}/Contact`, contact);
  }

  // Delete a contact --> Delete
  deleteContact(contact: DeleteContactRequest): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseApiUrl}/Contact`, { body: contact });
  }


}
