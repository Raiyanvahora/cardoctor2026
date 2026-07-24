/**
 * Customer reviews.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * THIS ARRAY IS INTENTIONALLY EMPTY.
 *
 * No reviews have been supplied by the business, and inventing them would be
 * dishonest. While the array is empty the Reviews section renders a truthful
 * placeholder that points visitors at the real Google listing.
 *
 * TO ADD REAL REVIEWS: paste genuine entries into `reviews` below, exactly as
 * the customer wrote them. The section switches from the placeholder to real
 * review cards automatically — no component changes are needed.
 *
 *   export const reviews: Review[] = [
 *     {
 *       name: "Customer name as shown on Google",
 *       rating: 5,
 *       quote: "The review text, quoted verbatim.",
 *       source: "Google",
 *       vehicle: "BMW 3 Series",   // optional
 *     },
 *   ];
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface Review {
  /** Reviewer name, as published on the source platform. */
  name: string;
  /** Star rating out of 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** The review text, quoted verbatim. Do not paraphrase. */
  quote: string;
  /** Where the review was published. */
  source: "Google" | "Instagram";
  /** Optional — the vehicle the review relates to. */
  vehicle?: string;
}

export const reviews: Review[] = [];

export const hasReviews = reviews.length > 0;
