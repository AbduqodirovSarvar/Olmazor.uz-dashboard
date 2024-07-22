import { Component, NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-home-slide',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule
  ],
  templateUrl: './home-slide.component.html',
  styleUrl: './home-slide.component.scss'
})
export class HomeSlideComponent {
  items = [
    {
      title: 'Item 1',
      description: 'Description for item 1',
      image: 'assets/images/item1.jpg'
    },
    {
      title: 'Item 2',
      description: 'Description for item 2',
      image: 'assets/images/item2.jpg'
    },
    {
      title: 'Item 3',
      description: 'Description for item 3',
      image: 'assets/images/item3.jpg'
    }
  ];

  filteredItems = this.items;

  onSearch(query: string) {
    this.filteredItems = this.items.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  onCreateNewItem() {
    // Logic to create a new item
    alert('Create new item functionality not implemented yet.');
  }
}
