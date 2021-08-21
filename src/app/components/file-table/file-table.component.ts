import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/_services/file.service';
import bytesToSize from '../../helpers/bytesToSize';
import { environment } from '../../../environments/environment';
import { File } from 'src/app/_models/file.model';

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css']
})
export class FileTableComponent implements OnInit, OnChanges {

  @Input() fileType: string = "jpeg";
  @Input() files: File[];

  bytesToSize;

  constructor(private fileService: FileService) {
    this.bytesToSize = bytesToSize;
  }

  ngOnInit(): void {
    this.fileService.getFilesByType(this.fileType)
      .subscribe(res => {
        this.files = res as File [];
      });
  }

  ngOnChanges(event) {
    this.fileService.getFilesByType(this.fileType)
      .subscribe(res => {
        this.files = res as File [];
      });
      console.log("it changed");
  }

  public createFilePath = (serverPath: string) => {
    return `${environment.apiUrl}${serverPath}`;
  }

}
