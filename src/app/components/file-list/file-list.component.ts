import { ALLOWED_FILE_TYPES } from './../../staticData';
import { FileService } from './../../_services/file.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  ALLOWED_FILE_TYPES;

  constructor() { }

  ngOnInit(): void {
    // this.files$ = this.fileService.getAllFiles();
  }

}
