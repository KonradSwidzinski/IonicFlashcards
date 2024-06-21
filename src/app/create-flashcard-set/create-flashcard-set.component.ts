import { Component, OnInit } from '@angular/core';
import { FlashcardSetService } from '../services/flashcard-set.service';
import { Router } from '@angular/router';

interface Flashcard {
  term: string;
  definition: string;
}

@Component({
  selector: 'app-create-flashcard-set',
  templateUrl: './create-flashcard-set.component.html',
  styleUrls: ['./create-flashcard-set.component.scss'],
})
export class CreateFlashcardSetComponent implements OnInit {
  title: string = '';
  flashcards: Flashcard[] = [{ term: '', definition: '' }];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private flashcardSetService: FlashcardSetService,
    private router: Router
  ) {}

  ngOnInit() {}

  addFlashcard() {
    this.flashcards.push({ term: '', definition: '' });
  }

  removeFlashcard(index: number) {
    this.flashcards.splice(index, 1);
  }

  async createFlashcardSet() {
    console.log('Title:', this.title);
    console.log('Flashcards:', this.flashcards);
  
    const userId = localStorage.getItem('user') || '';
  
    try {
      const flashcardSet = await this.flashcardSetService.add({ name: this.title, userId }).toPromise();
      if (flashcardSet && flashcardSet.id) {
        const response = await this.flashcardSetService.addMultipleFlashcards(flashcardSet.id, this.flashcards).toPromise();
        if (response) {
          this.successMessage = 'Flashcard set added successfully!';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          }, 2000);
        }
      }
    } catch (error: any) {
      if (error.status === 200) {
        this.successMessage = 'Flashcard set added successfully!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }, 2000);
      } else {
        console.error('Error creating flashcard set:', error);
        this.errorMessage = 'Error creating flashcard set';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    }
  }
}  