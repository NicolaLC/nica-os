import {ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectLoadedAssets} from '@appstore/app.reducer';
import {DEVELOPMENT_SKILLS, FRAMEWORK_SKILLS, TOOLS_SKILLS} from '@applications/welcome/data/skills';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons/faMailBulk';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="app-welcome">
      <div class="app-welcome-left">
        <h3>Pages</h3>
        <ul>
          <li class="intro-anchor active"
              (click)="scrollTo('intro')">⚫ Intro
          </li>
          <li class="story-anchor"
              (click)="scrollTo('story')">⚫ My Story
          </li>
          <li class="education-anchor"
              (click)="scrollTo('education')">⚫ Education
          </li>
          <li class="works-anchor"
              (click)="scrollTo('works')">⚫ Works
          </li>
          <li class="skills-anchor"
              (click)="scrollTo('skills')">⚫ My skills
          </li>
          <li class="more-anchor"
              (click)="scrollTo('more')">⚫ View more
          </li>
        </ul>
        <app-link id="downloadCV"
                  [icon]="faDownload"
                  [link]="'assets/CV-2022.pdf'">
          Curriculum Vitae
        </app-link>
      </div>
      <div class="app-welcome-right"
           (scroll)="onScroll($event)"
           #welcomeRight>
        <app-tooltip>This website is under construction, content might change in the future.</app-tooltip>
        <div id="intro">
          <h1>Welcome 🖐</h1>
          <span id="text1">
            I'm a passionate <b>UI Developer</b>, looking to become a complete <b>UI Tech</b> in my career.<br><br>
            I love <b>perfect designs</b>, not only by appearance but also by accessibility.<br><br>
            My goal is to <b>design and develop</b> interfaces from usability to performance,
            looking forward to creating <b class="emphasis"><i>amazing UIs to help people understand your products with your eyes</i></b>.
          </span>
          <p class="full-row"><b>Contact me:</b></p>
          <app-link [icon]="faMail"
                    [link]="'mailto:nicolacastellanidev@gmail.com'">nicolacastellanidev@gmail.com
          </app-link>
          <app-link [icon]="faPhone"
                    [link]="'tel:+393462307313'">+39 346 23 07 313
          </app-link>
        </div>
        <h2>A brief introduction</h2>
        <div class="personal-icons">
          <div class="personal-icons-item">
            <img class="image"
                 [src]="'assets//' + (loadedAssets$ | async)?.scienceIcon?.path"/>
            <span>Science passionate</span>
          </div>
          <div class="personal-icons-item">
            <img class="image"
                 [src]="'assets//' + (loadedAssets$ | async)?.catIcon?.path"/>
            <span>Cat(s) owner</span>
          </div>
          <div class="personal-icons-item">
            <img class="image"
                 [src]="'assets//' + (loadedAssets$ | async)?.beerIcon?.path"/>
            <span>Beer lover</span>
          </div>
          <div class="personal-icons-item">
            <img class="image"
                 [src]="'assets//' + (loadedAssets$ | async)?.mountainIcon?.path"/>
            <span>Mountain traveler</span>
          </div>
        </div>
        <div id="story">
          <h2>My story</h2>
          <img id="about01"
               class="image"
               [src]="'assets//' + (loadedAssets$ | async)?.about01?.path"/>
          <span id="text2">
            My love for computer programming started at <b>10</b> with my first personal PC.
            <br><br>
            I've started with some classic Games like <b>Microsoft pinball</b>, and then moved to <b>Age of Empires</b>.
            <br><br>
            The love for video games made me discover the world of <b>programming.</b>
            <br><br>
            <app-link [link]="'https://www.yoyogames.com/en/gamemaker'">Game Maker Studio</app-link> was the firts tool I've used for game programming.<br>
            <br>
            After some years of experiments, I've decided to study <b>computer science</b> at secondary school, learning
            <b>Visual Basic</b> and <b>Pascal</b>, and creating my first programs
            <br><br>
            The school itself gave me a lot of fun and experience with programming, but I've decided to study more at the
            <app-link [link]="'https://www.univr.it/it/'">University of Verona</app-link>.
            <br><br>
            After the University, I've started working as <b>Web Fullstack Developer</b>, using <b>PHP, Zend, Javascript and SASS.</b>
            <br><br>
            Here I've decided to focus on creativity, and I've started to specialize as <b>Frontend Developer</b>, learning new things about
            <b>Design and Usability.</b>
            <br><br>
            I've worked with <b>Web and Mobile applications</b>, using custom and generic frameworks, like <b>Angular and React</b>, expecially to
            develop a more <i>accessible, beautiful and performant</i> apps.
            <br><br>
            After 3 years, I've decided to change my career and start to work as <b>self-employed</b>, boosting my skills as frontend developer, and working
            with a lot of new realities.
            <br><br>
            But, why I started my story with my first <i>games and my passion for game development</i> ?<br><br>
            Aside from my main job, my hobby is game development, and this involves also <b>design, music production, and other skills rather than programming.</b>
            I'm using <app-link [link]="'https://unity.com/'">Unity</app-link> since <b>10 years</b> now.<br><br>
            In my free time I love to prototype games and 3D content for web apps, and in 2020 I've decided to make my hobby a <b>full-time job</b>.<br><br>
            So I decided to partecipate at the University of Verona
            <app-link [link]="'https://www.mastergamedev.it/'">Master Game Dev</app-link> course.
            <br><br>
            Here I've learned new languages and tools, like <b>C++, Unreal, FMOD, etc..</b>, and I've decided to specialize as <b>UI Developer</b>
            in the game industry.
            <br><br>
          </span>
        </div>
        <div id="education">
          <h2> Education </h2>
          <div class="education-item">
            <div class="image"
                 [style.background]="'url(assets/' + (loadedAssets$ | async)?.university?.path + ')'"></div>
            <br>
            <div class="education-item-title">
              Master in Game Development
            </div>
            <div class="education-item-subtitle">
              <app-link link="https://www.mastergamedev.it/"
                        target="_blank">Master Game Dev
              </app-link>
              <p>Studying <b>Game Development</b> at the University Master Course. Learning game development
                 foundamentals and Engines.</p>
            </div>
            <div class="education-item-dates">
              2020 - 2022
            </div>
          </div>
          <div class="education-item">
            <div class="image"
                 [style.background]="'url(assets/' + (loadedAssets$ | async)?.university?.path + ')'"></div>
            <br>
            <div class="education-item-title">
              Degree in computer science
            </div>
            <div class="education-item-subtitle">
              <app-link link="https://www.univr.it/en/"
                        target="_blank">University of Verona
              </app-link>
              <p>3 years Degree in Computer Science at the University of Verona. Learning programming theory, algebra
                 and math.</p>
            </div>
            <div class="education-item-dates">
              2011 - 2014
            </div>
          </div>
          <div class="education-item">
            <div class="image"
                 [style.background]="'url(assets/' + (loadedAssets$ | async)?.italianLogo?.path + ')'"></div>
            <br>
            <div class="education-item-title">
              High school diploma, Accountant Developer
            </div>
            <div class="education-item-subtitle">
              <app-link link="https://www.copernicopasoli.edu.it/wordpress/"
                        target="_blank">I.T.I.S Aldo Pasoli
              </app-link>
              <p>5 years diploma as Accountant and Programmer, learned first programming basis and
                 economic/financial theory.</p>
            </div>
            <div class="education-item-dates">
              2006 - 2011
            </div>
          </div>
        </div>
        <div id="works">
          <h2> Works </h2>
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
                <app-link link="https://www.addvalue.it/"
                          target="_blank">AddValue
                </app-link>
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
                <app-link link="https://www.vas.it/"
                          target="_blank">VAS
                </app-link>
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
                <app-link link="https://www.slowmedia.it/"
                          target="_blank">SLOWMEDIA
                </app-link>
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
                <app-link href="https://www.e-leads.it/"
                          target="_blank">ELEADS
                </app-link>
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
                <app-link link="https://www.e-leads.it/"
                          target="_blank">ELEADS
                </app-link>
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
        <div id="skills">
          <h2>My skills</h2>
          <h3>Development</h3>
          <div class="skills-container">
            <app-skills-item
              *ngFor="let skill of DEVELOPMENT_SKILLS; trackBy: trackByFn"
              [title]="skill.title"
              [description]="skill.description"
              [icon]="skill.icon"
            ></app-skills-item>
          </div>
          <br><br>
          <h3>Framework and Engines</h3>
          <div class="skills-container">
            <app-skills-item
              *ngFor="let skill of FRAMEWORK_SKILLS; trackBy: trackByFn"
              [title]="skill.title"
              [description]="skill.description"
              [icon]="skill.icon"
            ></app-skills-item>
          </div>
          <br><br>
          <h3>Tools</h3>
          <div class="skills-container">
            <app-skills-item
              *ngFor="let skill of TOOLS_SKILLS; trackBy: trackByFn"
              [title]="skill.title"
              [description]="skill.description"
              [icon]="skill.icon"
            ></app-skills-item>
          </div>
        </div>
        <div id="more">
          <h2>What to see next</h2>
          <span>
            There are a lot of things to see now, here there are some links to my social and projects:
          </span>
          <div class="more-links">
            <app-link [link]="'https://www.linkedin.com/in/nicola-castellani-313b9084/'">LinkedIn</app-link>
            <app-link [link]="'https://www.youtube.com/channel/UC7NzbI1ti8ePGzmOkX5byTA'">YouTube</app-link>
            <app-link [link]="'https://github.com/NicolaLC'">GitHub</app-link>
            <app-link [link]="'https://gitlab.com/nicolacastellanidev'">GitLab</app-link>
            <app-link [link]="'https://amazingsurprise.itch.io'">itch.io</app-link>
            <app-link [link]="'https://www.codingame.com/profile/a854de0c07f757bbde5aba79f11aecf21492014'">CodinGame
            </app-link>
            <app-link [link]="'https://soundcloud.com/nicola-castellani-372867834'">SoundCloud</app-link>
            <app-link [link]="'https://twitter.com/amazingsurpr1se'">Twitter</app-link>
            <app-link [link]="'https://dev.to/nicolalc'">Dev.to</app-link>
            <app-link [link]="'https://dribbble.com/NicolaLC'">Dribbble</app-link>
            <app-link id="downloadCV"
                      [icon]="faDownload"
                      [link]="'assets/CV-2022.pdf'">
              Curriculum Vitae
            </app-link>
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

  faDownload = faDownload;
  faPhone = faPhone;
  faMail = faMailBulk;
  DEVELOPMENT_SKILLS = DEVELOPMENT_SKILLS;
  FRAMEWORK_SKILLS = FRAMEWORK_SKILLS;
  TOOLS_SKILLS = TOOLS_SKILLS;

  ids = ['intro', 'story', 'education', 'works', 'skills', 'more'];

  @ViewChild('welcomeRight', {static: true}) welcomeRight: ElementRef;
  private scrollTimeout: any;

  constructor(private store$: Store<any>) {}

  scrollTo(elementId) {
    this.welcomeRight.nativeElement.querySelector(`#${ elementId }`).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  trackByFn(it, i) { return i; }

  onScroll($event: Event) {
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.afterScroll(($event.target as any).scrollTop);
    }, 100);
  }

  afterScroll(scrollTop: number) {
    this.ids.forEach(id => {
      const element = document.querySelector(`#${ id }`) as any;
      if ( !element ) {
        return;
      }
      if ( scrollTop >= element.offsetTop - 500 ) {
        document.querySelector(`.${ id }-anchor`).classList.add('active');
      } else {
        document.querySelector(`.${ id }-anchor`).classList.remove('active');
      }
    });
  }
}
