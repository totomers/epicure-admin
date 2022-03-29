import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IChef } from 'src/app/interfaces/chef.interface';
import { ChefService } from 'src/app/services/chef.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-chef-form',
  templateUrl: './add-edit-chef-form.component.html',
  styleUrls: ['./add-edit-chef-form.component.scss'],
})
export class AddEditChefFormComponent implements OnInit {
  chef: IChef | null;
  form: FormGroup;
  serverUrl = environment.serverUrl;
  currentImageUrl: string | undefined;
  defaultImage =
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E';
  constructor(
    private fb: FormBuilder,
    private chefService: ChefService,

    private uploadService: UploadService,
    public dialogRef: MatDialogRef<AddEditChefFormComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { chef: IChef | null }
  ) {}

  ngOnInit(): void {
    this.chef = this.data.chef;

    this.currentImageUrl = this.data.chef?.url || this.defaultImage;
    this.form = this.fb.group({
      name: [
        this.chef?.name || '',
        [Validators.min(1), Validators.max(20), Validators.required],
      ],
      descr: [this.chef?.descr || '', [Validators.max(1000)]],
      url: [this.chef?.url || ''],
    });
  }

  get fc() {
    return this.form.controls;
  }

  updateChef() {
    const chefId = this.data.chef?._id!;
    const updates = this.form.getRawValue();
    this.chefService.updateChefServer(chefId, updates);
    this.dialogRef.close('Updated Chef Succesfully');
  }
  createChef() {
    const chef = this.form.getRawValue();
    this.chefService.createChefServer(chef);
    this.dialogRef.close('Created Chef Succesfully');
  }

  async uploadFile(e: any) {
    e.preventDefault();
    const file = e.target.files[0];
    try {
      const imageUrl = await this.uploadService.uploadImage(file);
      //@ts-ignore
      this.currentImageUrl = imageUrl;
      this.fc['url'].setValue(imageUrl);
    } catch (error) {
      console.log(`error`, error);
    }
  }
}
