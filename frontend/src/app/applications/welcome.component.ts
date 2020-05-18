import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '../store/app.reducer';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="app-welcome">
      <div class="app-welcome-left">
        <h3>Pages</h3>
        <ul>
          <li (click)="scrollTo('intro')">01. Intro</li>
          <li (click)="scrollTo('education')">02. Education</li>
          <li (click)="scrollTo('works')">03. Work</li>
        </ul>
      </div>
      <div class="app-welcome-right" #welcomeRight>
        <div id="intro">
          <h1>🖐 Welcome to my personal website!
            <hr>
          </h1>
          <div id="about01" class="image" [innerHTML]="(loadedAssets$ | async)?.about01?.resource | safe:'html'"></div>
          <p id="text1">Welcome to <b>Nica OS</b>, my personal web operating system!<br>
            This website is created using <b>Angular 9+</b> with a <i>stateless design pattern</i> in mind.<br>
            Its goal is to demonstrate how
            strong web apps are nowadays, and obviously to create a personal portfolio.</p>
          <h2>Who Am I?
            <hr>
          </h2>
          <p id="text2">
            I'm a <b>web full-stack developer</b> living in <i>Verona</i> (IT) with a strong focus on <i>creativity</i>.
            I love to create unique products, using the latest techniques in web development 🐱‍👤<br>
            <br>
            My work method is really simple: <i>prototype more, work less</i>.<br>
            <br>
            If you need a job in a short time, I'm not the right person for you. <br>
            Personally, I think the simplest project in the world needs its time because it needs <i>study, prototype
            and tests</i>.
            <br>
            In my free time, I love to <b>study</b>, <b>try</b> and <b>learn new technologies</b>, or simply <b>improve
            my skills</b>.<br>
            Obviously, I'm also a human so I love to walk around the incredible mountains and places near my city,
            play foosball or just chill out with my (three) cats 🐈🐈🐈.<br>
            <br>
            ---
            <br>
            Here there is a list of skills I've earned during my career:<br>
            <br>
            <b>[REACT FullStack Development]</b><br>
            - Stateless frontend web applications<br>
            - WebGL contents<br>
            - Apollo GraphQL<br>
            - Lerna<br>
            - KoaJS<br>
            - CSS Modules<br>
            <br>
            <b>[Angular 7.x Frontend Development]</b><br>
            - CMS for banks and insurance agencies<br>
            - Accessibility Improvements<br>
            - Restyle and animations<br>
            - Stateless programming<br>
            - Performance boost <br>
            - Library development<br>
            <br>
            <b>[Unity 3D]</b><br>
            - Android/IOs applications<br>
            - WebAssembly/WebGL contents<br>
            - WebVR/VR<br>
            <br>
            As a hobby I love also to <b>prototype websites, applications or just design things</b>, and also I love to
            produce
            <i>music!</i><br>
          </p>
        </div>
        <div id="education">
          <h2>
            <hr>
            Education
          </h2>
          <div id="university" class="image"
               [style.background]="'url(assets/' + (loadedAssets$ | async)?.university?.path + ')'"></div>
          <p>I've studied as <b>accountant</b> in Verona at the <b>ITIS Aldo Pasoli</b>. After the diploma I've started
            the university course in <b>Computer Science</b> at the <i>University of Verona</i>.<br>
          </p>
        </div>
        <div id="works">
          <h2>
            <hr>
            Works
          </h2>
          <div class="work-item">
            <div class="work-item-left">
              <div class="image"
                   [style.background]="'url(assets/' + (loadedAssets$ | async)?.addvalue?.path + ')'"></div>
            </div>
            <div class="work-item-right">
              <div class="work-item-title">
                Freelance Consultant
              </div>
              <div class="work-item-subtitle">
                <a href="https://www.addvalue.it/" target="_blank">AddValue</a>
              </div>
              <div class="work-item-dates">
                NOV 2018 - PRESENT
              </div>
              <div class="work-item-description">
                Working as Angular <b>8+ Frontend Specialist</b>, focused on applications styling and development.
                Currently we are working on a <i>stateless web application</i> using Angular 8, wich dialogs with a
                Spring Boot
                server using websockets.<br>
              </div>
            </div>
          </div>
          <div class="work-item">
            <div class="work-item-left">
              <div class="image"
                   [style.background]="'url(assets/' + (loadedAssets$ | async)?.vas?.path + ')'"></div>
            </div>
            <div class="work-item-right">
              <div class="work-item-title">
                Web Frontend Developer, Unity Developer
              </div>
              <div class="work-item-subtitle">
                <a href="https://www.vas.it/" target="_blank">VAS</a>
              </div>
              <div class="work-item-dates">
                OCT 2018 - JUN 2019
              </div>
              <div class="work-item-description">
                Working as <b>Frontend developer</b> on <i>React</i> based web applications and on advanced <i>WebGL</i>
                contents with <i>Unity3D</i>.
              </div>
            </div>
          </div>
          <div class="work-item">
            <div class="work-item-left">
              <div class="image"
                   [style.background]="'url(assets/' + (loadedAssets$ | async)?.slowmedia?.path + ')'"></div>
            </div>
            <div class="work-item-right">
              <div class="work-item-title">
                Freelance developer
              </div>
              <div class="work-item-subtitle">
                <a href="https://www.slowmedia.it/" target="_blank">SLOWMEDIA</a>
              </div>
              <div class="work-item-dates">
                APR 2018 - JUN 2019
              </div>
              <div class="work-item-description">
                Website creation, wordpress custom theme development.
              </div>
            </div>
          </div>
          <div class="work-item">
            <div class="work-item-left">
              <div class="image"
                   [style.background]="'url(assets/' + (loadedAssets$ | async)?.eleads?.path + ')'"></div>
            </div>
            <div class="work-item-right">
              <div class="work-item-title">
                Freelance developer
              </div>
              <div class="work-item-subtitle">
                <a href="https://www.e-leads.it/" target="_blank">ELEADS</a>
              </div>
              <div class="work-item-dates">
                JUL 2018 - AUG 2018
              </div>
              <div class="work-item-description">
                Angular developer, Frontend developer
              </div>
            </div>
          </div>
          <div class="work-item">
            <div class="work-item-left">
              <div class="image"
                   [style.background]="'url(assets/' + (loadedAssets$ | async)?.trueblue?.path + ')'"></div>
            </div>
            <div class="work-item-right">
              <div class="work-item-title">
                Fullstack Web Developer / Mobile Developer
              </div>
              <div class="work-item-subtitle">
                <a href="https://www.e-leads.it/" target="_blank">ELEADS</a>
              </div>
              <div class="work-item-dates">
                FEB 2015 - MAR 2018
              </div>
              <div class="work-item-description">
                Web fullstack developer on custom CMS systems for Pharma industry. iOS Mobile developer.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WelcomeComponent {
  public data: any;
  loadedAssets$ = this.store$.pipe(select(selectLoadedAssets));

  isIntroVisible = true;
  isEducationVisible = false;
  isWorkVisible = false;

  @ViewChild('welcomeRight', {static: true}) welcomeRight: ElementRef;

  constructor(private store$: Store<any>) {
  }

  scrollTo(elementId) {
    this.welcomeRight.nativeElement.querySelector(`#${elementId}`).scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
