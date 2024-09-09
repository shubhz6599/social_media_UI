import { Component } from '@angular/core';
import { FriendService } from '../../services/friendrequest/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {
  suggestions: any;
  constructor(private friendService: FriendService) { }
  onlineFriends: any[] = [];
  userId: string = '';
  friendRequests: any[] = [];
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || ''; // Replace with your actual method to get the user ID
    this.getFriendRequests();
    this.getSuggestions();
  }

  getSuggestions() {
    if (this.userId) {
      this.friendService.getSuggestions(this.userId).subscribe({
        next: (data: any) => {
          this.suggestions = data;
        },
        error: (err: any) => {
          console.error('Error fetching user suggestions:', err);
        }
      });
    }
  }


  getFriendRequests(): void {
    this.friendService.getFriendRequests(this.userId).subscribe({
      next: (data: any) => {
        this.friendRequests = data;
      },
      error: (err: any) => {
        console.error('Error fetching friend requests:', err);
      }
    });
  }

  sendFriendRequest(recipientId: string): void {
    this.friendService.sendFriendRequest(this.userId, recipientId).subscribe({
      next: () => {
        alert('Friend request sent!');
        this.getSuggestions()
      },
      error: (err: any) => {
        console.error('Error sending friend request:', err);
      }
    });
  }

  confirmFriendRequest(requestId: string): void {
    this.friendService.confirmFriendRequest(requestId).subscribe({
      next: () => {
        alert('Friend request accepted!');
        this.getFriendRequests(); // Refresh the list
      },
      error: (err: any) => {
        console.error('Error accepting friend request:', err);
      }
    });
  }

  rejectFriendRequest(requestId: string): void {
    this.friendService.rejectFriendRequest(requestId).subscribe({
      next: () => {
        alert('Friend request rejected!');
        this.getFriendRequests(); // Refresh the list
      },
      error: (err: any) => {
        console.error('Error rejecting friend request:', err);
      }
    });
  }
}
