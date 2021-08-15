import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {FILE_SIZE_LIMIT, ALLOWED_FILE_TYPES} from '../staticData';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;
  public FILE_SIZE_LIMIT: number = FILE_SIZE_LIMIT; // in KB
  public ALLOWED_FILE_TYPES = ALLOWED_FILE_TYPES;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }
  ngOnInit() {
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    // formData.append('fileSize', fileToUpload, fileToUpload.size.toString());
    console.log("fileToUpload: ", fileToUpload);
    // console.log("Form data: ", formData);

    if ( !this.isFileTypeAllowed(fileToUpload.type.split("/")[1]) ) {

      setTimeout(() => {
        this.message = '';
      }, 2000);
      this.message = 'This file type is not allowed!';

      return;
    }

    if ( this.isSizeLimitExceeded(fileToUpload.size) ) {

      setTimeout(() => {
        this.message = '';
      }, 2000);
      this.message = 'Size limit exceeded!';
      return;
    }

    // this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
    this.http.post(environment.apiURL + 'api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe( (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.onUploadFinished.emit(event.body);
        }

        setTimeout(() => {
          this.message = '';
          this.progress = 0;
        }, 2000);
        this.message = 'Upload success'
      });
  }

  public isSizeLimitExceeded(fileSize) {
    return fileSize > this.FILE_SIZE_LIMIT;
  }

  public isFileTypeAllowed(fileType) {
    return this.ALLOWED_FILE_TYPES.includes(fileType);
  }
}
