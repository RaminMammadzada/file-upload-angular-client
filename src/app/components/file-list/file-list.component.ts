import { FileService } from './../../_services/file.service';
import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from 'src/app/_models/file.model';
import { ALLOWED_FILE_TYPES } from 'src/app/staticData';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit{
  public ALLOWED_FILE_TYPES: string[] = [];
  @Input() files: File[];
  public filesHashmap: {};

  constructor() {
    this.ALLOWED_FILE_TYPES = ALLOWED_FILE_TYPES;
  }

  // createCustomObjectBasedOnFiletype() {
  //   let filesHashmap = this.files.reduce(function(map, obj) {
  //     map[obj.fileType] = obj;
  //     return map;
  //   }, {});
  //   this.filesHashmap = filesHashmap
  //   this.ALLOWED_FILE_TYPES = Object.keys(this.filesHashmap);
  // }

  ngOnInit(): void {
    // this.files$ = this.fileService.getAllFiles();
    // this.createCustomObjectBasedOnFiletype()
  }

}
