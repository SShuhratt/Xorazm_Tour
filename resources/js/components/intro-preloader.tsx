import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface IntroPreloaderProps {
    onComplete?: () => void;
}

export default function IntroPreloader({ onComplete }: IntroPreloaderProps) {
    const [showIntro, setShowIntro] = useState<boolean | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const introPlayed = sessionStorage.getItem('introPlayed');
        if (introPlayed === 'true') {
            setShowIntro(false);
            if (onComplete) onComplete();
        } else {
            setShowIntro(true);
        }
    }, [onComplete]);

    useEffect(() => {
        if (showIntro) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showIntro]);

    useEffect(() => {
        if (showIntro && videoRef.current) {
            videoRef.current.muted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Preloader: Autoplay was prevented by browser:", error);
                });
            }
        }
    }, [showIntro]);

    const handleSkip = () => {
        console.log("Preloader: Skip button clicked.");
        sessionStorage.setItem('introPlayed', 'true');
        setShowIntro(false);
        if (onComplete) onComplete();
    };

    const handleVideoEnd = () => {
        console.log("Preloader: Video ended event fired. Current time:", videoRef.current?.currentTime);
        if (videoRef.current && videoRef.current.currentTime < 1) {
            console.warn("Preloader: Video ended event ignored because currentTime is < 1 second.");
            return;
        }
        sessionStorage.setItem('introPlayed', 'true');
        setShowIntro(false);
        if (onComplete) onComplete();
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
            console.log("Preloader: Mute toggled. New state:", videoRef.current.muted);
        }
    };

    if (showIntro === null || typeof document === 'undefined') {
        return null;
    }

    return createPortal(
        <AnimatePresence>
            {showIntro && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[9999] bg-navy flex items-center justify-center overflow-hidden"
                >
                    <video
                        ref={videoRef}
                        src="/XT_content/animations/XTATintroanimation.mp4?v=100"
                        autoPlay
                        muted
                        playsInline
                        onPlay={() => console.log("Preloader: Video event - Play")}
                        onPlaying={() => console.log("Preloader: Video event - Playing")}
                        onEnded={handleVideoEnd}
                        onError={(e) => console.error("Preloader: Video event - Error", e)}
                        onCanPlay={() => console.log("Preloader: Video event - CanPlay")}
                        className="relative z-50 w-full h-full max-w-[95vw] max-h-[90vh] md:max-w-[85vw] md:max-h-[85vh] object-contain"
                    />

                    {/* Bottom Right: Skip Intro Button */}
                    <div className="absolute bottom-8 right-8 z-50 flex items-center gap-4">
                        {/* Audio Controls */}
                        <button
                            onClick={toggleMute}
                            className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 rounded-full backdrop-blur-md transition-all duration-300"
                            aria-label={isMuted ? 'Unmute intro video' : 'Mute intro video'}
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <button
                            onClick={handleSkip}
                            className="px-6 py-3 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 rounded-full font-sans text-xs font-bold uppercase tracking-widest backdrop-blur-md transition-all duration-300"
                        >
                            Skip Intro
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
