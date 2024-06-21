import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { FlashcardSetDetailComponent } from './flashcard-set-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FlashcardSetDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FlashcardSetDetailComponent]
})
export class FlashcardSetDetailModule {}
