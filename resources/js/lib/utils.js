import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function toUrl(url) {
    return typeof url === 'string' ? url : url.url;
}


/**
 * Prefix a public asset path with the base the site is served from. Laravel
 * serves from `/`; the static build may live under a sub-path such as
 * `/landingpage/` on GitHub Pages.
 */
export function asset(path) {
    const base = import.meta.env.VITE_ASSET_BASE || '/';

    return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
