import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
  path: 'patient-add',
  loadChildren: () => import('./app.module').then(m => m.AppModule)
  },
    {
  path: 'patient-list',
  loadChildren: () => import('./app.module').then(m => m.AppModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
