
import "../types/speech.d.ts"
import { trackEvent } from '../lib/analytics'

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
        const SpeechRecognitionConstructor =
          (window as Window & {
            SpeechRecognition?: new () => SpeechRecognition
            webkitSpeechRecognition?: new () => SpeechRecognition
          }).SpeechRecognition ??
          (window as Window & {
            SpeechRecognition?: new () => SpeechRecognition
            webkitSpeechRecognition?: new () => SpeechRecognition
          }).webkitSpeechRecognition;
        if (SpeechRecognitionConstructor) {
          this.recognition = new SpeechRecognitionConstructor();
        }
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
      let resolved = false;

      const cleanup = () => {
        if (!this.recognition) return;
        this.recognition.onresult = null;
        this.recognition.onerror = null;
        this.recognition.onend = null;
      };

      this.recognition!.onresult = (event) => {
        const result = event.results[0][0].transcript;
        trackEvent('voice_recognized')
        resolved = true;
        this.isListening = false;
        cleanup();
        resolve(result);
      };

      this.recognition!.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        trackEvent('voice_error', { error: event.error })
        resolved = true;
        this.isListening = false;
        cleanup();
        resolve('');
      };

      this.recognition!.onend = () => {
        this.isListening = false;
        trackEvent('voice_end')
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve('');
        }
      };

      try {
        this.recognition!.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        this.isListening = false;
        cleanup();
        if (!resolved) resolve('');
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
      trackEvent('voice_speak')
    } catch (error) {
      console.error('Text to speech error:', error);
    }
  }

  parseCommand(text: string): VoiceCommand {
    const lowerText = text.toLowerCase();
    
    // Add food item commands
    if (
      lowerText.includes('add') &&
      (lowerText.includes('food') ||
        lowerText.includes('item') ||
        lowerText.includes('inventory'))
    ) {
      const foodMatch = lowerText.match(/add (.+?)(?: to|$)/);
      const food = foodMatch ? foodMatch[1] : '';
      trackEvent('voice_intent', { intent: 'add_food' })
      return {
        intent: 'add_food',
        entities: { food },
        confidence: 0.8
      };
    }

    // Check expiring items
    if (lowerText.includes('expiring') || lowerText.includes('expire')) {
      trackEvent('voice_intent', { intent: 'check_expiring' })
      return {
        intent: 'check_expiring',
        entities: {},
        confidence: 0.9
      };
    }

    // Meal suggestions
    if (
      (lowerText.includes('suggest') || lowerText.includes('recommend')) &&
      (lowerText.includes('meal') || /(breakfast|lunch|dinner)/.test(lowerText))
    ) {
      const mealType = lowerText.match(/(breakfast|lunch|dinner)/)?.[1] || 'any';
      trackEvent('voice_intent', { intent: 'suggest_meal' })
      return {
        intent: 'suggest_meal',
        entities: { mealType },
        confidence: 0.8
      };
    }

    // Grocery list
    if (lowerText.includes('grocery') && lowerText.includes('list')) {
      trackEvent('voice_intent', { intent: 'grocery_list' })
      return {
        intent: 'grocery_list',
        entities: {},
        confidence: 0.8
      };
    }

    trackEvent('voice_intent', { intent: 'unknown' })
    return {
      intent: 'unknown',
      entities: {},
      confidence: 0.1
    };
  }
}

export const voiceAssistant = new VoiceAssistantService();
