import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {SelectOption} from './interfaces';

@Component({
  selector: 'app-select',
  template: `
    <div class="app-select" [class.opened]="opened">
      <div class="app-select-value" (click)="opened = !opened">
        {{value.label}}
      </div>
      <div class="app-select-options">
        <ng-container *ngIf="opened">
          <div
            class="app-select-options-item"
            *ngFor="let item of options; trackBy: trackByFn"
            (click)="onItemClick(item)"
          >
            {{item.value}}
          </div>
        </ng-container>
      </div>
    </div>
  `
})

export class SelectComponent implements OnInit {
  @Input() options: SelectOption[];
  @Output() change = new EventEmitter<SelectOption>();

  value: SelectOption = {value: null, label: '-'};
  opened = false;

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const { target } = event;
    if (target && !this.elementRef.nativeElement.contains(target)) {
      this.opened = false;
    }
  }

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    const selectedOption = this.options.filter(option => option.selected);

    if (selectedOption && selectedOption.length) {
      this.value = selectedOption[0];
    }
  }

  onItemClick(item: SelectOption): void {
    this.options.map(o => o.selected = false);
    item.selected = true;
    this.value = item;
    this.opened = false;
    this.change.emit(item);
  }

  trackByFn(index, item) { return index; }
}
