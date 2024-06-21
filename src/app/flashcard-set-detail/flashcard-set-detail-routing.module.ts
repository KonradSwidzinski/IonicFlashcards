import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashcardSetDetailComponent } from './flashcard-set-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FlashcardSetDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlashcardSetDetailRoutingModule {}
