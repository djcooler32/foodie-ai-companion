
import { useState, useEffect } from 'react';
import { voiceAssistant, VoiceCommand } from '@/services/voiceAssistant';
import { useToast } from '@/hooks/use-toast';

interface VoiceCommandHandlerProps {
  onAddFood?: (food: string) => void;
  onCheckExpiring?: () => void;
  onSuggestMeal?: (mealType: string) => void;
  onGroceryList?: () => void;
}

export const VoiceCommandHandler = ({
  onAddFood,
  onCheckExpiring,
  onSuggestMeal,
  onGroceryList
}: VoiceCommandHandlerProps) => {
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initVoiceAssistant = async () => {
      const initialized = await voiceAssistant.initialize();
      setIsInitialized(initialized);
    };
    
    initVoiceAssistant();
  }, []);

  const handleVoiceCommand = async (command: VoiceCommand) => {
    
    switch (command.intent) {
      case 'add_food':
        if (onAddFood && command.entities.food) {
          onAddFood(command.entities.food);
          await voiceAssistant.speak(`Added ${command.entities.food} to your inventory`);
        }
        break;
        
      case 'check_expiring':
        if (onCheckExpiring) {
          onCheckExpiring();
          await voiceAssistant.speak('Checking expiring items in your inventory');
        }
        break;
        
      case 'suggest_meal':
        if (onSuggestMeal) {
          const mealType = command.entities.mealType || 'any';
          onSuggestMeal(mealType);
          await voiceAssistant.speak(`Here are some ${mealType} suggestions based on your inventory`);
        }
        break;
        
      case 'grocery_list':
        if (onGroceryList) {
          onGroceryList();
          await voiceAssistant.speak('Here is your grocery list based on missing ingredients');
        }
        break;
        
      default:
        await voiceAssistant.speak('Sorry, I didn\'t understand that command. Try saying add food, check expiring items, or suggest meals.');
        toast({
          title: "Command not recognized",
          description: "Try: 'Add food to inventory', 'Check expiring items', or 'Suggest meals'",
        });
    }
  };

  const processVoiceInput = async (text: string) => {
    if (!text.trim()) return;
    
    const command = voiceAssistant.parseCommand(text);
    
    if (command.confidence > 0.5) {
      await handleVoiceCommand(command);
    } else {
      await voiceAssistant.speak('I didn\'t understand that. Please try again.');
      toast({
        title: "Command unclear",
        description: `I heard: "${text}" but couldn't understand the command.`,
      });
    }
  };

  return {
    isInitialized,
    processVoiceInput,
    startListening: voiceAssistant.startListening.bind(voiceAssistant),
    speak: voiceAssistant.speak.bind(voiceAssistant)
  };
};
