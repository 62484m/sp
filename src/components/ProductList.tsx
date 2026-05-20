import { motion } from 'motion/react';
import { products, Product } from '../data';

interface ProductListProps {
    onSelect: (product: Product) => void;
}

export default function ProductList({ onSelect }: ProductListProps) {
    return (
        <div className="max-w-4xl mx-auto px-6 py-20 pb-32">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-baseline gap-4 border-b border-zinc-200 pb-8"
            >
                <h1 className="text-4xl md:text-5xl font-light tracking-[0.1em] text-zinc-900">产品实拍</h1>
                <p className="text-zinc-400 tracking-[0.2em] uppercase text-xs font-medium">Original Gallery</p>
            </motion.div>

            <div className="flex flex-col">
                {products.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="group cursor-pointer flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-100 py-8 px-4 -mx-4 rounded-xl hover:bg-zinc-50 transition-colors"
                        onClick={() => onSelect(product)}
                    >
                        <h3 className="text-2xl font-light tracking-wider text-zinc-800 group-hover:text-black transition-colors">{product.name}</h3>
                        <p className="text-sm text-zinc-400 mt-3 md:mt-0 font-light tracking-wide">{product.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
