import {Directive, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {TimelineMax} from 'gsap';

@Directive({
  selector: '[appDesktopItem]'
})
export class DesktopIconDirective implements OnInit {
  itemAnimation: TimelineMax;

  @HostListener('mousedown') onMouseDown() {
    if (this.itemAnimation.isActive()) { this.itemAnimation.kill(); }
    this.itemAnimation = new TimelineMax({paused: true, reversed: false});
    this.itemAnimation.to(this.viewContainerRef.element.nativeElement, .1, {scaleX: .95, scaleY: .95, ease: 'Expo.easeInOut'}, 0);
    this.itemAnimation.play();
  }

  @HostListener('mouseup') onMouseUp() {
    if (this.itemAnimation.isActive()) { this.itemAnimation.kill(); }
    this.itemAnimation = new TimelineMax({paused: true, reversed: false});
    this.itemAnimation.to(this.viewContainerRef.element.nativeElement, .1, {scaleX: 1, scaleY: 1, ease: 'Expo.easeInOut'}, 0);
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
