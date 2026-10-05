import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation, spa } from "../../data/site";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { keepFocusInDialog } from "../../lib/dialog";

export function Wordmark() {
  return (
    <a className="wordmark" href="#inicio" aria-label={`${spa.name}, inicio`}>
      <span>{spa.wordmark}</span>
      <small>{spa.tagline}</small>
    </a>
  );
}

export function Navbar({ scrolled }: { scrolled: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#inicio");

  useEffect(() => {
    const sections = navigation
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      () => {
        const current = [...sections]
          .reverse()
          .find(
            (section) =>
              section.getBoundingClientRect().top <= window.innerHeight * 0.35,
          );
        setActiveHref(current ? `#${current.id}` : "#inicio");
      },
      { rootMargin: "-18% 0px -62% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1100px)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const close = () => dialog.current?.close();

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton className="header-booking">Reservar</WhatsAppButton>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={25} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-labelledby="menu-title"
        onKeyDown={keepFocusInDialog}
        onClose={() => {
          setOpen(false);
          toggle.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <p id="menu-title" className="eyebrow">
              Un momento para ti
            </p>
            <button
              className="icon-button"
              aria-label="Cerrar menú"
              onClick={close}
              autoFocus
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Navegación móvil">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                aria-current={activeHref === item.href ? "location" : undefined}
              >
                <small>0{index + 1}</small>
                {item.label}
                <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <div
            onClick={(event) => {
              if ((event.target as Element).closest("a")) close();
            }}
          >
            <WhatsAppButton />
          </div>
          <p className="mobile-menu-location">
            {spa.location} · {spa.tagline}
          </p>
        </div>
      </dialog>
    </header>
  );
}
