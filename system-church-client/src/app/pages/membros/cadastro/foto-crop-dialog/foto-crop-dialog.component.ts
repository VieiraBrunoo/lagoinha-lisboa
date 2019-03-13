import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-foto-crop-dialog',
  templateUrl: './foto-crop-dialog.component.html',
  styleUrls: ['./foto-crop-dialog.component.css']
})
export class FotoCropDialogComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.data.croppedImage = this.croppedImage;
  }

  imageLoaded() {
    // show cropper
  }

  loadImageFailed() {
    // show message
  }

  constructor(
    public dialogRef: MatDialogRef<FotoCropDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      imageChangedEvent: any,
      croppedImage: any,
    }) { }
    
  ngOnInit() {
    this.imageChangedEvent = this.data.imageChangedEvent;
  }

  onNoClick(): void {
    this.dialogRef.close();
  } 
}