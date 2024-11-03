import { Injectable } from '@angular/core';
import { TutorialIcon } from '../utils/tutorial-icon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialServiceService {
  url = 'http://localhost:3000/tutorials'

  constructor(private http: HttpClient) {}

  getAllTutorialIcons(): Observable<TutorialIcon[]> {
      return this.http.get<TutorialIcon[]>(this.url);
  }

  async getTutorialIcons(query: string) {

  }
}
