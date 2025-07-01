
import { SpeechRecognition } from '@capacitor/speech-recognition';
import { TextToSpeech } from '@capacitor/text-to-speech';

export interface VoiceCommand {
  intent: string;
  entities: Record<string, string>;
  confidence: number;
}

export class VoiceAssistantService {
  private isListening = false;

  async initialize() {
    try {
      const permission = await SpeechRecognition.requestPermissions();
      if (permission.speechRecognition === 'granted') {
        console.log('Speech recognition permission granted');
        return true;
      }
    } catch (error) {
      console.error('Failed to initialize voice assistant:', error);
    }
    return false;
  }

  async startListening(): Promise<string> {
    if (this.isListening) return '';
    
    try {
      this.isListening = true;
      const result = await SpeechRecognition.start({
        language: 'en-US',
        maxResults: 1,
        prompt: 'Say something...',
        partialResults: false,
        popup: false,
      });

      this.isListening = false;
      return result.matches?.[0] || '';
    } catch (error) {
      this.isListening = false;
      console.error('Speech recognition error:', error);
      return '';
    }
  }

  async speak(text: string) {
    try {
      await TextToSpeech.speak({
        text,
        lang: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        category: 'ambient',
      });
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
