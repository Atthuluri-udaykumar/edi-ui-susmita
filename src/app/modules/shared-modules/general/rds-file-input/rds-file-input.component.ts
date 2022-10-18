import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rds-file-input',
  templateUrl: './rds-file-input.component.html',
  styleUrls: ['./rds-file-input.component.css']
})
export class RdsFileInputComponent implements AfterViewInit {

  @Input() disabled = false;

  @Input() accept: string = '';

  @Output() upload: EventEmitter<File> = new EventEmitter<File>();

  fileNameSelected = '';

  selectedFiles: FileList;
  currentFile: File;

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('dropTarget') dropTarget: ElementRef;

  @Input() error = false;
  @Output() errorTypeChange: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    if (this.disabled) {
      this.renderer.setAttribute(this.fileInput.nativeElement, 'disabled', '');
    }
  }

  dragOver(event) {
    this.renderer.addClass(this.dropTarget.nativeElement, 'usa-file-input--drag');
  }

  dragLeave(event) {
    this.renderer.removeClass(this.dropTarget.nativeElement, 'usa-file-input--drag');
  }

  drop(event) {
    // this.preventInvalidFiles(event);
  }

  /**
   * When new files are applied to file input, this function generates previews
   * and removes old ones.
   * @param event event object
   */
  handleChange(event) {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.preventInvalidFilesCheck(event);

      // First, get rid of existing previews
      this.fileNameSelected = '';

      // Iterates through files list and creates previews
      for (let i = 0; this.selectedFiles && i < this.selectedFiles.length; i += 1) {
        const reader = new FileReader();
        const fileName = this.selectedFiles[i].name;

        // Not all files will be able to generate previews. In case this happens,
        // we provide several types "generic previews" based on the file extension.
        let _this = this;
        reader.onloadend = function createFilePreview() {
          _this.fileNameSelected = fileName;
        };

        if (this.selectedFiles[i]) {
          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }
  }

  /**
   * When using an Accept attribute, invalid files will be hidden from
   * file browser, but they can still be dragged to the input. This
   * function prevents them from being dragged and removes error states
   * when correct files are added.
   * @param event event object
   */
  preventInvalidFilesCheck(event) {
    this.renderer.removeClass(this.dropTarget.nativeElement, 'usa-file-input--drag');
    // this.error = false; // Clean before checking

    // Runs if only specific files are accepted
    if (this.accept) {

      // If multiple files are dragged, this iterates through them and look for any files that are not accepted.
      let filesValid = true;
      for (let i = 0; i < event.target.files.length; i += 1) {
        const file = event.target.files[i];
        if (filesValid) {
          const acceptedExts: string[] = this.accept.split(",");
          for (let ext of acceptedExts) {
            filesValid = file.name.toLowerCase().indexOf(ext) >= 0;
            if (filesValid) {
              break; // File valid stop checking against other extensions
            }
          }
          if (!filesValid) { // File Invalid
            break;
          }
        }
      }

      // If dragged files are not accepted, this removes them from the value of the input and creates and error state
      if (!filesValid) {
        // removeOldPreviews(dropTarget, instructions);
        this.fileInput.nativeElement.value = '';
        this.selectedFiles = undefined;
        // this.error = true;
        this.errorTypeChange.emit(true);
        event.preventDefault();
        event.stopPropagation();
      } else {
        this.errorTypeChange.emit(false);
      }
    }
  }

  triggerUpload() {
    if (!this.disabled) {
      this.currentFile = this.selectedFiles.item(0);

      this.upload.emit(this.currentFile);

      this.selectedFiles = undefined;
      this.fileNameSelected = '';
      this.reset();
    }
  }

  reset() {
    this.fileInput.nativeElement.value = '';
  }

}
