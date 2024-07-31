import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProjectResponse, ProjectService, UpdateProjectRequest } from 'src/app/services/apis/project.service';
import { TranslationPipe } from 'src/app/services/translation.pipe';

@Component({
  selector: 'app-update-project-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule,
    TranslationPipe
  ],
  templateUrl: './update-project-dialog.component.html',
  styleUrls: ['./update-project-dialog.component.scss']
})
export class UpdateProjectDialogComponent implements OnInit {
  projectForm!: FormGroup;
  selectedFileName: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string },
    private projectService: ProjectService
  ) {
    this.projectForm = new FormGroup({
      Id: new FormControl('', Validators.required),
      NameUz: new FormControl(''),
      NameEn: new FormControl(''),
      NameRu: new FormControl(''),
      NameUzRu: new FormControl(''),
      DescriptionUz: new FormControl(''),
      DescriptionEn: new FormControl(''),
      DescriptionRu: new FormControl(''),
      DescriptionUzRu: new FormControl(''),
      Link: new FormControl(''),
      Photo: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.projectService.getProjectById(this.data.projectId).subscribe({
      next: (project) => {
        if (project) {
          this.projectForm.patchValue({
            Id: project.id,
            NameUz: project.nameUz,
            NameEn: project.nameEn,
            NameRu: project.nameRu,
            NameUzRu: project.nameUzRu,
            DescriptionUz: project.descriptionUz,
            DescriptionEn: project.descriptionEn,
            DescriptionRu: project.descriptionRu,
            DescriptionUzRu: project.descriptionUzRu,
            Link: project.link
          });
        }
      },
      error: (error) => {
        console.error('Error fetching project data:', error);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const updateRequest: UpdateProjectRequest = {
        Id: this.projectForm.get('Id')!.value,
        NameUz: this.projectForm.get('NameUz')?.value,
        NameEn: this.projectForm.get('NameEn')?.value,
        NameRu: this.projectForm.get('NameRu')?.value,
        NameUzRu: this.projectForm.get('NameUzRu')?.value,
        DescriptionUz: this.projectForm.get('DescriptionUz')?.value,
        DescriptionEn: this.projectForm.get('DescriptionEn')?.value,
        DescriptionRu: this.projectForm.get('DescriptionRu')?.value,
        DescriptionUzRu: this.projectForm.get('DescriptionUzRu')?.value,
        Link: this.projectForm.get('Link')?.value,
        Photo: this.projectForm.get('Photo')?.value
      };

      this.projectService.updateProject(updateRequest).subscribe({
        next: () => {
          console.log('Project updated successfully!');
          this.dialogRef.close(true); // Pass true to indicate success
        },
        error: (error) => {
          console.error('Error updating project:', error);
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
