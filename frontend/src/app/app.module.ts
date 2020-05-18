import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NicaOSComponent} from './views/nica-o-s.component';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './store/app.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './store/app.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AssetsService} from './services/assets.service';
import {HttpClientModule} from '@angular/common/http';
import {SafePipe} from './pipes/safe.pipe';
import {TaskBarComponent} from './components/taskbar.component';
import {LoaderComponent} from './components/loader.component';
import {DesktopComponent} from './components/desktop.component';
import {WindowComponent} from './components/window.component';
import {WelcomeComponent} from './applications/welcome.component';
import {ConsoleComponent} from './applications/console.component';
import { TaskbarItemDirective } from './directives/taskbar-item.directive';
import {MenuComponent} from './components/menu.component';
import {DesktopIconDirective} from './directives/desktop-icon.directive';
import {BrowserComponent} from './applications/browser.component';
import {ThemeService} from './services/theme.service';

const components = [
  NicaOSComponent,
  TaskBarComponent,
  LoaderComponent,
  DesktopComponent,
  WindowComponent,
  WelcomeComponent,
  ConsoleComponent,
  MenuComponent,
  BrowserComponent
];

const directives = [
  TaskbarItemDirective,
  DesktopIconDirective
];

const pipes = [
  SafePipe
];

const services = [
  ThemeService,
  AssetsService
];

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    ...directives,
    ...pipes
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({app: appReducer}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
