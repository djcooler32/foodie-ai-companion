
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { VoiceCommandHandler } from './VoiceCommandHandler';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantButtonProps {
  onAddFood?: (food: string) => void;
  onCheckExpiring?: () => void;
  onSuggestMeal?: (mealType: string) => void;
  onGroceryList?: () => void;
}

const VoiceAssistantButton = ({
  onAddFood,
  onCheckExpiring,
  onSuggestMeal,
  onGroceryList
}: VoiceAssistantButtonProps) => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  
  const voiceHandler = VoiceCommandHandler({
    onAddFood,
    onCheckExpiring,
    onSuggestMeal,
    onGroceryList
  });

  const handleVoiceActivation = async () => {
    if (!voiceHandler.isInitialized) {
      toast({
        title: "Voice Assistant Unavailable",
        description: "Voice recognition is not available on this device or permission was denied.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) return;

    try {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Say your command now",
      });

      const voiceInput = await voiceHandler.startListening();
      
      if (voiceInput) {
        await voiceHandler.processVoiceInput(voiceInput);
      } else {
        toast({
          title: "No speech detected",
          description: "Please try again and speak clearly",
        });
      }
    } catch {
      toast({
        title: "Voice Error",
        description: "Failed to process voice command",
        variant: "destructive"
      });
    } finally {
      setIsListening(false);
    }
  };

  return (
    <Button
      onClick={handleVoiceActivation}
      disabled={isListening}
      variant={isListening ? "secondary" : "default"}
      size="sm"
      className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
    >
      {isListening ? (
        <>
          <MicOff className="h-4 w-4 mr-2" />
          Listening...
        </>
      ) : (
        <>
          <Mic className="h-4 w-4 mr-2" />
          Voice Assistant
        </>
      )}
    </Button>
  );
};

export default VoiceAssistantButton;
