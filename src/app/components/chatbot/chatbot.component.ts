import { Component } from '@angular/core';
import { ChatbotService } from '../../shared/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding:1rem">
      <h3>Chatbot</h3>
      <div *ngFor="let m of messages">{{m}}</div>
      <input [(ngModel)]="text" placeholder="Say something..." />
      <button (click)="send()">Send</button>
    </div>
  `,
  providers: [ChatbotService]
})
export class ChatbotComponent {
  text = '';
  messages: string[] = [];

  constructor(private svc: ChatbotService) {}

  send() {
    if (!this.text) return;
    this.messages.push('You: ' + this.text);
    this.svc.sendMessage(this.text).subscribe((res) => this.messages.push('Bot: ' + (res?.reply ?? JSON.stringify(res))));
    this.text = '';
  }
}
