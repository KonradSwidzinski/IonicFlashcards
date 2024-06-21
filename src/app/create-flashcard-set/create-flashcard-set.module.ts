import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { CreateFlashcardSetComponent } from './create-flashcard-set.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFlashcardSetComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateFlashcardSetComponent]
})
export class CreateFlashcardSetModule { }
