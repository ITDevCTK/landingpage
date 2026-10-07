import { useEffect } from 'react';

/**
 * Minimal replacement for Inertia's <Head> that works in both the Inertia
 * app and the static build. It only manages the document title.
 */
export function Head({ title }) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title]);

    return null;
}
