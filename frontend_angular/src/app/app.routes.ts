import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TutorialsPageComponent } from './pages/tutorials-page/tutorials-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { TutorialPageComponent } from './pages/tutorial-page/tutorial-page.component';
import { AccountActivationComponent } from './pages/account-activation/account-activation.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'signup',
        component: SignUpComponent,
        title: 'Sign Up'
    },
    {
        path: 'tutorials',
        component: TutorialsPageComponent,
        title: 'Tutorials',
    },
    {
        path: 'upload',
        component: UploadPageComponent,
        title: 'Upload',
        canActivate: [authGuard]
    },
    {
        path: 'activate-account',
        component: AccountActivationComponent,
        title: 'Activate Account'
    },
    {
        path: 'tutorials/:id',
        component: TutorialPageComponent,
        title: 'Tutorial',
        canActivate: [authGuard]
    }
];
