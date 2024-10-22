import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TutorialsPageComponent } from './tutorials-page/tutorials-page.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { TutorialPageComponent } from './tutorial-page/tutorial-page.component';

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
        title: 'Tutorials'
    },
    {
        path: 'upload',
        component: UploadPageComponent,
        title: 'Upload'
    },
    {
        path: 'tutorial/:id',
        component: TutorialPageComponent,
        title: 'Tutorial'
    }
];
