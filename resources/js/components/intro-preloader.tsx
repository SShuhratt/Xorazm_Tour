import { useEffect } from 'react';

interface IntroPreloaderProps {
    onComplete?: () => void;
}

/**
 * Intentionally non-blocking so initial hero content paints immediately for LCP and visitors.
 */
export default function IntroPreloader({ onComplete }: IntroPreloaderProps) {
    useEffect(() => {
        if (onComplete) {
            onComplete();
        }
    }, [onComplete]);

    return null;
}
