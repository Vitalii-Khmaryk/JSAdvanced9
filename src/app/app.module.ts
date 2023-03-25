import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormsModule } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { provideAuth, getAuth } from '@angular/fire/auth';

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { SharedModule } from './shared/shared.module';
import { TelDialogComponent } from './components/tel-dialog/tel-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AuthDialogComponent,
     TelDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(()=>getFirestore()),
    provideAuth(()=>getAuth()),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
