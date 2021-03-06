import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './home/shell/shell.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: ShellComponent, children: [
    {path: 'welcome', component: WelcomeComponent},
    {path: 'products', loadChildren:'./products/product.module#ProductModule'},
    {path: '', redirectTo: 'welcome', pathMatch: 'full'}
  ]},
  {path:'**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
