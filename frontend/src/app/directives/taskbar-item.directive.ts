import {Directive, OnInit, ViewContainerRef} from '@angular/core';
import {TimelineMax} from 'gsap';

@Directive({
  selector: '[appTaskbarItem]'
})
export class TaskbarItemDirective implements OnInit {
  itemAnimation: TimelineMax;
  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.animateIn();
  }

  animateIn() {
    window.requestAnimationFrame(() => {
      this.itemAnimation = new TimelineMax({paused: true, reversed: false});
      this.itemAnimation.to(this.viewContainerRef.element.nativeElement, 1, {opacity: 1, ease: 'Expo.easeInOut'}, 0);
      this.itemAnimation.play();
    });
  }
}
