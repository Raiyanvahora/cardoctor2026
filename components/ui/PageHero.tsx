import Image from "next/image";
import { Breadcrumb } from "./Breadcrumb";
import { Eyebrow } from "./Eyebrow";
import type { Crumb } from "@/lib/seo";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs: Crumb[];
  /** Background photograph. Every source image is portrait, so it is used as
   *  softened atmosphere rather than as a subject — see the note below. */
  image?: {
    src: string;
    alt: string;
  };
}

/**
 * The banner at the top of every inner page.
 *
 * All of the workshop photography is portrait, and a wide banner would crop a
 * portrait frame down to an unreadable sliver. So the photograph is treated as
 * ambience: scaled, blurred and dimmed behind the heading, with the real
 * imagery shown properly at full aspect ratio further down each page.
 *
 * Because it is decorative in this context, the background carries an empty alt.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pt-32 pb-16 sm:pt-40 sm:pb-20">
      {image ? (
        <div aria-hidden className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-center opacity-25 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
        </div>
      ) : null}

      <div aria-hidden className="glow-brand absolute inset-x-0 -top-24 -z-10 h-72" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
        {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
        <h1 className="text-4xl font-bold text-fg sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        ) : null}
        <div className="mt-8">
          <Breadcrumb crumbs={crumbs} />
        </div>
      </div>
    </section>
  );
}
