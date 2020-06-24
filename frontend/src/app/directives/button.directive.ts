import {Directive, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {TimelineMax} from 'gsap';

@Directive({
  selector: '[appButton]'
})
export class ButtonDirective implements OnInit {
  itemAnimation: TimelineMax;

  @HostListener('mouseenter') onMouseEnter() {
    if (this.itemAnimation.isActive()) { this.itemAnimation.kill(); }
    this.itemAnimation = new TimelineMax({paused: true, reversed: false});
    this.itemAnimation.to(this.viewContainerRef.element.nativeElement, .1, {scale: 1.1, ease: 'Expo.easeInOut'}, 0);
    this.itemAnimation.play();
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.itemAnimation.isActive()) { this.itemAnimation.kill(); }
    this.itemAnimation = new TimelineMax({paused: true, reversed: false});
    this.itemAnimation.to(this.viewContainerRef.element.nativeElement, .1, {scale: 1, ease: 'Expo.easeInOut'}, 0);
    this.itemAnimation.play();
  }

  @HostListener('mousedown') onMouseDown() {
    if (this.itemAnimation.isActive()) { this.itemAnimation.kill(); }
    this.itemAnimation = new TimelineMax({paused: true, reversed: false});
    this.itemAnimation.to(this.viewContainerRef.element.nativeElement, .1, {scale: .95, ease: 'power4'}, 0);
    this.itemAnimation.play();
  }

  @HostListener('mouseup') onMouseUp() {
    if (this.itemAnimation.isActive()) { this.itemAnimation.kill(); }
    this.itemAnimation = new TimelineMax({paused: true, reversed: false});
    this.itemAnimation.to(this.viewContainerRef.element.nativeElement, .1, {scale: 1, ease: 'power4'}, 0);
    this.itemAnimation.play();
  }

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
      this.itemAnimation.to(this.viewContainerRef.element.nativeElement, .75, {y: 0, ease: 'Expo.easeInOut'}, 0);
      this.itemAnimation.play();
    });
  }
}
