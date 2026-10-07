import { Maximize2, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Head } from '@/components/head';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { asset } from '@/lib/utils';

const BRAND = 'CTK Incorporated';

const NAV = [
    { href: '#about', label: 'About' },
    { href: '#vehicles', label: 'Vehicles' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
];

const SERVICES = [
    {
        title: 'Armored vehicle manufacturing',
        body: 'New and previously owned NIJ Level 4 commercial and executive armored vehicles, built from ballistic-resistant materials and armored to your own threat assessment.',
    },
    {
        title: 'Armored vehicle leasing',
        body: 'Leasing options for banks, financial institutions, IT manufacturing firms, cash security companies, and security service providers that need secured transport.',
    },
    {
        title: 'Crew trade testing',
        body: 'Crews on leased vehicles are trade-tested with non-lethal training tools under experienced supervision, in line with government requirements.',
    },
    {
        title: 'Investigative services',
        body: 'Investigative support for institutions. Contact us to discuss what your organisation needs.',
    },
];

const AFFILIATIONS = [
    'Armored Services Association of the Philippines',
    'Philippine Society for Industrial Security',
    'ASIS International',
    'IOACIS',
    'UP-IRAA',
    'PSIS',
];

/*
 * Tile sizes are chosen so no photo is shown larger than its source. The two
 * low-resolution photos (fleet, crews) stay in small tiles; the high-resolution
 * vehicle cut-outs take the large ones.
 */
const GALLERY = [
    {
        src: asset('/images/armored-grey-front.png'),
        width: 1200,
        height: 916,
        alt: 'Grey armored van with bull bar, front three-quarter view',
        tag: 'Vehicle',
        caption: 'Armored van, front view',
        cutout: true,
        featured: true,
    },
    {
        src: asset('/images/guards-fleet.png'),
        width: 405,
        height: 272,
        alt: 'Uniformed vehicle crews standing in formation in front of armored vans',
        tag: 'Crews',
        caption: 'Vehicle crews with the fleet',
        photo: true,
        fill: true,
    },
    {
        src: asset('/images/fleet-lineup.png'),
        width: 392,
        height: 245,
        alt: 'A row of CTK armored vehicles parked side by side',
        tag: 'Fleet',
        caption: 'Part of the fleet',
        photo: true,
        fill: true,
    },
    {
        src: asset('/images/armored-head-on.jpg'),
        width: 1509,
        height: 1279,
        alt: 'Black armored van seen head-on, showing the armored windscreen and bull bar',
        tag: 'Vehicle',
        caption: 'Armored cab, head-on',
    },
    {
        src: asset('/images/armored-side.png'),
        width: 403,
        height: 257,
        alt: 'Black armored van, side view, with the ctkinc.net web address on the body',
        tag: 'Vehicle',
        caption: 'Cash-in-transit body',
        cutout: true,
    },
];

function GalleryCard({ item, onOpen }) {
    return (
        <figure className="group relative h-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/8 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_32px_48px_-28px_rgba(0,0,0,0.45)] motion-reduce:hover:translate-y-0 dark:ring-white/10">
            <button
                type="button"
                onClick={onOpen}
                aria-label={`Enlarge: ${item.caption}`}
                className="flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:ring-inset"
            >
                <div
                    className={`overflow-hidden ${item.fill ? 'aspect-[16/10] lg:aspect-auto lg:flex-1' : 'aspect-[16/10]'} ${
                        item.cutout ? 'bg-[radial-gradient(ellipse_at_center,white_0%,#eef0f3_100%)]' : ''
                    }`}
                >
                    <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none ${
                            item.photo ? 'object-cover' : 'object-contain p-5'
                        }`}
                    />
                </div>

                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {item.tag}
                </span>

                <figcaption
                    className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium ${
                        item.photo
                            ? 'bg-gradient-to-t from-black/75 via-black/35 to-transparent pt-10 text-white'
                            : 'border-t border-black/5 bg-white/85 text-foreground backdrop-blur-sm dark:text-neutral-900'
                    }`}
                >
                    <span>{item.caption}</span>
                    <Maximize2 className="size-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-80" aria-hidden="true" />
                </figcaption>
            </button>
        </figure>
    );
}

function GalleryLightbox({ item, onClose }) {
    return (
        <Dialog open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[calc(100%-2rem)] gap-3 border-0 bg-background p-3 sm:max-w-5xl">
                {item && (
                    <>
                        <div className={`overflow-hidden rounded-lg ${item.cutout ? 'bg-[radial-gradient(ellipse_at_center,white_0%,#eef0f3_100%)]' : 'bg-black'}`}>
                            <img src={item.src} alt={item.alt} width={item.width} height={item.height} className="mx-auto max-h-[78vh] w-auto max-w-full object-contain" />
                        </div>
                        <div className="px-1 pb-1">
                            <DialogTitle className="font-display text-base font-semibold">{item.caption}</DialogTitle>
                            <DialogDescription className="mt-1">{item.alt}</DialogDescription>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

const CONTACT = {
    address: ['3rd Floor, CTK Building II', '70 Nicanor Roxas Street, Banawe', 'Quezon City 1114, Philippines'],
    phones: ['(02) 7000-1169', '(02) 7719-0210'],
    fax: '(02) 8711-9514',
    email: 'admin@ctkinc.net',
    facebook: 'https://facebook.com/ctkinc/',
};

/** Opens a new Gmail message addressed to the company. */
const GMAIL_COMPOSE =
    'https://mail.google.com/mail/?view=cm&fs=1' +
    '&to=' + encodeURIComponent(CONTACT.email) +
    '&su=' + encodeURIComponent('Inquiry from the CTK Inc. website');

/* ---------- Motion helpers ---------- */

/** Marks the element visible the first time it scrolls into view. */
function useReveal() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;

        if (!('IntersectionObserver' in window)) {
            el.setAttribute('data-visible', '');
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.setAttribute('data-visible', '');
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}

function Reveal({ as: Tag = 'div', delay = 0, variant = '', className = '', children, ...props }) {
    const ref = useReveal();

    return (
        <Tag ref={ref} className={`reveal ${variant} ${className}`} style={{ '--reveal-delay': `${delay}ms` }} {...props}>
            {children}
        </Tag>
    );
}

/** True once the page has scrolled past the top. */
function useScrolled(offset = 8) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > offset);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [offset]);

    return scrolled;
}

/* ---------- Page ---------- */

export default function Welcome() {
    const scrolled = useScrolled();
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(null);

    return (
        <>
            <Head title="About CTK Incorporated" />

            <div className="min-h-dvh bg-background text-foreground">
                {/* Sticky header */}
                <header
                    className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
                        scrolled || menuOpen
                            ? 'border-b border-border bg-background/85 backdrop-blur-md'
                            : 'border-b border-transparent bg-background'
                    }`}
                >
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
                        <a href="#top" className="flex items-center" aria-label="CTK Incorporated, back to top" onClick={() => setMenuOpen(false)}>
                            <img src={asset('/images/ctk-logo.png')} alt="CTK Inc." width="1040" height="200" className="h-7 w-auto sm:h-9" />
                        </a>

                        <nav className="hidden items-center gap-1 sm:flex" aria-label="Sections">
                            {NAV.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-field hover:text-foreground dark:hover:bg-white/8"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <a
                                href={GMAIL_COMPOSE}
                                target="_blank"
                                rel="noreferrer"
                                className="ml-3 inline-flex h-9 items-center rounded-full bg-brand px-4 text-sm font-medium text-white transition-colors hover:bg-brand/90"
                            >
                                Email us
                            </a>
                        </nav>

                        <button
                            type="button"
                            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-field sm:hidden dark:hover:bg-white/8"
                            aria-expanded={menuOpen}
                            aria-controls="mobile-nav"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>

                    {menuOpen && (
                        <nav id="mobile-nav" className="border-t border-border bg-background px-5 py-3 sm:hidden" aria-label="Sections">
                            {NAV.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block rounded-md px-2 py-3 text-base text-foreground hover:bg-field dark:hover:bg-white/8"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    )}
                </header>

                {/* Hero */}
                <section id="top" className="relative overflow-hidden bg-brand-deep text-white">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-10 -left-6 font-display text-[18rem] leading-none font-bold tracking-tighter text-white/5 select-none sm:text-[26rem]"
                    >
                        CTK
                    </span>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/25 to-transparent" />

                    <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_1.15fr] lg:gap-6 lg:pt-24">
                        <div className="pb-6 lg:pb-28">
                            <p className="animate-in fade-in slide-in-from-bottom-2 font-display text-lg font-medium text-white/70 duration-700 fill-mode-both motion-reduce:animate-none">
                                See the difference.
                            </p>
                            <h1 className="mt-4 animate-in fade-in slide-in-from-bottom-4 font-display text-5xl leading-[1.02] font-semibold tracking-tight text-balance delay-100 duration-700 fill-mode-both sm:text-6xl motion-reduce:animate-none">
                                Armored vehicles, built and crewed in the Philippines.
                            </h1>
                            <p className="mt-6 max-w-lg animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-white/75 delay-200 duration-700 fill-mode-both motion-reduce:animate-none">
                                CTK Incorporated manufactures NIJ Level 4 armored vehicles and leases them, with trained crews, to banks and
                                institutions that value transportation security.
                            </p>
                            <div className="mt-10 flex animate-in fade-in slide-in-from-bottom-4 flex-wrap gap-3 delay-300 duration-700 fill-mode-both motion-reduce:animate-none">
                                <a
                                    href={GMAIL_COMPOSE}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-medium text-white shadow-[0_8px_24px_-8px_rgba(200,16,46,0.8)] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none motion-reduce:hover:translate-y-0"
                                >
                                    Email us
                                </a>
                                <a
                                    href="#vehicles"
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/30 px-7 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
                                >
                                    See the vehicles
                                </a>
                            </div>
                        </div>

                        <div className="animate-in fade-in slide-in-from-right-8 delay-200 duration-1000 fill-mode-both motion-reduce:animate-none">
                            <img
                                src={asset('/images/armored-black-front.png')}
                                alt="Black CTK armored van, front three-quarter view, with bull bar and armored windscreen"
                                width="1600"
                                height="1176"
                                fetchPriority="high"
                                className="float mx-auto w-full max-w-2xl object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.5)] lg:-mb-12 lg:max-w-none"
                            />
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
                    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
                        {/* Text column */}
                        <div>
                            <Reveal as="h2" variant="reveal-left" className="font-display text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                                A Filipino company that builds and leases armored vehicles.
                            </Reveal>

                            <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted-foreground">
                                <Reveal as="p" delay={80}>
                                    CTK Incorporated is a 100% Filipino corporation based in Quezon City. Our primary business is
                                    manufacturing quality, reliable armored vehicles. Our secondary business is leasing them to institutions
                                    that value transportation security.
                                </Reveal>
                                <Reveal as="p" delay={160}>
                                    Every vehicle is built to the U.S. Justice Department's NIJ standards, with mandatory testing
                                    throughout production. The company is managed and staffed by young but seasoned security professionals
                                    who are responsive to each client's requirements.
                                </Reveal>
                            </div>

                            <Reveal delay={240} className="mt-8">
                                <a href="#services" className="inline-flex items-center gap-2 font-medium text-brand underline-offset-4 hover:underline">
                                    What we do
                                </a>
                            </Reveal>
                        </div>

                        {/* Image column */}
                        <Reveal variant="reveal-scale" delay={120} className="relative lg:justify-self-end">
                            <figure className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/8 dark:ring-white/10">
                                <img
                                    src={asset('/images/armored-head-on.jpg')}
                                    alt="Black CTK armored van seen head-on, showing the armored windscreen and bull bar"
                                    width="1509"
                                    height="1279"
                                    loading="lazy"
                                    className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]"
                                />
                            </figure>

                            <div className="relative z-10 -mt-10 ml-4 mr-auto max-w-xs rounded-xl bg-brand-deep p-5 text-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.5)] sm:-mt-14 sm:ml-6 sm:p-6">
                                <p className="font-display text-lg leading-snug font-semibold">Tested before it leaves the floor.</p>
                                <p className="mt-2 text-sm leading-relaxed text-white/75">
                                    Every vehicle goes through mandatory ballistic resistance testing during production.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* Facts row */}
                    <dl className="mt-16 grid gap-x-8 gap-y-8 border-t border-border pt-10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
                        {[
                            { term: '100% Filipino', detail: 'Owned, managed, and staffed in the Philippines.' },
                            { term: 'NIJ Level 4', detail: 'Armored to the U.S. Justice Department standard.' },
                            { term: 'Build and lease', detail: 'We manufacture the vehicles and lease them with crews.' },
                            { term: 'Quezon City', detail: 'Based at CTK Building II on Nicanor Roxas Street.' },
                        ].map((fact, index) => (
                            <Reveal key={fact.term} delay={index * 90} className="relative pl-5">
                                <span aria-hidden="true" className="absolute top-1 left-0 h-6 w-0.5 rounded-full bg-brand" />
                                <dt className="font-display text-2xl font-semibold tracking-tight">{fact.term}</dt>
                                <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{fact.detail}</dd>
                            </Reveal>
                        ))}
                    </dl>
                </section>

                {/* Vehicles */}
                <section id="vehicles" className="scroll-mt-20 border-y border-border bg-field/60 dark:bg-white/4">
                    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
                        <div className="max-w-2xl">
                            <Reveal as="h2" variant="reveal-left" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                                The vehicles
                            </Reveal>
                            <Reveal as="p" delay={80} className="mt-3 text-lg leading-relaxed text-muted-foreground">
                                Commercial and executive armored vehicles, manufactured by CTK and fitted out for the crews who operate
                                them.
                            </Reveal>
                        </div>

                        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                            {GALLERY.map((item, index) => (
                                <Reveal
                                    as="li"
                                    key={item.src}
                                    variant="reveal-scale"
                                    delay={index * 90}
                                    className={item.featured ? 'sm:col-span-2 lg:col-span-4 lg:row-span-2' : 'lg:col-span-2'}
                                >
                                    <GalleryCard item={item} onOpen={() => setActiveImage(item)} />
                                </Reveal>
                            ))}

                            {/* Fact tile fills the last cell of the grid. */}
                            <Reveal as="li" variant="reveal-scale" delay={GALLERY.length * 90} className="sm:col-span-2 lg:col-span-2">
                                <div className="flex h-full min-h-48 flex-col justify-between rounded-2xl bg-brand-deep p-6 text-white ring-1 ring-black/10">
                                    <p className="font-display text-xl leading-snug font-semibold text-balance">
                                        Every vehicle is built to NIJ Level 4, with mandatory testing throughout production.
                                    </p>
                                    <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/85 underline-offset-4 hover:underline">
                                        Ask about armoring levels
                                    </a>
                                </div>
                            </Reveal>
                        </ul>

                        <GalleryLightbox item={activeImage} onClose={() => setActiveImage(null)} />
                    </div>
                </section>

                {/* Services */}
                <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
                    <Reveal as="h2" variant="reveal-left" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                        What we do
                    </Reveal>

                    <dl className="mt-8 divide-y divide-border border-y border-border">
                        {SERVICES.map((service, index) => (
                            <Reveal key={service.title} delay={index * 90} className="group grid gap-2 py-7 sm:grid-cols-[18rem_1fr] sm:gap-8">
                                <dt className="relative pl-5 font-display text-lg font-semibold">
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-1.5 left-0 h-5 w-0.5 origin-top rounded-full bg-brand transition-transform duration-500 group-hover:scale-y-125"
                                    />
                                    {service.title}
                                </dt>
                                <dd className="max-w-2xl pl-5 leading-relaxed text-muted-foreground sm:pl-0">{service.body}</dd>
                            </Reveal>
                        ))}
                    </dl>
                </section>

                {/* Memberships marquee */}
                <section aria-label="Memberships" className="border-y border-border py-8">
                    <Reveal className="mx-auto max-w-6xl px-5 sm:px-8">
                        <p className="text-sm text-muted-foreground">Member of</p>
                    </Reveal>
                    <Reveal delay={100} className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                        <ul className="marquee gap-x-12 px-6">
                            {[...AFFILIATIONS, ...AFFILIATIONS].map((name, index) => (
                                <li
                                    key={`${name}-${index}`}
                                    className="font-display text-xl font-semibold whitespace-nowrap text-foreground/80 sm:text-2xl"
                                    aria-hidden={index >= AFFILIATIONS.length ? 'true' : undefined}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </section>

                {/* Contact */}
                <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-brand-deep text-white">
                    <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-8 -bottom-24 font-display text-[18rem] leading-none font-bold tracking-tighter text-white/5 select-none"
                    >
                        CTK
                    </span>
                    <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1fr_1fr]">
                        <div>
                            <Reveal as="h2" variant="reveal-left" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                                Talk to us
                            </Reveal>
                            <Reveal as="p" delay={80} className="mt-4 max-w-md text-lg leading-relaxed text-white/75">
                                Tell us what you need to move and where. We will come back with vehicle options, armoring levels, and lease
                                terms.
                            </Reveal>
                            <Reveal delay={160} className="mt-8">
                                <a
                                    href={GMAIL_COMPOSE}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-medium text-brand-deep transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none motion-reduce:hover:translate-y-0"
                                >
                                    Email us on Gmail
                                </a>
                            </Reveal>
                        </div>

                        <Reveal as="address" delay={120} className="grid gap-6 text-base not-italic sm:grid-cols-2">
                            <div>
                                <p className="font-display font-semibold">Office</p>
                                {CONTACT.address.map((line) => (
                                    <p key={line} className="text-white/80">
                                        {line}
                                    </p>
                                ))}
                            </div>
                            <div>
                                <p className="font-display font-semibold">Phone</p>
                                {CONTACT.phones.map((phone) => (
                                    <p key={phone}>
                                        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-white/80 underline-offset-4 hover:underline">
                                            {phone}
                                        </a>
                                    </p>
                                ))}
                                <p className="mt-3 font-display font-semibold">Fax</p>
                                <p className="text-white/80">{CONTACT.fax}</p>
                            </div>
                            <div>
                                <p className="font-display font-semibold">Email</p>
                                <a href={`mailto:${CONTACT.email}`} className="text-white/80 underline-offset-4 hover:underline">
                                    {CONTACT.email}
                                </a>
                            </div>
                            <div>
                                <p className="font-display font-semibold">Facebook</p>
                                <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="text-white/80 underline-offset-4 hover:underline">
                                    facebook.com/ctkinc
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground sm:px-8">
                    <span>{BRAND}</span>
                    <span>A 100% Filipino corporation.</span>
                </footer>
            </div>
        </>
    );
}
