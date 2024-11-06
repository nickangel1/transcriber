import { Card } from '@/components/ui/card';
import { TimerControls } from './TimerControls';
import { TranscriptionArea } from './TranscriptionArea';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useTimer } from '@/hooks/useTimer';
import { useMobileDetection } from '@/hooks/useMobileDetection';

export function Stopwatch() {
  const {
    isListening,
    transcript,
    permissionStatus,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();
  
  const { formatTime, resetTimer } = useTimer(isListening);
  const isMobile = useMobileDetection();

  const handleMicrophoneToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleReset = () => {
    stopListening();
    resetTimer();
    resetTranscript();
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl p-4 sm:p-8 space-y-6 sm:space-y-8 shadow-xl bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-bold font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 select-none">
            {formatTime()}
          </h1>
          
          <TimerControls 
            isListening={isListening}
            onMicrophoneToggle={handleMicrophoneToggle}
            onReset={handleReset}
          />
        </div>

        <TranscriptionArea 
          transcript={transcript}
          isListening={isListening}
          permissionStatus={permissionStatus}
          isMobile={isMobile}
        />
      </Card>
    </div>
  );
}