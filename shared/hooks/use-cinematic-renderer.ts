// shared/hooks/use-cinematic-renderer.ts
/**
 * @file use-cinematic-renderer.ts
 * @description Hook "cerebro" para la lógica del motor "Aether".
 *              v2.2.0: Integra la lógica para audio espacial 3D sincronizado.
 * @version 2.2.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useVideoTexture } from "@react-three/drei";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { logger } from "@/shared/lib/logging";
import type {
  PositionalAudio as PositionalAudioImpl,
  VideoTexture,
} from "three";

export type PlaybackEventType =
  | "play"
  | "pause"
  | "seek"
  | "ended"
  | "volumechange";
export interface PlaybackEvent {
  type: PlaybackEventType;
  timestamp: number;
  duration: number;
  visitorId: string;
}
export interface ProgressState {
  currentTime: number;
  duration: number;
}

interface CinematicRendererProps {
  src: string;
  audioSrc?: string; // Audio es opcional
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPlaybackEvent?: (event: PlaybackEvent) => void;
}

export interface CinematicRendererHook {
  videoTexture: VideoTexture;
  audioRef: React.RefObject<PositionalAudioImpl>;
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  progress: ProgressState;
  togglePlay: () => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  onSeek: (time: number) => void;
}

export function useCinematicRenderer({
  src,
  containerRef,
  onPlaybackEvent,
  audioSrc,
}: CinematicRendererProps): CinematicRendererHook {
  logger.info("[useCinematicRenderer] Hook inicializado (v2.2 - Audio 3D).");

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressState>({
    currentTime: 0,
    duration: 0,
  });
  const videoTexture = useVideoTexture(src);
  const audioRef = useRef<PositionalAudioImpl>(null);

  useEffect(() => {
    const getVisitorId = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setVisitorId(result.visitorId);
        logger.success(
          `[Fingerprint] ID de visitante generado: ${result.visitorId}`
        );
      } catch (error) {
        logger.error("[Fingerprint] Fallo al generar el ID de visitante.", {
          error,
        });
      }
    };
    getVisitorId();
  }, []);

  const dispatchEvent = useCallback(
    (type: PlaybackEventType) => {
      if (onPlaybackEvent && visitorId) {
        const video = videoTexture.image as HTMLVideoElement;
        onPlaybackEvent({
          type,
          timestamp: video.currentTime,
          duration: video.duration,
          visitorId,
        });
      }
    },
    [onPlaybackEvent, videoTexture, visitorId]
  );

  const togglePlay = useCallback(() => setIsPlaying((prev) => !prev), []);
  const toggleMute = useCallback(() => setIsMuted((prev) => !prev), []);

  const toggleFullscreen = useCallback(() => {
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        logger.error("Error al intentar entrar en pantalla completa", { err });
      });
    } else {
      document.exitFullscreen();
    }
  }, [containerRef]);

  const onSeek = useCallback(
    (time: number) => {
      const video = videoTexture.image as HTMLVideoElement;
      video.currentTime = time;

      const audio = audioRef.current;
      if (audio && audio.source && audio.source.buffer) {
        // Detenemos el audio actual, ajustamos el offset y lo reiniciamos
        audio.stop();
        audio.offset = time;
        if (isPlaying) {
          audio.play();
        }
      }
      dispatchEvent("seek");
    },
    [videoTexture, dispatchEvent, isPlaying]
  );

  useEffect(() => {
    const video = videoTexture.image as HTMLVideoElement;
    const handleTimeUpdate = () =>
      setProgress((p) => ({ ...p, currentTime: video.currentTime }));
    const handleDurationChange = () => {
      if (!isNaN(video.duration)) {
        setProgress((p) => ({ ...p, duration: video.duration }));
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    if (video.duration) {
      handleDurationChange();
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
    };
  }, [videoTexture]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const videoElement = videoTexture.image as HTMLVideoElement;
    const audioObject = audioRef.current;

    if (isPlaying) {
      videoElement
        .play()
        .catch((e) => logger.warn("Autoplay de vídeo bloqueado.", { e }));
      if (audioObject?.source && !audioObject.isPlaying) {
        audioObject.play();
      }
    } else {
      videoElement.pause();
      if (audioObject?.isPlaying) {
        audioObject.pause();
      }
    }

    if (audioObject) {
      audioObject.setVolume(isMuted ? 0 : 1);
    }
    videoElement.muted = true; // El vídeo siempre está silenciado, el audio lo maneja Web Audio API.
  }, [isPlaying, isMuted, videoTexture]);

  useEffect(() => {
    const video = videoTexture.image as HTMLVideoElement;
    const handlePlay = () => dispatchEvent("play");
    const handlePause = () => dispatchEvent("pause");
    const handleEnded = () => dispatchEvent("ended");
    const handleVolumeChange = () => dispatchEvent("volumechange");

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("volumechange", handleVolumeChange);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [videoTexture, dispatchEvent]);

  return {
    videoTexture,
    audioRef, // Exponemos la ref para que el componente de la escena la use
    isPlaying,
    isMuted,
    isFullscreen,
    progress,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    onSeek,
  };
}
// shared/hooks/use-cinematic-renderer.ts
