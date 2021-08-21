import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css'],
})
export class ViewFilesComponent implements OnInit {
  @Input() files: File[];
  constructor() { }

  ngOnInit(): void {
    console.log("inside view files: ", this.files);
  }

}
