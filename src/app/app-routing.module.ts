import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './Components/Callback/callback.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ShareComponent } from './Components/share/share.component';

const routes: Routes = [
  // ... your other routes
  { path: '', component: LandingPageComponent },
  {path:'share', component: ShareComponent},
  { path: 'callback', component: CallbackComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
