import { Component, ViewChild, ElementRef , OnInit } from '@angular/core';
import { BotService } from '../../services/bot.service'

export interface Message {
  remetente?: string;
  mensagem: string;
  data?: Date;

}

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  msg: string;
  resultados: Message[]

  constructor(private chatBoot: BotService) {
    this.initBoot()
  }
  ngOnInit() {
  }

  initBoot() {
    this.resultados = []
    this.chatBoot.getResponse('')
      .subscribe((lista: any) => {
        lista.result.fulfillment.messages.forEach((element) => {
          this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp })
        });
      })
  }

  sendMessage() {
    this.resultados.push({ remetente: 'th', mensagem: this.msg, data: new Date() })
    this.chatBoot.getResponse(this.removerAcentos(this.msg))
      .subscribe((lista: any) => {
        lista.result.fulfillment.messages.forEach((element) => {
          this.resultados.push({ remetente: 'boot', mensagem: element.speech, data: lista.timestamp })
        });
      })

    this.msg = '';
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  private removerAcentos(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

}
