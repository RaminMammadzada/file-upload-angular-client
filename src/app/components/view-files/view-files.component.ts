import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ALLOWED_FILE_TYPES } from 'src/app/staticData';
import { FileService } from 'src/app/_services/file.service';
import bytesToSize from '../../helpers/bytesToSize';
import { environment } from '../../../environments/environment';
import { File } from 'src/app/_models/file.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css'],
})
export class ViewFilesComponent implements OnInit, OnChanges{
  @Input() files: File[];
  public ALLOWED_FILE_TYPES: string[] = [];
  bytesToSize;

  constructor(private fileService: FileService) {
    this.ALLOWED_FILE_TYPES = ALLOWED_FILE_TYPES;
    this.bytesToSize = bytesToSize;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Here is the changes: ", changes);
    //  this.files = changes.files.currentValue;
    // this.files = Object.assign({}, this.files);
  }

  ngOnInit(): void {
    console.log("inside view files: ", this.files);
  }

  public createFilePath = (serverPath: string) => {
    return `${environment.apiUrl}${serverPath}`;
  }

}
