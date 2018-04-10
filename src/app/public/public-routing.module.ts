import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareComponent } from './share.component';

const routes: Routes = [
  {
    path: 'share',
    component: ShareComponent,
    // children: [
    //   {
    //     // path: 'recipe',
    //     // component: DashboardComponent
    //   },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
