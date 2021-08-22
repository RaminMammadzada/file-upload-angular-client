import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left'
    }),
    BrowserAnimationsModule
  ],
  exports: [
    FileUploadModule,
    ToastrModule
  ]
})
export class SharedModule { }


