import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info } from 'lucide-react';

interface TranscriptionAreaProps {
  transcript: string[];
  isListening: boolean;
  permissionStatus?: PermissionState;
  isMobile: boolean;
}

export function TranscriptionArea({ transcript, isListening, permissionStatus, isMobile }: TranscriptionAreaProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg sm:text-xl font-semibold">Transcription</h2>
        {isListening && (
          <Badge variant="secondary" className="animate-pulse">
            Listening...
          </Badge>
        )}
        {permissionStatus === 'denied' && (
          <Badge variant="destructive">
            Microphone Access Denied
          </Badge>
        )}
        {isMobile && (
          <Badge variant="secondary" className="flex gap-1 items-center">
            <Info className="h-3 w-3" />
            Mobile Mode
          </Badge>
        )}
      </div>
      
      <ScrollArea className="h-48 sm:h-64 rounded-md border p-3 sm:p-4">
        <div className="space-y-2">
          {transcript.map((text, index) => (
            <p key={index} className="text-sm text-gray-600 dark:text-gray-300">
              {text}
            </p>
          ))}
          {transcript.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              {isMobile 
                ? "Tap the microphone and allow access. Keep the app in focus while speaking..."
                : "Tap the microphone to begin transcription..."}
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}