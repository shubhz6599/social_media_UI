import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  token: string | any = '';
  likedPosts: Set<string> = new Set();
  postText: string = ''; // To hold post text input
  selectedFile: File | null = null; // To hold the selected file

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  async fetchPosts() {
    this.token = localStorage.getItem('authtoken');
    if (this.token) {
      const userId = JSON.parse(atob(this.token.split('.')[1])).id;

      await this._apiService.getPosts(this.token).subscribe({
        next: (data: any) => {
          this.posts = data;
          this.updateLikedPosts(userId);
          this.sortPostsForUser(userId); // Call the sorting method after fetching posts
        },
        error: (err: any) => {
          console.error('Error fetching posts:', err);
        }
      });
    }
  }

  updateLikedPosts(userId: string) {
    this.likedPosts.clear();
    this.posts.forEach(post => {
      if (post.likes.includes(userId)) {
        this.likedPosts.add(post._id);
      }
    });
  }

  sortPostsForUser(userId: string): void {
    // Sort posts: move liked posts to the end
    this.posts.sort((a, b) => {
      const aLiked = a.likes.includes(userId);
      const bLiked = b.likes.includes(userId);
      return aLiked === bLiked ? 0 : aLiked ? 1 : -1;
    });
  }

  getImageUrl(imagePath: string): string {
    return `${environment.ogApi}/${imagePath.replace('\\', '/')}`;
  }

  likePost(postId: string): void {
    this.token = localStorage.getItem('authtoken');
    if (this.token) {
      this._apiService.likePost(postId, this.token).subscribe(
        (response: any) => {
          const post = this.posts.find(p => p._id === postId);
          if (post) {
            const userId = JSON.parse(atob(this.token.split('.')[1])).id;
            const index = post.likes.indexOf(userId);
            if (index === -1) {
              // User hasn't liked yet, so add the like
              post.likes.push(userId);
              this.likedPosts.add(postId);
            } else {
              // User already liked, so remove the like
              post.likes.splice(index, 1);
              this.likedPosts.delete(postId);
            }
          }
          // Re-sort posts after liking/unliking
          this.sortPostsForUser(JSON.parse(atob(this.token.split('.')[1])).id);
        },
        (error: any) => {
          console.error('Error liking post', error);
        }
      );
    }
  }

  isLiked(postId: string): boolean {
    return this.likedPosts.has(postId);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && this.isValidFileType(file)) {
      this.selectedFile = file;
    } else {
      alert('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
      this.selectedFile = null;
    }
  }

  isValidFileType(file: File): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    return allowedExtensions.test(file.name);
  }

  createPost(): void {
    if (!this.postText) {
      alert('Please enter something to post.');
      return;
    }

    const formData = new FormData();
    formData.append('title', 'test');
    formData.append('content', this.postText);
    formData.append('category', 'post');
    if (!this.selectedFile) {
      formData.append('image', '');
    }
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.token = localStorage.getItem('authtoken');
    if (this.token) {
      this._apiService.createPost(formData, this.token).subscribe({
        next: (data: any) => {
          alert('Post created successfully!');
          this.postText = '';
          this.selectedFile = null;
          this.fetchPosts(); // Refresh the posts after creating a new one
        },
        error: (err: any) => {
          console.error('Error creating post:', err);
        }
      });
    }
  }
}
