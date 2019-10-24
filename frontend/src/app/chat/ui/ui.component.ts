import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service'

export interface Message {
  sender?: string;
  message: string;
  data?: Date;
  //score: number;
}

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  message: string;
  result: Message[]

  constructor(private chatBot: BotService) {
    this.initBoot()
  }
  ngOnInit() {
  }

  initBoot() {
    this.result = []
    this.chatBot.getResponse('')
      .subscribe((list: any) => {
        list.result.fulfillment.messages.forEach((element) => {
          this.result.push({ sender: 'boot', message: element.speech, data: list.timestamp })
        });
      })
  }

  sendMessage() {
    this.result.push({ sender: 'th', message: this.message, data: new Date() })
    this.chatBot.getResponse(this.removerAccents(this.message))
      .subscribe((list: any) => {
        list.result.fulfillment.messages.forEach((element) => {
          this.result.push({ sender: 'boot', message: element.speech, data: list.timestamp })
          
          console.log(list)
          console.log("score :"+list.result.score)
        });
      })

    this.message = '';
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  private removerAccents(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

}
