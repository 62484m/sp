import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react';
import { Product } from '../data';

interface ProductViewerProps {
    product: Product;
    onClose: () => void;
}

export default function ProductViewer({ product, onClose }: ProductViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [allPreloaded, setAllPreloaded] = useState(false);

    // Preload strategy: wait for the *first* image to load so we can show it ASAP.
    // Meanwhile, preload everything.
    useEffect(() => {
        setLoadedImages(new Set());
        setAllPreloaded(false);

        const preloadImage = (src: string, index: number) => {
            return new Promise<void>((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    setLoadedImages((prev) => new Set(prev).add(index));
                    resolve();
                };
                img.onerror = () => {
                    // Treat as loaded to prevent indefinite spinning
                    setLoadedImages((prev) => new Set(prev).add(index));
                    resolve();
                };
            });
        };

        // Preload all
        Promise.all(product.images.map((src, idx) => preloadImage(src, idx))).then(() => {
            setAllPreloaded(true);
        });

    }, [product]);

    const next = () => setCurrentIndex((i) => (i + 1) % product.images.length);
    const prev = () => setCurrentIndex((i) => (i - 1 + product.images.length) % product.images.length);

    // Can we show the current image?
    const isCurrentLoaded = loadedImages.has(currentIndex);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-zinc-950 flex flex-col"
        >
            <header className="flex items-center justify-between p-6 md:p-8 text-white absolute top-0 w-full z-50 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl md:text-2xl tracking-[0.15em] font-light">{product.name}</h2>
                    <p className="text-xs text-zinc-400 font-mono tracking-widest">
                        {currentIndex + 1} / {product.images.length}
                    </p>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-3 hover:bg-white/10 rounded-full transition-colors active:scale-95"
                >
                    <X className="w-6 h-6" />
                </button>
            </header>

            <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 mt-16 md:mt-0">
                {!isCurrentLoaded ? (
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-8 h-8 text-white animate-spin opacity-50" />
                        <span className="text-zinc-500 text-sm tracking-widest uppercase">Loading HD</span>
                    </div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={product.images[currentIndex]}
                            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="max-h-full max-w-full object-contain shadow-2xl"
                        />
                    </AnimatePresence>
                )}
            </div>

            {product.images.length > 1 && (
                <>
                    <button 
                        onClick={prev} 
                        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
                    >
                        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button 
                        onClick={next} 
                        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all active:scale-90"
                    >
                        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </>
            )}

            {!allPreloaded && isCurrentLoaded && (
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 text-xs tracking-widest uppercase flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Preloading HD assets...
                </div>
            )}
        </motion.div>
    );
}
