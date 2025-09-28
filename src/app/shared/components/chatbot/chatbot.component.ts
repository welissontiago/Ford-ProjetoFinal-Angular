import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  inject,
} from '@angular/core';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-chatbot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatbox') private chatboxContainer!: ElementRef;

  private chatbotService = inject(ChatbotService);

  isChatOpen = false;
  isLoading = false;
  userInput = '';
  messages: Message[] = [];
  animationClass = '';

  characterGif = '/nina/ezgif.com-crop (1).gif';
  private entryGif =
    ' /nina/Animao_de_Sada_de_Personagem_Fofo-ezgif.com-optimize.gif';
  private exitGif = '/nina/Animao_de_Personagem_Ps_Modal-ezgif.com-cut.gif';
  private loopGif = '/nina/ezgif.combomeraang-reverse (1).gif';

  ngOnInit() {
    this.startConversation();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatboxContainer.nativeElement.scrollTop =
        this.chatboxContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  private startConversation() {
    this.isLoading = true;
    this.chatbotService.startChat().then((initialMessage) => {
      this.messages.push({ text: initialMessage, sender: 'bot' });
      this.isLoading = false;
    });
  }

  openChat() {
    this.characterGif = this.entryGif;
    setTimeout(() => {
      this.isChatOpen = true;
      this.animationClass = 'modal-enter';
      this.characterGif = this.loopGif;
    }, 4000);
  }

  closeChat() {
    this.animationClass = 'modal-exit';
    setTimeout(() => {
      this.isChatOpen = false;
      this.characterGif = this.exitGif;
      setTimeout(() => {
        this.characterGif = '/nina/ezgif.com-crop (1).gif';
      }, 2500);
    }, 500);
  }

  resetChat() {
    this.isLoading = true;
    this.messages = [];
    this.startConversation();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  async sendMessage() {
    const userMessage = this.userInput.trim();
    if (!userMessage || this.isLoading) return;

    this.messages.push({ text: userMessage, sender: 'user' });
    this.userInput = '';
    this.isLoading = true;

    const ninaResponse = await this.chatbotService.sendMessage(userMessage);

    this.messages.push({ text: ninaResponse, sender: 'bot' });
    this.isLoading = false;
  }
}
