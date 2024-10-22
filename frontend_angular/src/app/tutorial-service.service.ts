import { Injectable } from '@angular/core';
import { TutorialIcon } from './tutorial-icon';

@Injectable({
  providedIn: 'root'
})
export class TutorialServiceService {
  url = 'http://localhost:3000/tutorials'

  constructor() {}

  async getAllTutorialIcons(): Promise<TutorialIcon[]> {
      const data = await fetch(this.url);
      return await data.json() ?? [];
  }

  async getTutorialIcons(query: string) {

  }
}
