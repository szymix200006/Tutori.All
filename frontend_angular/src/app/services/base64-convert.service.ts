import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Base64ConvertService {
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
  }

  async convertFilesToBase64(file: File): Promise<string> {
    const base64 = await this.fileToBase64(file);
    return base64;
  }

  async convertArrayFilesToBase64(files: File[]): Promise<string[]> {
    const base64Files: string[] = [];
    for (const file of files) {
        const base64 = await this.fileToBase64(file);
        base64Files.push(base64);
    }
    return base64Files;
}
}
