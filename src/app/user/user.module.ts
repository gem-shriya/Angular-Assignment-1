import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';




@NgModule({
  declarations: [
    UserComponent,
    CreateComponent,
    ViewComponent,
    
  
  ],
  imports: [
    CommonModule,
    UserRoutingModule, ReactiveFormsModule, 
  ]
})
export class UserModule { }
