import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, selectLoadingMessage} from '../store/app.reducer';
import {TimelineMax} from 'gsap';
import {environment} from 'src/environments/environment';
import {skip} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-welcome',
  template: `
    <div id="welcome">
      <h1>Welcome to my personal website!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin ultricies tellus in maximus.
        Vestibulum dapibus placerat accumsan. Proin non aliquam nulla. Nam eu justo odio. Nulla neque tortor, luctus
        vitae sapien et, vulputate interdum lectus. Morbi ultricies, diam et posuere vestibulum, diam nisi placerat
        risus, pharetra vulputate ipsum purus vitae urna. Praesent est nisi, hendrerit nec sagittis nec, aliquet non
        odio. Duis mi ex, elementum ut ligula ac, maximus vulputate turpis. Nam laoreet nunc at aliquam mattis. Quisque
        sed ullamcorper diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

        Nam efficitur enim et massa congue viverra. In tincidunt nulla et aliquet semper. Aenean vestibulum orci
        dignissim auctor scelerisque. Sed rhoncus, lacus sed fringilla tincidunt, massa leo facilisis erat, et molestie
        tellus lectus vitae mi. Nunc vitae lacus arcu. Integer dictum turpis id nunc vestibulum condimentum. Fusce vitae
        tortor luctus, consequat lacus at, venenatis quam. Vivamus nibh felis, pharetra in velit vitae, lacinia finibus
        metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris suscipit odio mi, at finibus neque
        condimentum in. Aliquam vel neque sed nisi sodales posuere. Phasellus quis urna lacinia, fermentum tellus in,
        commodo ipsum. Maecenas egestas tellus nisl, a congue massa volutpat sed. Maecenas vel interdum augue.

        Mauris dapibus, mi a interdum dapibus, enim augue congue lorem, vitae placerat sem tellus sed purus. Curabitur
        laoreet, nulla interdum molestie convallis, dui nunc elementum magna, at fringilla massa lectus a sem. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum lacus magna,
        semper ut eros non, dictum faucibus eros. Morbi mattis vehicula odio, at tristique sapien viverra vel. Donec nec
        velit posuere, congue eros faucibus, molestie nisi. Ut pulvinar dolor ac lacus consequat, ac lobortis sapien
        gravida.

        Phasellus sollicitudin quam enim, id porttitor elit venenatis at. Duis molestie tellus et ipsum ultricies, quis
        laoreet diam dapibus. Praesent nec leo at enim dapibus posuere. Proin congue volutpat est, eu tincidunt arcu
        scelerisque sed. Proin turpis ante, consectetur ac auctor sit amet, dapibus sed mauris. Curabitur commodo, justo
        tempor venenatis interdum, lacus leo accumsan orci, nec blandit felis lectus eget lorem. Nam varius lacus luctus
        dignissim cursus. Proin ornare mi at gravida convallis. Aliquam imperdiet consectetur tincidunt. Mauris ut orci
        a eros imperdiet ultrices. Sed sed consequat orci. Pellentesque tempus aliquam commodo. Nam maximus sem vel
        fermentum tempus. Cras in tincidunt purus.

        Morbi ut porta purus. Aliquam accumsan et ipsum ut pretium. Ut erat nunc, bibendum non iaculis quis, efficitur
        non orci. Vivamus facilisis quam lectus, molestie faucibus sapien tristique id. Vivamus nec faucibus augue, et
        hendrerit odio. Donec venenatis efficitur ullamcorper. Sed non metus placerat, lacinia nisi vitae, sagittis
        nisl. Praesent tortor mauris, molestie vitae pellentesque id, imperdiet sit amet lorem. Phasellus elementum ut
        magna ut tristique. Aliquam viverra in lorem et feugiat. Proin porta, quam vitae malesuada ultricies, libero
        ante molestie lacus, vel consectetur erat diam eu sem.
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WelcomeComponent {
}
