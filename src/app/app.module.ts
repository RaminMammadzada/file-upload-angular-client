import { SharedModule } from './_modules/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { ViewFilesComponent } from './components/view-files/view-files.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    UploadFilesComponent,
    ViewFilesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
