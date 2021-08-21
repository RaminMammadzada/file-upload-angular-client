import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  public allowedFileTypes: [];
  public bytesToSize;
  public fileSizeLimit;

  constructor() { }

  ngOnInit(): void {
  }



}
