/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import AgeGate from './components/AgeGate';
import ClosedScreen from './components/ClosedScreen';
import ProductList from './components/ProductList';
import ProductViewer from './components/ProductViewer';
import { Product } from './data';

export default function App() {
    const [isAgeVerified, setAgeVerified] = useState<boolean | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const verified = sessionStorage.getItem('ageVerified');
        if (verified === 'true') {
            setAgeVerified(true);
        }
    }, []);

    const handleConfirmAge = () => {
        sessionStorage.setItem('ageVerified', 'true');
        setAgeVerified(true);
    };

    const handleRejectAge = () => {
        setAgeVerified(false);
        try {
            window.close();
        } catch (e) {
            // Context ignores error
        }
    };

    if (isAgeVerified === false) {
        return <ClosedScreen />;
    }

    return (
        <div className="min-h-screen bg-white selection:bg-zinc-200">
            <AnimatePresence>
                {isAgeVerified === null && (
                    <AgeGate 
                        key="age-gate" 
                        onConfirm={handleConfirmAge} 
                        onReject={handleRejectAge} 
                    />
                )}
            </AnimatePresence>

            {isAgeVerified === true && (
                <>
                    <ProductList onSelect={setSelectedProduct} />
                    <AnimatePresence>
                        {selectedProduct && (
                            <ProductViewer
                                key="viewer"
                                product={selectedProduct}
                                onClose={() => setSelectedProduct(null)}
                            />
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}
