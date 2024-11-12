import { Injectable } from '@angular/core';
import { TutorialIcon } from '../utils/tutorial-icon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TutorialRequest } from '../utils/tutorial-request';
import { environment } from '../utils/environment';
import { ApiPaths } from '../utils/api-paths';

@Injectable({
  providedIn: 'root'
})
export class TutorialServiceService {
  url = 'http://localhost:3000/tutorials'
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllTutorialIcons(): Observable<TutorialIcon[]> {
      return this.http.get<TutorialIcon[]>(this.url);
  }

  async getTutorialIcons(query: string) {

  }

  saveTutorial(tutorialRequest: TutorialRequest): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}${ApiPaths.SAVE_TUTORIAL}`, tutorialRequest);
  }
}
