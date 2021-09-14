import {Component, Input} from '@angular/core';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills-item',
  template: `
    <div class="skills-item">
      <div class="skills-item-title"
           [innerHTML]="title | safe:'html'">
      </div>
      <div class="skills-item-description"
           [innerHTML]="description | safe:'html'"></div>
      <div class="skills-item-icon">
        <fa-icon [icon]="icon"></fa-icon>
      </div>
    </div>
  `
})

export class SkillsItemComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() icon: IconDefinition;
}
