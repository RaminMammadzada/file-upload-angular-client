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
          res
        }
    );
  }

  public isSizeLimitExceeded(fileSize) {
    return fileSize > this.FILE_SIZE_LIMIT;
  }

  public isFileTypeAllowed(fileType) {
    return this.ALLOWED_FILE_TYPES.includes(fileType);
  }
}
