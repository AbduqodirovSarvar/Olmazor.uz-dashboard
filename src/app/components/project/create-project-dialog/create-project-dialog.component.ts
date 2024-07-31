import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProjectService, CreateProjectRequest } from 'src/app/services/apis/project.service';
import { TranslationPipe } from 'src/app/services/translation.pipe';

@Component({
  selector: 'app-create-project-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.scss']
})
export class CreateProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialogComponent>,
    private projectService: ProjectService
  ) {
    this.projectForm = new FormGroup({
      NameUz: new FormControl('', Validators.required),
      NameEn: new FormControl('', Validators.required),
      NameRu: new FormControl('', Validators.required),
      NameUzRu: new FormControl('', Validators.required),
      DescriptionUz: new FormControl('', Validators.required),
      DescriptionEn: new FormControl('', Validators.required),
      DescriptionRu: new FormControl('', Validators.required),
      DescriptionUzRu: new FormControl('', Validators.required),
      Link: new FormControl('', Validators.required),
      Photo: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const createRequest: CreateProjectRequest = {
        NameUz: this.projectForm.get('NameUz')!.value,
        NameEn: this.projectForm.get('NameEn')!.value,
        NameRu: this.projectForm.get('NameRu')!.value,
        NameUzRu: this.projectForm.get('NameUzRu')!.value,
        DescriptionUz: this.projectForm.get('DescriptionUz')!.value,
        DescriptionEn: this.projectForm.get('DescriptionEn')!.value,
        DescriptionRu: this.projectForm.get('DescriptionRu')!.value,
        DescriptionUzRu: this.projectForm.get('DescriptionUzRu')!.value,
        Link: this.projectForm.get('Link')!.value,
        Photo: this.projectForm.get('Photo')!.value
      };

      this.projectService.createProject(createRequest).subscribe({
        next: () => {
          console.log('Project created successfully!');
          this.dialogRef.close(true); // Pass true to indicate success
        },
        error: (error) => {
          console.error('Error creating project:', error);
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.projectForm.patchValue({ Photo: file });
      this.selectedFileName = file.name;
    }
  }
}
