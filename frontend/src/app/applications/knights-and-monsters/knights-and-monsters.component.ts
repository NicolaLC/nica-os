import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '@appstore/app.reducer';
import {TweenMax, TimelineMax} from 'gsap';

@Component({
  selector: 'app-browser',
  template: `
    <div class="app-kandm">
      <app-tooltip
        [html]="'This is just an intro animation example using GSAP, game will not start.<br><b>Parallax</b> is pretty cool 😎'">
      </app-tooltip>
      <div class="app-kandm-intro">
        <div class="app-kandm-intro-background">
          <div class="image"
               id="background01"
               [style.backgroundImage]="'url(assets/' + (loadedAssets$ | async)?.km_background01?.path + ')'"></div>
          <div class="image"
               id="background02"
               [style.backgroundImage]="'url(assets/' + (loadedAssets$ | async)?.km_background02?.path + ')'"></div>
          <div class="image"
               id="background03"
               [style.backgroundImage]="'url(assets/' + (loadedAssets$ | async)?.km_background03?.path + ')'"></div>
        </div>
        <div class="app-kandm-intro-logo">
          <div class="image"
               id="shield"
               [style.backgroundImage]="'url(assets/' + (loadedAssets$ | async)?.km_shield?.path + ')'"></div>
          <div class="image"
               id="sword-left"
               [style.backgroundImage]="'url(assets/' + (loadedAssets$ | async)?.km_sword?.path + ')'"></div>
          <div class="image"
               id="sword-right"
               [style.backgroundImage]="'url(assets/' + (loadedAssets$ | async)?.km_sword_r?.path + ')'"></div>
          <div id="logos">
            <div class="image"
                 id="logo-p1"
                 [innerHTML]="(loadedAssets$ | async)?.km_logo1?.resource | safe:'html'"></div>
            <div class="image"
                 id="logo-p2"
                 [innerHTML]="(loadedAssets$ | async)?.km_logo2?.resource | safe:'html'"></div>
            <div class="image"
                 id="logo-p3"
                 [innerHTML]="(loadedAssets$ | async)?.km_logo3?.resource | safe:'html'"></div>
          </div>
        </div>
        <div class="app-kandm-buttons">
          <button appButton
                  class="image"
                  id="play"
                  [style.backgroundImage]="'url(assets/' + (loadedAssets$ | async)?.km_playButton?.path + ')'"></button>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KnightsAndMonstersComponent implements OnInit {
  public data: any;
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));
  parallaxFrameRequest;

  constructor(private store$: Store<any>) {}

  ngOnInit() {
    this.introAnimation();
    this.handleParallax();
  }

  private handleParallax() {
    document.addEventListener('mousemove', (event) => {
      cancelAnimationFrame(this.parallaxFrameRequest);
      this.parallaxFrameRequest = requestAnimationFrame(() => {
        this.updateParallax(event);
      });
    });
  }

  private updateParallax(event: MouseEvent) {
    const cy = window.innerWidth / 2;
    const cx = window.innerWidth / 2;
    const dx = event.x - cy;
    const dy = event.y - cx;

    const tilty = -(dy / cy);
    const tiltx = -(dx / cx);

    TweenMax.to('#background01', 1, {
      x: tilty * 5, y: tilty * 5
    });
    TweenMax.to('#background02', 1, {
      x: tiltx * 10, y: tilty * 10
    });
    TweenMax.to('#background03', 1, {
      x: tiltx * 30, y: tilty * 30
    });
  }

  private introAnimation() {

    TweenMax.from('.app-kandm-intro-background', 2, {
      opacity: 0,
      ease: 'circle'
    });

    new TimelineMax({
      onComplete: _ => {
        TweenMax.to('#shield', 2, {
          y: '5px',
          repeat: -1,
          yoyo: true,
          ease: 'circle'
        });
      }
    }).add([
      TweenMax.from('#shield', .5, {
        opacity: 0,
        ease: 'power3'
      }),
      TweenMax.from('#shield', .5, {
        y: '-10rem',
        ease: 'circle'
      }),
    ], 'sequential');

    // sword left
    new TimelineMax({
      onComplete: _ => {
        TweenMax.to('#shield', .1, {
          y: '-.5rem',
          x: '-.5rem',
          rotationZ: -1,
          rotationX: -30,
          ease: 'power4',
          repeat: 1,
          yoyo: true
        });
      },
      delay: 1
    }).add([
      TweenMax.from('#sword-left', .5, {
        opacity: 0,
        ease: 'circle'
      }),
      TweenMax.from('#sword-left', .5, {
        y: '100rem',
        x: '100rem',
        ease: 'circle'
      })
    ], 'sequential');

    // sword right
    new TimelineMax({
      onComplete: _ => {
        TweenMax.to('#shield', .1, {
          y: '-.5rem',
          x: '.5rem',
          rotationZ: 1,
          rotationX: 30,
          ease: 'power4',
          repeat: 1,
          yoyo: true
        });
      },
      delay: 1.5
    }).add([
      TweenMax.from('#sword-right', .5, {
        opacity: 0,
        ease: 'circle'
      }),
      TweenMax.from('#sword-right', .5, {
        y: '100rem',
        x: '-100rem',
        ease: 'circle'
      })
    ], 'sequential');

    new TimelineMax({
      onComplete: _ => {
        TweenMax.to('#logo-p1', 2, {
          y: '5px',
          repeat: -1,
          yoyo: true,
          ease: 'circle'
        });
      },
      delay: 5
    }).add([
      TweenMax.from('#logo-p1', 5, {
        opacity: 1,
        ease: 'power4'
      })
    ], 'sequential');

    new TimelineMax({
      delay: 5.2,
      onComplete: _ => {
        TweenMax.to('#logo-p2', 2, {
          y: '5px',
          repeat: -1,
          yoyo: true,
          ease: 'power2'
        });
      }
    }).add([
      TweenMax.from('#logo-p2', 5, {
        opacity: 1,
        ease: 'power4'
      })
    ], 'sequential');

    new TimelineMax({
      delay: 5.4,
      onComplete: _ => {
        TweenMax.to('#logo-p3', 2, {
          y: '5px',
          repeat: -1,
          yoyo: true,
          ease: 'power1'
        });
      }
    }).add([
      TweenMax.from('#logo-p3', 5, {
        opacity: 1,
        ease: 'power4'
      })
    ], 'sequential');

    new TimelineMax({delay: 4}).add([
      TweenMax.from('.app-kandm-buttons', 2, {
        y: '10rem',
        ease: 'power4'
      }),
      TweenMax.from('.app-kandm-buttons', 2, {
        opacity: 0,
        ease: 'circle'
      })
    ], 'sequential');

    //
    const slideAnimation = new TimelineMax({delay: 3, repeat: -1, yoyo: true})
      .to('#logos', 2, {
        x: '+=10px',
        ease: 'linear'
      })
      .to('#logos', 2, {
        x: '-=10px',
        ease: 'linear'
      });

    new TimelineMax({
      delay: 3,
      onComplete: () => {
        slideAnimation.kill();
      }
    }).add([
      TweenMax.from('#logos', 10, {
        y: '-10rem',
        ease: 'power4'
      }),
      TweenMax.from('#logos', 5, {
        opacity: 0,
        ease: 'power4'
      }),
    ], 'sequential');
  }
}
