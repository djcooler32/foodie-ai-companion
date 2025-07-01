
/// <reference path="../types/speech.d.ts" />

export interface VoiceCommand {
  intent: string;
  entities: Record<string, string>;
  confidence: number;
}

export class VoiceAssistantService {
  private isListening = false;
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis | null = null;

  async initialize() {
    try {
      // Check if Web Speech API is available
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        this.recognition = new SpeechRecognitionConstructor();
        this.recognition!.continuous = false;
        this.recognition!.interimResults = false;
        this.recognition!.lang = 'en-US';
        console.log('Speech recognition initialized');
      }

      if ('speechSynthesis' in window) {
        this.synthesis = window.speechSynthesis;
        console.log('Speech synthesis initialized');
      }

      return this.recognition !== null;
    } catch (error) {
      console.error('Failed to initialize voice assistant:', error);
      return false;
    }
  }

  async startListening(): Promise<string> {
    if (this.isListening || !this.recognition) return '';
    
    return new Promise((resolve) => {
      this.isListening = true;
      
      this.recognition!.onresult = (event) => {
        const result = event.results[0][0].transcript;
        this.isListening = false;
        resolve(result);
      };

      this.recognition!.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isListening = false;
        resolve('');
      };

      this.recognition!.onend = () => {
        this.isListening = false;
      };

      try {
        this.recognition!.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        this.isListening = false;
        resolve('');
      }
    });
  }

  async speak(text: string) {
    if (!this.synthesis) {
      console.warn('Speech synthesis not available');
      return;
    }

    try {
      // Cancel any ongoing speech
      this.synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      this.synthesis.speak(utterance);
    } catch (error) {
      console.error('Text to speech error:', error);
    }
  }

  parseCommand(text: string): VoiceCommand {
    const lowerText = text.toLowerCase();
    
    // Add food item commands
    if (lowerText.includes('add') && (lowerText.includes('food') || lowerText.includes('item'))) {
      const foodMatch = lowerText.match(/add (.+?) to/);
      const food = foodMatch ? foodMatch[1] : '';
      return {
        intent: 'add_food',
        entities: { food },
        confidence: 0.8
      };
    }

    // Check expiring items
    if (lowerText.includes('expiring') || lowerText.includes('expire')) {
      return {
        intent: 'check_expiring',
        entities: {},
        confidence: 0.9
      };
    }

    // Meal suggestions
    if (lowerText.includes('meal') && (lowerText.includes('suggest') || lowerText.includes('recommend'))) {
      const mealType = lowerText.match(/(breakfast|lunch|dinner)/)?.[1] || 'any';
      return {
        intent: 'suggest_meal',
        entities: { mealType },
        confidence: 0.8
      };
    }

    // Grocery list
    if (lowerText.includes('grocery') && lowerText.includes('list')) {
      return {
        intent: 'grocery_list',
        entities: {},
        confidence: 0.8
      };
    }

    return {
      intent: 'unknown',
      entities: {},
      confidence: 0.1
    };
  }
}

export const voiceAssistant = new VoiceAssistantService();
