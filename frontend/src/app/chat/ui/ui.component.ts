import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service'
import { ToastrService } from 'ngx-toastr'

export interface Message {
  sender?: string;
  message: string;
  data?: Date;
  score: string;
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
  _score: string;
  constructor(
    private chatBot: BotService,
    private toast : ToastrService
    ) {
    this.initBoot()
  }
  ngOnInit() {
  }

  initBoot() {
    this.result = []
    this.chatBot.getResponse('')
      .subscribe((list: any) => {
        list.result.fulfillment.messages.forEach((element) => {
          this.result.push({ sender: 'boot', message: element.speech, data: list.timestamp ,score : list.result.score})
        });
      })
  }

  sendMessage() {
    this.result.push({ sender: 'eu', message: this.message, data: new Date() , score: '' })
    this.chatBot.getResponse(this.removerAccents(this.message))
      .subscribe((list: any) => {
        list.result.fulfillment.messages.forEach((element) => {
          this.result.push({ sender: 'boot', message: element.speech, data: list.timestamp ,score : list.result.score })
          // this.toast.info('score :'+list.result.score)  
          // console.log(list)
          // console.log("score :"+list.result.score)
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
