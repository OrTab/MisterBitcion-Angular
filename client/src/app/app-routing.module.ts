import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsPageComponent } from './pages/contact-details-page/contact-details-page.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactResolverService } from './services/contact/contact-resolver.service';

const routes: Routes = [
  { path: 'contact', component: ContactPageComponent },
  { path: 'contact/:id', component: ContactDetailsPageComponent, resolve: { contact: ContactResolverService }, runGuardsAndResolvers: 'paramsChange' },
  { path: 'edit', component: ContactEditComponent },
  { path: 'statistics', component: StatisticPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'profile', component: ProfileComponent, resolve: { user: ContactResolverService }, runGuardsAndResolvers: 'paramsChange' },
  { path: 'profile/edit/:id', component: ContactEditComponent, resolve: { user: ContactResolverService }, runGuardsAndResolvers: 'paramsChange' },

  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
