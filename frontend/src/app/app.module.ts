import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NicaOSComponent} from '@views/nica-o-s.component';
import {StoreModule} from '@ngrx/store';
import {appReducer} from '@appstore/app.reducer';
import {AppEffects} from '@appstore/app.effects';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {AssetsService} from '@services/assets.service';
import {HttpClientModule} from '@angular/common/http';
import {SafePipe} from '@pipes/safe.pipe';
import {TaskBarComponent} from '@components/taskbar.component';
import {fileExplorerReducer} from '@applications/file-explorer/store/file-explorer.reducer';
import {DesktopComponent} from '@components/desktop.component';
import {DesktopIconDirective} from '@directives/desktop-icon.directive';
import {LoaderComponent} from '@components/loader.component';
import {ConsoleComponent} from '@applications/console.component';
import {TaskbarItemDirective} from '@directives/taskbar-item.directive';
import {WindowComponent} from '@components/window.component';
import {BrowserComponent} from '@applications/browser.component';
import {FileExplorerComponent} from '@applications/file-explorer/file-explorer.component';
import {WelcomeComponent} from '@applications/welcome/welcome.component';
import {MenuComponent} from '@components/menu.component';
import {ThemeService} from '@services/theme.service';
import {UtilityService} from '@services/utility.service';
import {TextEditorComponent} from '@applications/text-editor/text-editor.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CommonsModule} from './commons/commons.module';
import {TextEditorService} from '@applications/text-editor/text-editor.service';
import {KnightsAndMonstersComponent} from '@applications/knights-and-monsters/knights-and-monsters.component';
import {ButtonDirective} from '@directives/button.directive';
import {RandomNameGeneratorComponent} from '@applications/random-name-generator/random-name-generator';
import {LinkComponent} from '@components/link.component';
import {TooltipComponent} from '@components/tooltip.component';
import {SkillsItemComponent} from '@applications/welcome/skills-item.component';

const components = [
  NicaOSComponent,
  TaskBarComponent,
  LoaderComponent,
  DesktopComponent,
  WindowComponent,
  WelcomeComponent,
  ConsoleComponent,
  MenuComponent,
  BrowserComponent,
  FileExplorerComponent,
  TextEditorComponent,
  KnightsAndMonstersComponent,
  RandomNameGeneratorComponent,
  LinkComponent,
  TooltipComponent,
  SkillsItemComponent
];

const directives = [
  TaskbarItemDirective,
  DesktopIconDirective,
  ButtonDirective
];

const pipes = [
  SafePipe
];

const services = [
  ThemeService,
  AssetsService,
  UtilityService,
  TextEditorService
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
    FormsModule,
    FontAwesomeModule,
    CommonsModule,
    StoreModule.forRoot({app: appReducer, fs: fileExplorerReducer}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule {}
