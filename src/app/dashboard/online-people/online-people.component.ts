import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlinePeopleService } from '../../services/online-people.service';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-online-people',
  templateUrl: './online-people.component.html',
  styleUrls: ['./online-people.component.css']
})
export class OnlinePeopleComponent implements OnInit {
  onlineUsers: any[] = []; // To store the list of users
  currentUserId: string = ''; // To store the logged-in user's ID

  constructor(private router: Router, private onlinePeople: OnlinePeopleService) { }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId')!; // Fetch logged-in user ID from local storage or auth service
    this.loadUsers();
  }

  loadUsers(): void {
    this.onlinePeople.getAllUsers().subscribe(
      (data: any[]) => {
        // Filter out the logged-in user from the list
        this.onlineUsers = data.filter(user => user._id !== this.currentUserId);
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  navigateToChat(userId: string): void {
    this.router.navigateByUrl(`/Dashboard/chat/${userId}`);
  }
  getImageUrl(imagePath: string): string {
    return imagePath ? `${environment.ogApi}/${imagePath.replace('\\', '/')}` : 'default-image-url';
  }
}
