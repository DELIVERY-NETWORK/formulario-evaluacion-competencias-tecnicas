import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];
  constructor() {}

  show(
    message: string,
    classname: string = 'bg-primary text-white',
    delay: number = 3000
  ) {
    const toast = { message, classname };
    this.toasts.push(toast);

    setTimeout(() => this.remove(toast), delay);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
