import { ALLOWED_FILE_TYPES, FILE_SIZE_LIMIT } from './../staticData';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
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
    return this.http.get<File[]>(environment.apiUrl + 'api/fileItems');
  }

  public postFile = (file: File): Observable<File> => {
    return this.http.post<File>(environment.apiUrl + 'api/fileItems', file);
  }
}
