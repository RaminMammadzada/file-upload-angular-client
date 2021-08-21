import { ALLOWED_FILE_TYPES, FILE_SIZE_LIMIT } from './../staticData';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { File } from '../_models/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl;
  files: File[] = [];

  public progress: number;
  public message: string;
  public FILE_SIZE_LIMIT: number = FILE_SIZE_LIMIT; // in KB
  public ALLOWED_FILE_TYPES = ALLOWED_FILE_TYPES;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  getAllFiles(): Observable<File[]> {
    if (this.files.length > 0) return of(this.files);
    return this.http.get<File[]>(this.baseUrl + 'api/fileItems').pipe(
      map(files => {
        this.files = files;
        return files;
      })
    );
  }

  getFilesByType(type: string): Observable<File[]> {
    if (this.files.length > 0) return of(this.files);
    return this.http.get<File[]>(this.baseUrl + 'api/fileItems').pipe(
      map(files => {
        const currentSelectedFiles = files.filter(file => file.fileType === type);
        this.files = currentSelectedFiles;
        return currentSelectedFiles;
      })
    );
  }

  public postFile = (file: File): void => {
    this.http.post(environment.apiUrl + 'api/fileItems', file)
        .subscribe(res => {
          console.log("This is the response after post file service method: ", res);
        }
    );
  }

  // this method is useless now
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
        // formData.append('file', fileToUpload);
    // formData.append('fileSize', fileToUpload, fileToUpload.size.toString());
    console.log("fileToUpload: ", fileToUpload);
    // console.log("Form data: ", formData);

    // if ( !this.isFileTypeAllowed(fileToUpload.type.split("/")[1]) ) {

    //   setTimeout(() => {
    //     this.message = '';
    //   }, 2000);
    //   this.message = 'This file type is not allowed!';

    //   return;
    // }

    // if ( this.isSizeLimitExceeded(fileToUpload.size) ) {

    //   setTimeout(() => {
    //     this.message = '';
    //   }, 2000);
    //   this.message = 'Size limit exceeded!';
    //   return;
    // }

    // this.http.post('https://localhost:5001/api/upload', formData, {reportProgress: true, observe: 'events'})
    this.http.post(environment.apiUrl + 'api/upload', formData, {reportProgress: true, observe: 'events'})
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
