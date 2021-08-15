import { FileToCreate } from './_interfaces/fileToCreate.model';
import { User } from './_interfaces/file.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import bytesToSize from './helpers/bytesToSize';
import {FILE_SIZE_LIMIT, ALLOWED_FILE_TYPES} from './staticData';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public name: string;
  public fileSize: number;
  public fileName: string;
  public fileType: string;
  public file: FileToCreate;
  public files: File[] = [];
  public response: {filePath: '', fileSize: 0, fileName: '', fileType: ''};
  public bytesToSize;
  public allowedFileTypes;
  public fileSizeLimit;

  constructor(private http: HttpClient){
    this.bytesToSize = bytesToSize;
    this.allowedFileTypes = ALLOWED_FILE_TYPES;
    this.fileSizeLimit = FILE_SIZE_LIMIT;
  }

  ngOnInit(){
    this.getUsers();
  }

  public createFileRow = () => {
    this.file = {
      name: this.name,
      filePath: this.response.filePath,
      fileSize: this.response.fileSize,
      fileName: this.response.fileName,
      fileType: this.response.fileType,
      uploadDate: new Date()
    }

    console.log("this.file: ", this.file);

    this.http.post(environment.apiURL + 'api/files', this.file)
    .subscribe(res => {
      this.getUsers();

    });
  }

  private getUsers = () => {
    this.http.get(environment.apiURL + 'api/files')
    .subscribe(res => {
      this.files = res as File[];
    });
  }

  public emptyInput = () => {
    this.name = '';
    this.fileSize = 0;
    this.fileName = '';
    this.fileType = '';
  }

  public uploadFinished = (event) => {
    console.log("Event: ", event);
    this.response = {
      filePath: event.filePath,
      fileSize: event.file.length,
      fileName: event.file.fileName,
      fileType: event.file.contentType.split("/")[1]
    };
    console.log("this.response: ", this.response);

    this.createFileRow()
    this.emptyInput();
  }

  public createImgPath = (serverPath: string) => {
    return `${environment.apiURL}${serverPath}`;
  }
}
