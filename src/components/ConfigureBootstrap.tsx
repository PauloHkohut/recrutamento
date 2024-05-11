'use client';

import { useEffect } from 'react';

export default function ConfigureBootstrap() {
    useEffect(() => {
        // Carrega o bootstrap javascript após iniciar a página (lazy-load).
        import('bootstrap');
    }, []);

    return <></>;
}
