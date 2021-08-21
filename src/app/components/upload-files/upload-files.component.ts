import { FileService } from 'src/app/_services/file.service';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { File } from 'src/app/_models/file.model';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Input() files: File[];
  public allowedFileTypes: [];
  public bytesToSize;
  public fileSizeLimit;

  public uploader: FileUploader;
  public hasBaseDropzoneOver = false;
  public baseUrl = environment.apiUrl;

  @Output() subscribe = new EventEmitter();

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.intiializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  uploadFinished(event) {
    console.log("uploaded", event);
  }

  intiializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "api/upload",
      isHTML5: true,
      // allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response) {
        const responseObj = JSON.parse(response);
        const file: File = {
          filePath: responseObj.filePath,
          fileSize: responseObj.file.length,
          fileName: responseObj.file.fileName,
          fileType: responseObj.file.contentType.split("/")[1],
          uploadDate: new Date(),
        }
        console.log(file);
        this.files.push(file);
        this.fileService.postFile(file);

        this.subscribe.emit(this.files);
      }
    }
  }
}
