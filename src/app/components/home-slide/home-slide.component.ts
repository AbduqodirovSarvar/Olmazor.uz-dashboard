import { Component, NgModule, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { DeleteHomePostRequest, HomePostResponse, HomepostService } from 'src/app/services/apis/homepost.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { UpdateDialogComponent } from './update-dialog/update-dialog.component';

@Component({
  selector: 'app-home-slide',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule, // Added ReactiveFormsModule
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    CommonModule
  ],
  templateUrl: './home-slide.component.html',
  styleUrls: ['./home-slide.component.scss']
})
export class HomeSlideComponent implements OnInit {

  items: HomePostResponse[] = [];
  filteredItems: HomePostResponse[] = [];

  constructor(
    private homepostService: HomepostService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadHomePosts();
  }

  onCreateNewItem() {
    console.log('onCreateNewItem');
    this.dialog.open(CreateDialogComponent).afterClosed().subscribe({
      next: () => {
          this.loadHomePosts();
      }
    });
  }

  onEditItem(postId: string): void {
    console.log('onEditItem:', postId);
    this.dialog.open(UpdateDialogComponent, {data: {postId: postId} }).afterClosed().subscribe({
      next: () => {
        this.loadHomePosts();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  deletePost(postId: string): void {
    const deletePostRequest: DeleteHomePostRequest = {
      Id: postId,
    };

    this.homepostService.deleteHomePost(deletePostRequest).subscribe(
      {
        next: () => {
          console.log('Post deleted successfully');
          this.loadHomePosts();
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
    );
  }


  loadHomePosts(): void {
    this.homepostService.getAllHomePosts().subscribe(
      {
        next: (data) => {
          this.items = data;
          this.filteredItems = data;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      }
    );
  }

  onSearch(query: string): void {
    this.filteredItems = this.items.filter(item =>
      item.titleUz.toLowerCase().includes(query.toLowerCase()) ||
      item.titleEn.toLowerCase().includes(query.toLowerCase()) ||
      item.titleRu.toLowerCase().includes(query.toLowerCase()) ||
      item.titleUzRu.toLowerCase().includes(query.toLowerCase()) ||
      item.descriptionUz.toLowerCase().includes(query.toLowerCase()) ||
      item.descriptionEn.toLowerCase().includes(query.toLowerCase()) ||
      item.descriptionRu.toLowerCase().includes(query.toLowerCase()) ||
      item.descriptionUzRu.toLowerCase().includes(query.toLowerCase())
    );
  }
}
