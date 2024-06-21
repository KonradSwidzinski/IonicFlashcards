import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardSetService } from '../services/flashcard-set.service';

@Component({
  selector: 'app-flashcard-set-detail',
  templateUrl: './flashcard-set-detail.component.html',
  styleUrls: ['./flashcard-set-detail.component.scss'],
})
export class FlashcardSetDetailComponent implements OnInit {
  flashcards: any[] = [];
  currentFlashcardIndex = 0;
  isFlipped = false;
  setId!: number;

  constructor(
    private route: ActivatedRoute,
    private flashcardSetService: FlashcardSetService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.setId = +params.get('id')!;
      this.loadFlashcards();
    });
  }

  loadFlashcards() {
    this.flashcardSetService.getFlashcardsBySetId(this.setId).subscribe(
      (data) => {
        this.flashcards = data.flashcards;
      },
      (error) => {
        console.error('Error fetching flashcards:', error);
      }
    );
  }

  flipFlashcard() {
    this.isFlipped = !this.isFlipped;
  }

  previousFlashcard() {
    if (this.currentFlashcardIndex > 0) {
      this.currentFlashcardIndex--;
      this.animateFlashcard('previous');
    }
  }

  nextFlashcard() {
    if (this.currentFlashcardIndex < this.flashcards.length - 1) {
      this.currentFlashcardIndex++;
      this.animateFlashcard('next');
    }
  }

  animateFlashcard(direction: 'next' | 'previous') {
    const flashcard = document.querySelector('.flashcard');
    if (flashcard) {
      flashcard.classList.add(direction);
      setTimeout(() => {
        flashcard.classList.remove(direction);
      }, 500);
    }
  }
}
