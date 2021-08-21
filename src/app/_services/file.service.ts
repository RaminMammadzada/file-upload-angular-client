import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl;
  files: File[] = [];

  constructor(private http: HttpClient) { }

  getAllFiles(): Observable<File[]> {
    if (this.files.length > 0) return of(this.files);
    return this.http.get<File[]>(this.baseUrl + 'files').pipe(
      map(files => {
        this.files = files;
        return files;
      })
    );
  }

  getFilesByType(type: string): Observable<File[]> {
    if (this.files.length > 0) return of(this.files);
    return this.http.get<File[]>(this.baseUrl + 'files').pipe(
      map(files => {
        const currentSelectedFiles = files.filter(file => file.type === type);
        this.files = currentSelectedFiles;
        return currentSelectedFiles;
      })
    );
  }
}
