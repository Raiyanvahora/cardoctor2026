import { MessageSquareQuote, Quote, Star } from "lucide-react";
import { business } from "@/lib/business";
import { reviews } from "@/lib/reviews";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Row of five stars, filled to the given rating. */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden
          className={
            star <= rating
              ? "h-4 w-4 fill-brand text-brand"
              : "h-4 w-4 text-line-strong"
          }
        />
      ))}
    </span>
  );
}

/**
 * Customer reviews.
 *
 * `lib/reviews.ts` ships with an empty array, so this renders a truthful
 * placeholder that sends visitors to the real Google listing rather than
 * showing invented testimonials. Add genuine reviews to that file and the
 * real cards below take over automatically.
 */
export function Reviews() {
  const hasReviews = reviews.length > 0;

  return (
    <Section width="wide" aria-labelledby="reviews-heading">
      <SectionHeading
        id="reviews-heading"
        eyebrow="Customer Reviews"
        title="What Owners Say"
        description={
          hasReviews
            ? "Reviews from customers of the Anand workshop."
            : undefined
        }
        align="center"
        className="mb-9 lg:mb-12"
      />

      {hasReviews ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal
              as="li"
              key={`${review.name}-${index}`}
              delay={index * 0.08}
              className="h-full"
            >
              <Card className="flex h-full flex-col" padding="md">
                <Quote aria-hidden className="h-7 w-7 text-brand/40" />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                  “{review.quote}”
                </blockquote>
                <div className="mt-6 border-t border-line pt-5">
                  <Stars rating={review.rating} />
                  <p className="mt-3 text-sm font-semibold text-fg">
                    {review.name}
                  </p>
                  <p className="mt-1 text-xs text-dim">
                    {review.vehicle ? `${review.vehicle} · ` : ""}
                    via {review.source}
                  </p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      ) : (
        <Reveal>
          <Card className="mx-auto max-w-3xl text-center" padding="lg">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-ink">
              <MessageSquareQuote aria-hidden className="h-6 w-6 text-brand" />
            </span>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Stars rating={5} />
              <span className="font-display text-2xl font-bold text-fg">
                {business.googleRating}
              </span>
            </div>

            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-dim">
              Google Rating
            </p>

            <h3 className="mt-6 text-xl font-bold text-fg sm:text-2xl">
              Reviews Are Being Added Here Soon
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
              We would rather show you nothing than show you something we made
              up. Written customer reviews will appear on this page as they are
              collected — in the meantime, the workshop&apos;s real reviews are
              on its Google listing, and its work is on Instagram.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={business.mapsUrl} variant="secondary">
                See Google Listing
              </Button>
              <Button href={business.social.instagram} variant="secondary">
                View Instagram
              </Button>
            </div>
          </Card>
        </Reveal>
      )}
    </Section>
  );
}
