import React from 'react';
import { AnimatePresence, motion } from "framer-motion";

function LoginWrapper({ children }) {
    const isLoginPage = children.type.name === 'MemberLogin';

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
        <div style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', minHeight: '100vh' }}>
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
        </div>
    );
}

export default LoginWrapper;
