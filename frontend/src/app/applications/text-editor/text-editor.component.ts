import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs';
import {ICONS} from './constants';
import {SelectOption} from '../../commons/gui/interfaces';
import { TextEditorService } from './text-editor.service';

@Component({
  selector: 'app-text-editor',
  template: `
    <div class="text-editor">
      <div class="text-editor-toolbar">
        <button (click)="exec('bold')">
          <fa-icon [icon]="ICONS.faBold"></fa-icon>
        </button>
        <button (click)="exec('italic')">
          <fa-icon [icon]="ICONS.faItalic"></fa-icon>
        </button>
        <button (click)="exec('underline')">
          <fa-icon [icon]="ICONS.faUnderline"></fa-icon>
        </button>
        <button (click)="exec('strikethrough')">
          <fa-icon [icon]="ICONS.faStrikethrough"></fa-icon>
        </button>
        <button (click)="exec('justifyLeft')">
          <fa-icon [icon]="ICONS.faAlignLeft"></fa-icon>
        </button>
        <button (click)="exec('justifyCenter')">
          <fa-icon [icon]="ICONS.faAlignCenter"></fa-icon>
        </button>
        <button (click)="exec('justifyRight')">
          <fa-icon [icon]="ICONS.faAlignRight"></fa-icon>
        </button>
        <button (click)="exec('justifyFull')">
          <fa-icon [icon]="ICONS.faAlignJustify"></fa-icon>
        </button>
        <button (click)="exec('cut')">
          <fa-icon [icon]="ICONS.faCut"></fa-icon>
        </button>
        <button (click)="exec('copy')">
          <fa-icon [icon]="ICONS.faCopy"></fa-icon>
        </button>
        <button (click)="exec('indent')">
          <fa-icon [icon]="ICONS.faIndent"></fa-icon>
        </button>
        <button (click)="exec('outdent')">
          <fa-icon [icon]="ICONS.faOutdent"></fa-icon>
        </button>
        <button (click)="exec('subscript')">
          <fa-icon [icon]="ICONS.faSubscript"></fa-icon>
        </button>
        <button (click)="exec('superscript')">
          <fa-icon [icon]="ICONS.faSuperscript"></fa-icon>
        </button>
        <button (click)="exec('undo')">
          <fa-icon [icon]="ICONS.faUndo"></fa-icon>
        </button>
        <button (click)="exec('redo')">
          <fa-icon [icon]="ICONS.faRedo"></fa-icon>
        </button>
        <button (click)="exec('insertUnorderedList')">
          <fa-icon [icon]="ICONS.faListUl"></fa-icon>
        </button>
        <button (click)="exec('insertOrderedList')">
          <fa-icon [icon]="ICONS.faListOl"></fa-icon>
        </button>
        <button (click)="exec('insertHorizontalRule')">HR</button>
        <button (click)="execCommandWithArg('createLink', prompt('Enter link'))">
          <fa-icon [icon]="ICONS.faLink"></fa-icon>
        </button>
        <button (click)="exec('unlink')">
          <fa-icon [icon]="ICONS.faUnlink"></fa-icon>
        </button>
        <app-select
          [options]="formatBlockOptions"
          [selectedValue]="formatBlock"
          (change)="execCommandWithChangeEvent('formatBlock', $event)"
        ></app-select>
        <app-select
          [options]="fontNameOptions"
          [selectedValue]="fontName"
          (change)="execCommandWithChangeEvent('fontName', $event)"
        ></app-select>
        <app-select
          [options]="downloadOptions"
          [placeholder]="'Download'"
          (change)="download($event)"
        ></app-select>
      </div>
      <div class="text-editor-pages">
        <iframe [contentEditable]="true" #page id="page"></iframe>
      </div>
    </div>
  `
})

export class TextEditorComponent implements OnDestroy, AfterViewInit {
  ICONS = ICONS;
  prompt = prompt;
  subs: Subscription[] = [];

  formatBlockOptions: SelectOption[] = [
    {value: 'P', label: 'Paragraph'},
    {value: 'H1', label: 'HEADER 1'},
    {value: 'H2', label: 'HEADER 2'},
    {value: 'H3', label: 'HEADER 3'},
    {value: 'H4', label: 'HEADER 4'},
    {value: 'H5', label: 'HEADER 5'},
    {value: 'H5', label: 'HEADER 5'}
  ];
  formatBlock = this.formatBlockOptions[0];

  fontNameOptions: SelectOption[] = [
    {value: 'Arial', label: 'Arial'},
    {value: 'Comic Sans MS', label: 'Comic Sans MS'},
    {value: 'Courier', label: 'Courier'},
    {value: 'Georgia', label: 'Georgia'},
    {value: 'Tahoma', label: 'Tahoma'},
    {value: 'Times New Roman', label: 'Times New Roman'},
    {value: 'Verdana', label: 'Verdana'}
  ];
  fontName = this.fontNameOptions[0];

  downloadOptions: SelectOption[] = [
    {value: 'PDF', label: 'Download as PDF'},
    {value: 'DOC', label: 'Download as DOC'},
    {value: 'DOCX', label: 'Download as DOCX'}
  ];

  selectionTimeout = null;

  @ViewChild('page', {static: false, read: ElementRef}) page: ElementRef;

  @HostListener('mousedown', ['$event'])
  onClick(event) {
    if (event.target.classList.contains('text-editor-pages-page')) {
      window.dispatchEvent(new Event('text-editor-item:focus'));
    }
  }

  constructor(
    private cd: ChangeDetectorRef,
    private service: TextEditorService
  ) {
    document.execCommand('DefaultParagraphSeparator', false, 'p');
  }

  ngAfterViewInit() {
    const {contentDocument, contentWindow} = this.page.nativeElement;
    contentDocument.designMode = 'On';
    contentDocument.body.addEventListener('selectstart', _ => {
      clearTimeout(this.selectionTimeout);
      this.selectionTimeout = setTimeout(() => this.handlePageSelection(contentWindow.getSelection()), 100);
    });
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  handlePageSelection(selection: Selection) {
    const {anchorNode} = selection;
    if (anchorNode.nodeName === 'body' || !anchorNode.parentNode) {
      this.formatBlock = this.formatBlockOptions.find(fBO => fBO.value === 'P');
      return;
    }
    let target = 'P';
    switch (anchorNode.parentNode.nodeName.toLowerCase()) {
      case '#text': target = 'P'; break;
      case 'h1': target = 'H1'; break;
      case 'h2': target = 'H2'; break;
      case 'h3': target = 'H3'; break;
      case 'h4': target = 'H4'; break;
      case 'h5': target = 'H5'; break;
      case 'h6': target = 'H6'; break;
    }
    this.formatBlock = this.formatBlockOptions.find(fBO => fBO.value === target);
    this.cd.detectChanges();
  }

  exec(command) {
    this.page.nativeElement.contentDocument.execCommand(command, false, null);
  }

  execCommandWithArg(command, arg) {
    this.page.nativeElement.contentDocument.execCommand(command, false, arg);
  }

  execCommandWithChangeEvent(command, options: SelectOption) {
    this.page.nativeElement.contentDocument.execCommand(command, false, options.value);
  }

  download(as) {
    const {value} = as;

    switch (value) {
      case 'PDF':
        return this.service.downloadPDF(this.page.nativeElement.contentDocument);
      case 'DOC':
        return this.service.downloadDoc(this.page.nativeElement.contentDocument);
      case 'DOCX':
        return this.service.downloadDoc(this.page.nativeElement.contentDocument, 'docx');
      default:
        return console.warn('No download for type %o found.', value);
    }
  }
}
