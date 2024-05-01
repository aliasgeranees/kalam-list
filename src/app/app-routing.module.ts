import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MadehComponent } from './madeh/madeh.component';

const routes: Routes = [
  { path : ':name' , component : MadehComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {  
  
}
