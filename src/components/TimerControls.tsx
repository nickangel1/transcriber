import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MicrophoneButton } from './MicrophoneButton';

interface TimerControlsProps {
  isListening: boolean;
  onReset: () => void;
  onMicrophoneToggle: () => void;
}

export function TimerControls({ isListening, onReset, onMicrophoneToggle }: TimerControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      <MicrophoneButton 
        isListening={isListening} 
        onClick={onMicrophoneToggle}
      />
      
      <Button
        variant="outline"
        size="lg"
        className="w-16 h-16 sm:w-24 sm:h-24 rounded-full transition-all duration-200 active:scale-95 hover:scale-105 touch-manipulation"
        onClick={onReset}
      >
        <RotateCcw className="h-8 w-8 sm:h-10 sm:w-10 text-black dark:text-white" />
      </Button>
    </div>
  );
}