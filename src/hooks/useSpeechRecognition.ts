import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<PermissionState>();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const interimTranscriptRef = useRef<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Unavailable",
        description: "Your browser doesn't support speech recognition. Please try Chrome browser.",
        variant: "destructive"
      });
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening Started",
        description: "Speak now...",
      });
    };

    recognition.onresult = (event) => {
      const results = Array.from(event.results);
      let finalTranscript = '';

      for (const result of results) {
        const transcript = result[0].transcript;
        if (result.isFinal) {
          finalTranscript += transcript + ' ';
        }
      }

      if (finalTranscript && finalTranscript !== interimTranscriptRef.current) {
        interimTranscriptRef.current = finalTranscript;
        setTranscript(prev => [...prev, finalTranscript.trim()]);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      let errorMessage = "There was an error with the speech recognition.";
      if (event.error === 'no-speech') {
        errorMessage = "No speech was detected. Please try again.";
      } else if (event.error === 'network') {
        errorMessage = "Network error occurred. Please check your connection.";
      } else if (event.error === 'not-allowed') {
        errorMessage = "Microphone access was denied. Please check your browser settings.";
      }
      
      toast({
        title: "Speech Recognition Error",
        description: errorMessage,
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
      interimTranscriptRef.current = '';
    };

    recognitionRef.current = recognition;

    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then((result) => {
        setPermissionStatus(result.state);
        result.onchange = () => setPermissionStatus(result.state);
      });

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      recognitionRef.current?.start();
    } catch (error) {
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use speech recognition.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const resetTranscript = () => {
    setTranscript([]);
  };

  return {
    isListening,
    transcript,
    permissionStatus,
    startListening,
    stopListening,
    resetTranscript
  };
}