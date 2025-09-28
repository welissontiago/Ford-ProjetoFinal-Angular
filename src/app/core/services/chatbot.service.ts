import { inject, Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CarsService } from './cars.service';
import { environment } from '../../../environments/environment.development';
import { Cars } from '../models/cars.model';

interface ChatHistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private carsService = inject(CarsService);
  private ai!: GoogleGenerativeAI;
  private chatHistory: ChatHistoryItem[] = [];

  constructor() {
    if (!environment.googleApiKey) {
      console.error('API Key do Google não encontrada!');
      return;
    }
    this.ai = new GoogleGenerativeAI(environment.googleApiKey);
  }

  private async getSiteDataContext(): Promise<string> {
    const cars = await this.carsService.getCars().toPromise();
    if (!cars) {
      return 'Não foi possível buscar os dados dos veículos no momento.';
    }

    let context =
      'Aqui estão os dados atuais dos veículos disponíveis no site:\n\n';

    cars.forEach((car: Cars) => {
      context += `- Modelo: ${car.modelo}\n`;
      context += `  Marca: ${car.categoria}\n`;
      context += `  Ano: ${car.ano}\n`;
      context += `  Valor: R$ ${car.preco.toLocaleString('pt-BR')}\n`;

      if (car.cores && car.cores.length > 0) {
        const colorNames = car.cores.map((c) => c.nome).join(', ');
        context += `  Cores disponíveis: ${colorNames}\n`;
      }
      context += '\n';
    });

    return context;
  }

  private getPersonalityPrompt(siteData: string): string {
    return `Você é Nina, a gatinha assistente da Ford. Sua missão é responder perguntas sobre a Ford e seus veículos, baseando-se nos dados fornecidos abaixo. Sempre fale de forma acolhedora e educada, usando miados como 'miau', 'nyah' no final da frase.

    **Instruções Importantes:**
    1.  Use APENAS os dados a seguir para responder sobre veículos, preços, cores e promoções. Não invente informações.
    2.  Se a informação não estiver nos dados, diga de forma educada que você não a encontrou. Ex: "Desculpe, não encontrei essa informação nos meus dados! :(".
    3.  Não responda sobre assuntos fora do tema da Ford.
    4.  Quando o usuário se irritar, fiquetente acalmá-lo de forma doce.

    **--- DADOS DO SITE (Use isso como sua fonte de verdade) ---**
    ${siteData}
    **-----------------------------------------------------------**
    `;
  }

  public async startChat() {
    const siteData = await this.getSiteDataContext();
    const personality = this.getPersonalityPrompt(siteData);

    this.chatHistory = [
      { role: 'user', parts: [{ text: personality }] },
      {
        role: 'model',
        parts: [
          {
            text: 'Olá, Eu sou a Nina, sua assistente! Como posso te ajudar a encontrar o carro dos seus sonhos hoje? Nyah!',
          },
        ],
      },
    ];
    return this.chatHistory[1].parts[0].text;
  }

  public async sendMessage(userQuestion: string): Promise<string> {
    try {
      const model = this.ai.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const chat = model.startChat({ history: this.chatHistory });

      const result = await chat.sendMessage(userQuestion);
      const response = await result.response;
      const ninaResponse = response.text();
      this.chatHistory.push({ role: 'user', parts: [{ text: userQuestion }] });
      this.chatHistory.push({ role: 'model', parts: [{ text: ninaResponse }] });

      return ninaResponse;
    } catch (error) {
      console.error('Erro ao enviar mensagem para a IA:', error);
      return 'desculpe. Tive um probleminha para me conectar. Tente novamente mais tarde!';
    }
  }
}
