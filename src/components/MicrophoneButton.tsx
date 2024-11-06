import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
}

export function MicrophoneButton({ isListening, onClick }: MicrophoneButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full transition-all duration-200 active:scale-95 hover:scale-105 touch-manipulation ${
        isListening ? 'bg-red-100 border-red-400 dark:bg-red-900 dark:border-red-700' : ''
      }`}
      onClick={onClick}
    >
      {isListening ? (
        <MicOff className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 dark:text-red-400" />
      ) : (
        <Mic className="h-8 w-8 sm:h-10 sm:w-10" />
      )}
    </Button>
  );
}