import { FILES } from './FILES';
import { TestBed } from '@angular/core/testing';
import { FileService } from './file.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { File } from '../_models/file.model';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('FileService', () => {
  let fileService: FileService;
  let httpTestingController: HttpTestingController;
  let files: File[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FileService
      ]
    })

    fileService = TestBed.get(FileService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should retrieve all files with GET method', () => {
    fileService.getAllFiles()
    .subscribe(res => {
      files = res as File[];
      // console.log("Filessss: ", files)

      expect(files).toBeTruthy('No files returned');
      expect(files.length).toBe(7, "incorrect number of files");

      const fileNames = files.map((file) => file.fileName);
      expect(fileNames.includes("maxresdefault.jpg")).toBeTruthy("There is file with the name 'maxresdefault.jpg' ");
    });
    const req = httpTestingController.expectOne(environment.apiUrl + "api/fileItems");
    // console.log( "REQURL", req.request.url);
    expect(req.request.method).toEqual("GET");

    req.flush(FILES);
  });

  it('should create new file with POST method', () => {
    const sampleFile = {
      "filePath": "StaticFiles/Files/sampleImage.png",
      "fileSize": 12616,
      "fileName": "sampleImage.png",
      "fileType": "png",
      "uploadDate": new Date()
    };

    fileService.postFile(sampleFile).subscribe(
     file => {
      console.log("File111: ", JSON.stringify(file));

      expect(file).toBeTruthy('No files returned');
      expect(file.fileSize).toEqual(12616, "File size is not the same");
      expect(file.fileSize).toBeLessThan(5 * 1024 * 1024, "File size is not the same");
     });
    const req = httpTestingController.expectOne(environment.apiUrl + "api/fileItems");
    
    expect(req.request.method).toEqual('POST');
    req.flush(sampleFile);
  });

  it('should fail when file size is bigger than 5 Mb while file is about to created with POST method', () => {
    const sampleFile = {
      "filePath": "StaticFiles/Files/sampleImage.png",
      "fileSize": 9242880,
      "fileName": "sampleImage.png",
      "fileType": "png",
      "uploadDate": new Date()
    };

    fileService.postFile(sampleFile).subscribe(
     () => {
        fail("the save file operation should have failed");
     }, (error: HttpErrorResponse) => {
      expect(error.status).toBe(400);
    });
    const req = httpTestingController.expectOne(environment.apiUrl + "api/fileItems");

    expect(req.request.method).toEqual('POST');
    req.flush('Post file failed', {status: 400, statusText: 'Invalid model object'});
  });

  afterEach(() => {
    httpTestingController.verify();
  })

});
