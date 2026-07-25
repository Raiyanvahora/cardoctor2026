import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Info,
  MessageCircle,
  Phone,
} from "lucide-react";

import { business, primaryTelHref } from "@/lib/business";
import {
  type Service,
  getServiceBySlug,
  getServiceNeighbours,
  services,
} from "@/lib/services";
import { breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";
import { enquiryHref } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-renders every service page at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return pageMetadata({
      title: "Service Not Found",
      description: "This service page could not be found.",
      path: `/services/${slug}`,
    });
  }

  return pageMetadata({
    title: service.title,
    description: `${service.summary} Available at ${business.name}, ${business.address.city}, ${business.address.state}.`,
    path: `/services/${service.slug}`,
  });
}

/**
 * Index of the other services, plus a contact card.
 *
 * Rendered *after* the service content in the document so that a visitor who
 * tapped through to this page reads the service first — on a phone this block
 * previously sat above the content, putting a list of ten links between the
 * heading and the thing the reader asked for. On desktop `lg:order-first`
 * returns it to the left column, where both fit side by side.
 */
function ServiceSidebar({ service }: { service: Service }) {
  return (
    <aside className="lg:order-first lg:col-span-4 xl:col-span-3">
      <div className="lg:sticky lg:top-28">
        <nav aria-labelledby="all-services-heading">
          <Card padding="none">
            <h2
              id="all-services-heading"
              className="border-b border-line px-5 py-4 text-xs font-bold tracking-[0.16em] text-fg uppercase"
            >
              All Services
            </h2>
            <ul className="p-2">
              {services.map((entry) => {
                const isActive = entry.slug === service.slug;
                return (
                  <li key={entry.slug}>
                    <Link
                      href={`/services/${entry.slug}`}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-sm transition-colors",
                        isActive
                          ? "bg-brand text-white"
                          : "text-muted hover:bg-surface-2 hover:text-fg",
                      )}
                    >
                      <span>{entry.shortTitle}</span>
                      <ArrowRight
                        aria-hidden
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive ? "text-white" : "text-dim",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        </nav>

        <Card className="mt-5 text-center" padding="md">
          <div aria-hidden className="glow-brand-sm absolute inset-x-0 -top-10 h-32" />
          <div className="relative">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-ink">
              <MessageCircle aria-hidden className="h-5 w-5 text-brand" />
            </span>
            <h2 className="mt-5 text-base font-bold text-fg">Need Help?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Message us about your car and we will tell you what is likely
              involved.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button
                href={enquiryHref(service.shortTitle.toLowerCase())}
                variant="whatsapp"
                size="sm"
              >
                <MessageCircle aria-hidden className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button href={primaryTelHref} variant="secondary" size="sm">
                <Phone aria-hidden className="h-4 w-4" />
                {business.phones.primary}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </aside>
  );
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const neighbours = getServiceNeighbours(slug);
  const schema = serviceSchema(slug);
  const Icon = service.icon;

  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      <JsonLd
        data={breadcrumbSchema([
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ])}
      />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ]}
        image={{ src: service.image.src, alt: "" }}
      />

      <Section width="wide">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Main content — first in the document. */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Reveal>
              <figure className="overflow-hidden rounded-3xl border border-line bg-surface">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  width={service.image.width}
                  height={service.image.height}
                  priority
                  sizes="(min-width: 1024px) 62vw, 92vw"
                  className="h-60 w-full object-cover object-center sm:h-96"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface">
                  <Icon aria-hidden className="h-5.5 w-5.5 text-brand" />
                </span>
                <Eyebrow>{service.shortTitle}</Eyebrow>
              </div>

              <div className="mt-6 space-y-5 text-[0.95rem] leading-relaxed text-muted sm:text-base">
                {service.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10">
                <h2 className="text-xl font-bold text-fg sm:text-2xl">
                  What&apos;s Included
                </h2>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {service.whatsIncluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5 text-sm text-muted"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                        <Check aria-hidden className="h-3 w-3 text-brand" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <h2 className="text-xl font-bold text-fg sm:text-2xl">
                  Good to Know
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {service.goodToKnow.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-line bg-surface p-3.5 text-sm text-muted"
                    >
                      <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="relative mt-10 overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-9">
                <div aria-hidden className="glow-brand absolute inset-x-0 -top-20 h-52" />
                <div className="relative">
                  <h2 className="text-xl font-bold text-fg sm:text-2xl">
                    Book {service.shortTitle}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                    Book an appointment and we will confirm it with you, or send
                    the details straight to WhatsApp. {business.hours}.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button href="/book-appointment">
                      <CalendarCheck aria-hidden className="h-4 w-4" />
                      Book Appointment
                    </Button>
                    <Button
                      href={enquiryHref(service.shortTitle.toLowerCase())}
                      variant="whatsapp"
                    >
                      <MessageCircle aria-hidden className="h-4 w-4" />
                      Ask on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>

            {neighbours ? (
              <Reveal delay={0.3}>
                <nav
                  aria-label="More services"
                  className="mt-8 grid gap-3 sm:grid-cols-2"
                >
                  <Link
                    href={`/services/${neighbours.previous.slug}`}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand/50 hover:bg-surface-2"
                  >
                    <ArrowLeft
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-dim transition-colors group-hover:text-brand"
                    />
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold tracking-[0.16em] text-dim uppercase">
                        Previous
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-semibold text-fg">
                        {neighbours.previous.shortTitle}
                      </span>
                    </span>
                  </Link>

                  <Link
                    href={`/services/${neighbours.next.slug}`}
                    className="group flex items-center justify-end gap-4 rounded-xl border border-line bg-surface p-4 text-right transition-colors hover:border-brand/50 hover:bg-surface-2"
                  >
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold tracking-[0.16em] text-dim uppercase">
                        Next
                      </span>
                      <span className="mt-0.5 block truncate text-sm font-semibold text-fg">
                        {neighbours.next.shortTitle}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="h-5 w-5 shrink-0 text-dim transition-colors group-hover:text-brand"
                    />
                  </Link>
                </nav>
              </Reveal>
            ) : null}
          </div>

          <ServiceSidebar service={service} />
        </div>
      </Section>
    </>
  );
}
