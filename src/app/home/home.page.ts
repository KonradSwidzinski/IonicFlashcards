import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardSetService } from '../services/flashcard-set.service';

interface FlashcardSet {
  id: number;
  name: string;
  isEditing?: boolean;
  newName: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isLoggedIn = false;
  flashcardSets: FlashcardSet[] = [];

  constructor(private router: Router, private flashcardSetService: FlashcardSetService) { }

  ngOnInit() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadUserFlashcardSets();
    }

    // Listen for changes in login status
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  handleStorageChange(event: StorageEvent) {
    if (event.key === 'user') {
      this.checkLoginStatus();
      if (this.isLoggedIn) {
        this.loadUserFlashcardSets();
      } else {
        this.flashcardSets = [];
      }
    }
  }

  checkLoginStatus() {
    const user = localStorage.getItem('user');
    this.isLoggedIn = !!user;
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.flashcardSets = [];
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

  navigateToCreateFlashcardSet() {
    this.router.navigate(['/create-flashcard-set']);
  }

  navigateToFlashcardSet(setId: number) {
    this.router.navigate(['/flashcard-set', setId]);
  }

  loadUserFlashcardSets() {
    const userId = localStorage.getItem('user') || '';
    if (userId) {
      this.flashcardSetService.getFlashcardSetsByUserId(userId).subscribe(
        (data: FlashcardSet[]) => {
          this.flashcardSets = data.map((set: FlashcardSet) => ({ ...set, isEditing: false, newName: set.name }));
        },
        (error) => {
          console.error('Error fetching flashcard sets:', error);
        }
      );
    }
  }

  deleteSet(setId: number) {
    this.flashcardSetService.deleteFlashcardSet(setId).subscribe(
      () => {
        this.flashcardSets = this.flashcardSets.filter(set => set.id !== setId);
      },
      (error) => {
        console.error('Error deleting flashcard set:', error);
      }
    );
  }

  editSetTitle(set: FlashcardSet) {
    if (set.isEditing) {
      if (set.newName) {
        this.flashcardSetService.updateFlashcardSet(set.id, { ...set, name: set.newName }).subscribe(
          () => {
            set.name = set.newName;
            set.isEditing = false;
          },
          (error) => {
            console.error('Error updating flashcard set:', error);
          }
        );
      }
    } else {
      set.isEditing = true;
    }
  }
}
