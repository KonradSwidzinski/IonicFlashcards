import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class FlashcardSetService {
  private apiUrl = 'https://flashcardsrestapi.azurewebsites.net/api/FlashcardSets';

  constructor(private http: HttpClient) { }

  add(flashcardSet: any): Observable<any> {
    return this.http.post(this.apiUrl + '/Add', flashcardSet, { withCredentials: true });
  }

  addMultipleFlashcards(setId: number, flashcards: any[]): Observable<any> {
    const payload = {
      id: setId,
      flashcards: flashcards.map(f => ({
        question: f.term,
        answer: f.definition
      }))
    };
    return this.http.post(this.apiUrl + '/AddMultipleFlashcards', payload, { withCredentials: true });
  }


  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetById/${id}`);
  }

  getFlashcardSetsByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetByUserId/${userId}`);
  }

  updateFlashcardSet(setId: number, set: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update/${setId}`, set, { withCredentials: true });
  }

  deleteFlashcardSet(setId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${setId}`, { withCredentials: true });
  }
  getFlashcardsBySetId(setId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetById/${setId}`, { withCredentials: true });
  }

}
