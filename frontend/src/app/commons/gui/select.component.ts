import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {SelectOption} from './interfaces';

@Component({
  selector: 'app-select',
  template: `
    <div class="app-select" [class.opened]="opened">
      <div class="app-select-value" (click)="opened = !opened">
        {{selectedValue ? selectedValue.label : placeholder}}
      </div>
      <div class="app-select-options">
        <ng-container *ngIf="opened">
          <div
            class="app-select-options-item"
            *ngFor="let item of options; trackBy: trackByFn"
            [class.selected]="selectedValue && item.value === selectedValue.value"
            (click)="onItemClick(item)"
          >
            {{item.label}}
          </div>
        </ng-container>
      </div>
    </div>
  `
})

export class SelectComponent {
  @Input() options: SelectOption[];
  @Input() placeholder = '-';
  @Input() selectedValue: SelectOption;
  @Output() change = new EventEmitter<SelectOption>();

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

  onItemClick(item: SelectOption): void {
    this.selectedValue = item;
    this.opened = false;
    this.change.emit(item);
  }

  trackByFn(index, item) { return index; }
}
