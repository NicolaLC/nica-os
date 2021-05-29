import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NicaOSComponent} from './views/nica-o-s.component';
import {AssetsResolver} from './assets.resolver';


const routes: Routes = [
  {
    path: '',
    component: NicaOSComponent,
    resolve: {
      assets: AssetsResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
