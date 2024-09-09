// src/app/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/admin/registration.service';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {
    profilePicture: 'default-profile-pic.jpg',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    bio: ''
  };
  posts: any[] = [];
  isEditMode: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private registrationService: RegistrationService,
    private postService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadPosts();
  }

  loadUserData(): void {
    this.registrationService.getUserProfile().subscribe(
      (data: any) => {
        this.user = {
          ...this.user,
          ...data
        };
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  loadPosts(): void {
    const userId: any = localStorage.getItem('userId'); // or get it from auth service
    this.postService.getPostsByUser(userId).subscribe(
      (data: any[]) => {
        this.posts = data || [];
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile(): void {
    const formData = new FormData();
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('dob', this.user.dob);
    formData.append('bio', this.user.bio);

    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
    }

    const userId: any = localStorage.getItem('userId'); // or get it from auth service
    this.registrationService.updateUserProfile(userId, formData).subscribe(
      (response: any) => {
        console.log('Profile updated successfully:', response);
        this.toggleEditMode();
        this.loadUserData(); // Refresh user data after update
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe(
      () => {
        this.posts = this.posts.filter((post: any) => post._id !== postId);
        console.log('Post deleted:', postId);
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  getImageUrl(imagePath: string): string {
    return imagePath ? `${environment.ogApi}/${imagePath.replace('\\', '/')}` : 'default-image-url';
  }
}
