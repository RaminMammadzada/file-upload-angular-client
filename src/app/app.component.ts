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

  constructor(private http: HttpClient){
  }

  ngOnInit(){
    this.loadFiles();
  }

  private loadFiles = () => {
    this.http.get(environment.apiUrl + 'api/fileItems')
    .subscribe(res => {
      this.files = res as File[];
    });
  }

  public updateFiles = (event) => {
    this.http.get(environment.apiUrl + 'api/fileItems')
    .subscribe(res => {
      this.files = res as File[];
    });
  }
}
