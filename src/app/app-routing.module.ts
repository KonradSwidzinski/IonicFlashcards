import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { trigger, transition, style, query, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),
    query(':enter', [
      animate('0.5s ease', style({ opacity: 1 }))
    ], { optional: true })
  ])
]);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: { animation: 'HomePage' }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: { animation: 'AuthPage' }
  },
  {
    path: 'create-flashcard-set',
    loadChildren: () => import('./create-flashcard-set/create-flashcard-set.module').then(m => m.CreateFlashcardSetModule),
    data: { animation: 'CreateFlashcardSetPage' }
  },
  {
    path: 'flashcard-set/:id',
    loadChildren: () => import('./flashcard-set-detail/flashcard-set-detail.module').then(m => m.FlashcardSetDetailModule),
    data: { animation: 'FlashcardSetDetailPage' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
