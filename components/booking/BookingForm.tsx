"use client";

import { useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  RotateCcw,
  Send,
} from "lucide-react";

import { business } from "@/lib/business";
import { buildBookingMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Field, controlClasses } from "./Field";
import {
  type BookingErrors,
  type BookingValues,
  MAX_PROBLEM_LENGTH,
  MIN_VEHICLE_YEAR,
  brandSuggestions,
  fieldLabels,
  initialValues,
  serviceOptions,
  todayIsoDate,
  validateBooking,
} from "./fields";

/**
 * Appointment request form.
 *
 * There is no backend. On a valid submission the form composes a formatted
 * message and opens WhatsApp addressed to the workshop, so the enquiry lands
 * in a real inbox the business already monitors.
 */
export function BookingForm() {
  const [values, setValues] = useState<BookingValues>(initialValues);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const summaryRef = useRef<HTMLDivElement>(null);
  const maxYear = new Date().getFullYear() + 1;

  function update<K extends keyof BookingValues>(
    key: K,
    value: BookingValues[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    // Clear the error as soon as the field is edited — re-validated on submit.
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateBooking(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the summary so the errors are announced, then let the
      // reader jump straight to the first invalid field.
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        summaryRef.current?.scrollIntoView({ block: "center" });
      });
      return;
    }

    const url = buildWhatsAppUrl(buildBookingMessage(values));
    setWhatsappUrl(url);
    setSubmitted(true);

    // Opening in a new tab keeps the confirmation panel on screen. If the
    // browser blocks the popup, navigate the current tab instead.
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
    setWhatsappUrl(null);
  }

  const errorEntries = Object.entries(errors) as Array<
    [keyof BookingValues, string]
  >;

  if (submitted && whatsappUrl) {
    return (
      <Card padding="lg" className="text-center">
        <div aria-hidden className="glow-brand absolute inset-x-0 -top-20 h-56" />

        <div className="relative" role="status" aria-live="polite">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-ink">
            <CheckCircle2 aria-hidden className="h-8 w-8 text-[#25D366]" />
          </span>

          <h2 className="mt-7 text-2xl font-bold text-fg sm:text-3xl">
            Your Request Is Ready
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            WhatsApp should have opened with your appointment request filled in.
            Press send in WhatsApp to deliver it to {business.name} — the request
            is not received until you send it there.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={whatsappUrl} variant="whatsapp" size="lg">
              <ExternalLink aria-hidden className="h-4 w-4" />
              WhatsApp Didn&apos;t Open? Tap Here
            </Button>
            <Button
              onClick={resetForm}
              variant="secondary"
              size="lg"
              type="button"
            >
              <RotateCcw aria-hidden className="h-4 w-4" />
              Send Another Request
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit} noValidate>
        <h2 className="text-2xl font-bold text-fg sm:text-3xl">
          Appointment Details
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Fill this in and we will open WhatsApp with your request ready to send.
          Fields marked <span className="text-brand">*</span> are required.
        </p>

        {/* Error summary — focused on failed submit so it is announced. */}
        {errorEntries.length > 0 ? (
          <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            className="mt-7 rounded-2xl border border-brand/40 bg-brand-soft p-5 outline-none"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-fg">
              <AlertCircle aria-hidden className="h-4 w-4 text-brand" />
              Please fix {errorEntries.length}{" "}
              {errorEntries.length === 1 ? "field" : "fields"} before sending
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {errorEntries.map(([key, message]) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="underline decoration-brand/50 underline-offset-4 transition-colors hover:text-fg"
                  >
                    {fieldLabels[key]}
                  </a>
                  {": "}
                  {message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Your details */}
        <fieldset className="mt-9">
          <legend className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Your Details
          </legend>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              id="fullName"
              label={fieldLabels.fullName}
              error={errors.fullName}
              required
            >
              {({ describedBy, invalid }) => (
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="e.g. Rahul Patel"
                  value={values.fullName}
                  onChange={(event) => update("fullName", event.target.value)}
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid)}
                />
              )}
            </Field>

            <Field
              id="phone"
              label={fieldLabels.phone}
              error={errors.phone}
              required
              hint="We will confirm your appointment on this number."
            >
              {({ describedBy, invalid }) => (
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="e.g. 98765 43210"
                  value={values.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid)}
                />
              )}
            </Field>

            <Field
              id="location"
              label={fieldLabels.location}
              error={errors.location}
              required
              hint="Your city or area — it determines pickup and drop availability."
              className="sm:col-span-2"
            >
              {({ describedBy, invalid }) => (
                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="e.g. Anand, Gujarat"
                  value={values.location}
                  onChange={(event) => update("location", event.target.value)}
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid)}
                />
              )}
            </Field>
          </div>
        </fieldset>

        {/* Vehicle */}
        <fieldset className="mt-10">
          <legend className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            Your Vehicle
          </legend>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field
              id="carBrand"
              label={fieldLabels.carBrand}
              error={errors.carBrand}
              required
            >
              {({ describedBy, invalid }) => (
                <>
                  <input
                    id="carBrand"
                    name="carBrand"
                    type="text"
                    list="car-brands"
                    placeholder="e.g. BMW"
                    value={values.carBrand}
                    onChange={(event) => update("carBrand", event.target.value)}
                    aria-required="true"
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    className={controlClasses(invalid)}
                  />
                  <datalist id="car-brands">
                    {brandSuggestions.map((brand) => (
                      <option key={brand} value={brand} />
                    ))}
                  </datalist>
                </>
              )}
            </Field>

            <Field
              id="carModel"
              label={fieldLabels.carModel}
              error={errors.carModel}
              required
            >
              {({ describedBy, invalid }) => (
                <input
                  id="carModel"
                  name="carModel"
                  type="text"
                  placeholder="e.g. 3 Series"
                  value={values.carModel}
                  onChange={(event) => update("carModel", event.target.value)}
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid)}
                />
              )}
            </Field>

            <Field
              id="vehicleYear"
              label={fieldLabels.vehicleYear}
              error={errors.vehicleYear}
              required
            >
              {({ describedBy, invalid }) => (
                <input
                  id="vehicleYear"
                  name="vehicleYear"
                  type="number"
                  inputMode="numeric"
                  min={MIN_VEHICLE_YEAR}
                  max={maxYear}
                  step={1}
                  placeholder="e.g. 2019"
                  value={values.vehicleYear}
                  onChange={(event) => update("vehicleYear", event.target.value)}
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid)}
                />
              )}
            </Field>
          </div>
        </fieldset>

        {/* Service */}
        <fieldset className="mt-10">
          <legend className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            What You Need
          </legend>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              id="service"
              label={fieldLabels.service}
              error={errors.service}
              required
            >
              {({ describedBy, invalid }) => (
                <select
                  id="service"
                  name="service"
                  value={values.service}
                  onChange={(event) => update("service", event.target.value)}
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid)}
                >
                  <option value="">Choose a service…</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {fieldLabels.pickupDrop}
              </legend>
              <p className="text-xs text-dim">{business.pickupNote}</p>
              <div className="mt-1 grid grid-cols-2 gap-3">
                {(
                  [
                    { value: "yes", label: "Yes, please" },
                    { value: "no", label: "No, I'll visit" },
                  ] as const
                ).map((option) => {
                  const checked = values.pickupDrop === option.value;
                  return (
                    <label
                      key={option.value}
                      className={
                        "flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors " +
                        (checked
                          ? "border-brand bg-brand-soft text-fg"
                          : "border-line bg-ink text-muted hover:border-line-strong")
                      }
                    >
                      <input
                        type="radio"
                        name="pickupDrop"
                        value={option.value}
                        checked={checked}
                        onChange={() => update("pickupDrop", option.value)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden
                        className={
                          "h-3.5 w-3.5 rounded-full border-2 " +
                          (checked
                            ? "border-brand bg-brand"
                            : "border-line-strong")
                        }
                      />
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Field
              id="preferredDate"
              label={fieldLabels.preferredDate}
              error={errors.preferredDate}
              required
            >
              {({ describedBy, invalid }) => (
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  min={todayIsoDate()}
                  value={values.preferredDate}
                  onChange={(event) =>
                    update("preferredDate", event.target.value)
                  }
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid) + " [color-scheme:dark]"}
                />
              )}
            </Field>

            <Field
              id="preferredTime"
              label={fieldLabels.preferredTime}
              error={errors.preferredTime}
              required
              hint="The workshop is open 24 hours."
            >
              {({ describedBy, invalid }) => (
                <input
                  id="preferredTime"
                  name="preferredTime"
                  type="time"
                  value={values.preferredTime}
                  onChange={(event) =>
                    update("preferredTime", event.target.value)
                  }
                  aria-required="true"
                  aria-invalid={invalid}
                  aria-describedby={describedBy}
                  className={controlClasses(invalid) + " [color-scheme:dark]"}
                />
              )}
            </Field>

            <Field
              id="problem"
              label={fieldLabels.problem}
              error={errors.problem}
              required
              hint="What is the car doing? When does it happen? The more detail, the better we can prepare."
              className="sm:col-span-2"
            >
              {({ describedBy, invalid }) => (
                <>
                  <textarea
                    id="problem"
                    name="problem"
                    rows={5}
                    maxLength={MAX_PROBLEM_LENGTH}
                    placeholder="e.g. AC cools well on the highway but blows warm in traffic. Started about two weeks ago."
                    value={values.problem}
                    onChange={(event) => update("problem", event.target.value)}
                    aria-required="true"
                    aria-invalid={invalid}
                    aria-describedby={describedBy}
                    className={controlClasses(invalid) + " resize-y"}
                  />
                  <p className="text-right text-xs text-dim">
                    {values.problem.length} / {MAX_PROBLEM_LENGTH}
                  </p>
                </>
              )}
            </Field>
          </div>
        </fieldset>

        {/* Submit */}
        <div className="mt-10 border-t border-line pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-xs leading-relaxed text-dim sm:max-w-md">
              <MessageCircle aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#25D366]" />
              Submitting opens WhatsApp with your request pre-filled. You still
              need to press send inside WhatsApp. No details are stored on this
              website.
            </p>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send aria-hidden className="h-4 w-4" />
              Send via WhatsApp
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
