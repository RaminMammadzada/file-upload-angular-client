import { FileService } from 'src/app/_services/file.service';
import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';
import { FileUploader } from 'ng2-file-upload';
import { File } from 'src/app/_models/file.model';
import { ToastrService } from 'ngx-toastr';
import { ALLOWED_FILE_TYPES, FILE_SIZE_LIMIT } from 'src/app/staticData';
import bytesToSize from '../../helpers/bytesToSize';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  public allowedFileTypes: string[];
  public bytesToSize;
  public fileSizeLimit;

  public uploader: FileUploader;
  public hasBaseDropzoneOver = false;
  public baseUrl = environment.apiUrl;

  @Output() public emitter = new EventEmitter();

  constructor(
    private fileService: FileService,
    private toastr: ToastrService) {
    this.allowedFileTypes = ALLOWED_FILE_TYPES;
    this.fileSizeLimit = FILE_SIZE_LIMIT;
    this.bytesToSize = bytesToSize;
  }

  ngOnInit(): void {
    this.intiializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  // uploadFinished(event) {
  //   console.log("uploaded", event);
  // }

  intiializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "api/upload",
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false
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
        this.fileService.postFile(file);
        this.toastr.success(`${file.fileName} is uploaded successfully!`);
        this.emitter.emit("files updated");
      }
    }

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.toastr.error(response)
    }
  }
}
