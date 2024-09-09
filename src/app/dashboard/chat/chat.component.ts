import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  chatUserId: string = '';
  currentUserId: string = ''; // Actual logged-in user ID
  chatUserName: string = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chatUserId = this.route.snapshot.paramMap.get('userId')!;
    this.currentUserId = localStorage.getItem('userId')!; // Fetch logged-in user ID from local storage or auth service

    this.chatService.joinRoom(this.currentUserId);

    this.chatService.onMessageReceived().subscribe((message: any) => {
      this.messages.push(message);
    });

    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.fetchChatHistory(this.chatUserId).subscribe(
      (messages) => {
        this.messages = messages;

        if (messages.length > 0) {
          // Set the chatUserName based on who the chat is with
          const firstMessage = messages[0];
          if (firstMessage.senderId._id === this.currentUserId) {
            this.chatUserName = firstMessage.recipientId.userName;
          } else {
            this.chatUserName = firstMessage.senderId.userName;
          }
        } else {
          // If there are no messages, you might want to fetch the user's name directly
          this.chatUserName = 'Chat User'; // Or fetch it using another API call
        }
      },
      (error) => {
        console.error('Error fetching chat history:', error);
      }
    );
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.currentUserId, this.chatUserId, this.newMessage);
      this.newMessage = '';
      this.loadMessages()
    }
  }
}
