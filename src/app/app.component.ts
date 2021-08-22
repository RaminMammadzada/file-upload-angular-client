import { FileService } from 'src/app/_services/file.service';
import { File } from './_models/file.model';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public files: File[] = [];

  constructor(private fileService: FileService){
  }

  ngOnInit(){
    this.loadFiles();
  }

  private loadFiles = () => {
    this.fileService.getAllFiles()
    .subscribe(res => {
      this.files = res as File[];
    });
  }

  public updateFiles = (event) => {
    this.fileService.getAllFiles()
    .subscribe(res => {
      this.files = res as File[];
    });
  }
}
