import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ICONS} from './constants';
import {SelectOption} from '../../commons/gui/interfaces';

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
          (change)="execCommandWithChangeEvent('formatBlock', $event)"
        ></app-select>
        <app-select
          [options]="fontNameOptions"
          (change)="execCommandWithChangeEvent('fontName', $event)"
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
    {value: 'P', label: 'Paragraph', selected: true},
    {value: 'H1', label: 'HEADER 1'},
    {value: 'H2', label: 'HEADER 2'},
    {value: 'H3', label: 'HEADER 3'},
    {value: 'H4', label: 'HEADER 4'},
    {value: 'H5', label: 'HEADER 5'},
    {value: 'H5', label: 'HEADER 5'}
  ];

  fontNameOptions: SelectOption[] = [
    {value: 'Arial', label: 'Arial', selected: true},
    {value: 'Comic Sans MS', label: 'Comic Sans MS'},
    {value: 'Courier', label: 'Courier'},
    {value: 'Georgia', label: 'Georgia'},
    {value: 'Tahoma', label: 'Tahoma'},
    {value: 'Times New Roman', label: 'Times New Roman'},
    {value: 'Verdana', label: 'Verdana'}
  ];

  selectionTimeout = null;

  @ViewChild('page', {static: false, read: ElementRef}) page: ElementRef;

  @HostListener('mousedown', ['$event'])
  onClick(event) {
    if (event.target.classList.contains('text-editor-pages-page')) {
      window.dispatchEvent(new Event('text-editor-item:focus'));
    }
  }

  constructor() {
    document.execCommand('DefaultParagraphSeparator', false, 'p');
  }

  ngAfterViewInit() {
    const {contentDocument, contentWindow} = this.page.nativeElement;
    contentDocument.designMode = 'On';
    contentDocument.body.addEventListener('selectstart', _ => {
      clearTimeout(this.selectionTimeout);
      this.selectionTimeout = setTimeout(() => this.handlePageSelection(contentWindow.getSelection()), 50);
    });
  }

  ngOnDestroy() {
    this.subs.map(s => s.unsubscribe());
  }

  handlePageSelection(selection: Selection) {
    const {anchorNode} = selection;
    if (anchorNode.nodeName === 'body' || !anchorNode.parentNode) {
      return;
    }

    console.log(this.formatBlockOptions);

    switch (anchorNode.parentNode.nodeName.toLowerCase()) {
      case 'text':
        this.formatBlockOptions.map(f => f.selected = f.value === 'P'); break;
      case 'h1':
        this.formatBlockOptions.map(f => f.selected = f.value === 'H1'); break;
      case 'h2':
        this.formatBlockOptions.map(f => f.selected = f.value === 'H2'); break;
      case 'h3':
        this.formatBlockOptions.map(f => f.selected = f.value === 'H3'); break;
      case 'h4':
        this.formatBlockOptions.map(f => f.selected = f.value === 'H4'); break;
      case 'h5':
        this.formatBlockOptions.map(f => f.selected = f.value === 'H5'); break;
      case 'h6':
        this.formatBlockOptions.map(f => f.selected = f.value === 'H6'); break;
    }
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
}
