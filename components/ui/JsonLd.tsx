interface JsonLdProps {
  /** A plain object matching a schema.org type. */
  data: Record<string, unknown>;
}

/**
 * Emits a JSON-LD structured data block.
 *
 * The payload is built server-side from `lib/seo.ts` — it never contains user
 * input — and `<` is escaped so the string can never close the script tag early.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
