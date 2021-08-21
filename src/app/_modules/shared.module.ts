import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
  ],
  exports: [
    FileUploadModule,
  ]
})
export class SharedModule { }


