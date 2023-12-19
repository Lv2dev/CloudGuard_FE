import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

function DefaultWrapper({ children }) {
    const isLoginPage = children.type.name === 'FileExplorer';

    const variants = {
        enter: {
            x: isLoginPage ? '-100%' : '100%',
            opacity: 0
        },
        center: {
            x: 0,
            opacity: 1
        },
        exit: {
            x: isLoginPage ? '100%' : '-100%',
            opacity: 0
        }
    };

    return (
            <AnimatePresence mode={'wait'}>
                <motion.div
                    key={children.type.name}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 100, damping: 20 },
                        opacity: { duration: 0.4, ease: "easeInOut" }
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
    );
}

export default DefaultWrapper;
