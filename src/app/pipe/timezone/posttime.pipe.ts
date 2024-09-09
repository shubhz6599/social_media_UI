import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posttime'
})
export class PosttimePipe implements PipeTransform {

  transform(value: string): string {
    const now = new Date();
    const postDate = new Date(value);
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInMs / (1000 * 60));
      return `${minutes} min ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hr ago`;
    } else if (diffInDays < 3) {
      return `${Math.floor(diffInDays)}d ago`;
    } else {
      const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
      return postDate.toLocaleDateString('en-US', options);
    }
  }
}
