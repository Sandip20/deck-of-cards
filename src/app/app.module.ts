import { DopdownDirective } from './shared/dropdown.directive';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './controllers/home/home.component';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { NgDragDropModule } from 'ng-drag-drop';
import { HeaderComponent } from './controllers/header/header.component';
import { LoginComponent } from './controllers/login/login.component';
import { SignupComponent } from './controllers/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './controllers/profile/profile.component'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClickToEditDirective } from './click-to-edit.directive';
import { Ng2ImgMaxModule } from 'ng2-img-max';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    DopdownDirective,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ClickToEditDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragAndDropModule,
    NgDragDropModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2ImgMaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
