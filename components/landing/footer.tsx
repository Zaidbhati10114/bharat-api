import Link from "next/link";
import { GitCommitHorizontal, Heart } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Separator } from "@/components/ui/separator";
import { site } from "@/lib/site";

const productLinks = [
  { label: "APIs", href: "/docs" },
  { label: "Playground", href: "/playground" },
  { label: "Status", href: "/status" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
  { label: "Roadmap", href: "/roadmap" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-background/50 mt-24 border-t backdrop-blur-sm">
      <Container>
        <div className="py-16">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <h3 className="text-xl font-bold tracking-tight">
                  {site.name}
                </h3>
              </Link>

              <p className="text-muted-foreground max-w-xs text-sm leading-6">
                Build India-first apps faster with free developer APIs designed
                for speed, simplicity and reliability.
              </p>

              <Link
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground inline-flex items-center gap-2 text-sm transition hover:text-orange-500"
              >
                <GitCommitHorizontal className="size-4" />
                GitHub
              </Link>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                Product
              </h4>

              <ul className="space-y-3 text-sm">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition hover:text-orange-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                Resources
              </h4>

              <ul className="space-y-3 text-sm">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition hover:text-orange-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                Legal
              </h4>

              <ul className="space-y-3 text-sm">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition hover:text-orange-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-10" />

          <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
            <p>© {new Date().getFullYear()} BharatAPI. All rights reserved.</p>

            <p className="flex items-center gap-1">
              Built in India
              <Heart className="size-4 fill-orange-500 text-orange-500" />
              for developers.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
