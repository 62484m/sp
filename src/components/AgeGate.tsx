import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

interface AgeGateProps {
    onConfirm: () => void;
    onReject: () => void;
}

export default function AgeGate({ onConfirm, onReject }: AgeGateProps) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-md w-full p-8 text-center bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl"
            >
                <div className="w-16 h-16 mx-auto mb-6 bg-zinc-800 rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-zinc-300" />
                </div>
                <h1 className="mb-4 text-2xl font-medium tracking-wider text-white">年龄确认</h1>
                <p className="mb-10 text-zinc-400 text-sm leading-relaxed">
                    本网站包含超清的产品实拍图片，部分内容可能要求您已满18周岁才能浏览。请确认您的年龄。
                </p>
                <div className="flex flex-col gap-3">
                    <button 
                        onClick={onConfirm} 
                        className="w-full px-6 py-3.5 font-medium text-black transition-all bg-white rounded-xl hover:bg-zinc-200 active:scale-[0.98]"
                    >
                        是的，我已满18岁
                    </button>
                    <button 
                        onClick={onReject} 
                        className="w-full px-6 py-3.5 font-medium transition-all border rounded-xl text-zinc-300 border-zinc-700 hover:bg-zinc-800 active:scale-[0.98]"
                    >
                        未满18岁，离开网站
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
