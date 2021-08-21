import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/_services/file.service';
import bytesToSize from '../../helpers/bytesToSize';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit {
  files$: Observable<File[]>;
  @Input() fileType: string = "jpeg";
  bytesToSize;

  constructor(private fileService: FileService) {
    this.bytesToSize = bytesToSize;
  }

  ngOnInit(): void {
    this.files$ = this.fileService.getFilesByType(this.fileType);
  }

  public createFilePath = (serverPath: string) => {
    return `${environment.apiUrl}${serverPath}`;
  }

}
