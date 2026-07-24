/**
 * Booking form field definitions and validation.
 *
 * Kept separate from the component so the rules are readable on their own and
 * can be tested without rendering anything.
 */

import { bookingServiceOptions } from "@/lib/services";

export interface BookingValues {
  fullName: string;
  phone: string;
  carBrand: string;
  carModel: string;
  vehicleYear: string;
  service: string;
  location: string;
  preferredDate: string;
  preferredTime: string;
  pickupDrop: "yes" | "no";
  problem: string;
}

export type BookingErrors = Partial<Record<keyof BookingValues, string>>;

export const initialValues: BookingValues = {
  fullName: "",
  phone: "",
  carBrand: "",
  carModel: "",
  vehicleYear: "",
  service: "",
  location: "",
  preferredDate: "",
  preferredTime: "",
  pickupDrop: "no",
  problem: "",
};

/** Human-readable labels, reused by the inputs and the error summary. */
export const fieldLabels: Record<keyof BookingValues, string> = {
  fullName: "Full name",
  phone: "Phone number",
  carBrand: "Car brand",
  carModel: "Car model",
  vehicleYear: "Vehicle year",
  service: "Service required",
  location: "Location",
  preferredDate: "Preferred date",
  preferredTime: "Preferred time",
  pickupDrop: "Pickup and drop required",
  problem: "Problem description",
};

export const serviceOptions = bookingServiceOptions;

/** Common brands, offered as datalist suggestions. Free text is still allowed. */
export const brandSuggestions = [
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Porsche",
  "Jaguar",
  "Land Rover",
  "Mini",
  "Volvo",
  "Lexus",
  "Toyota",
  "Honda",
  "Hyundai",
  "Skoda",
  "Volkswagen",
  "Tata",
  "Mahindra",
  "Maruti Suzuki",
  "Kia",
  "MG",
];

/** Today as yyyy-mm-dd in the user's own timezone (not UTC). */
export function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const MIN_VEHICLE_YEAR = 1980;
export const MAX_PROBLEM_LENGTH = 700;

/**
 * Validates the whole form and returns an error message per invalid field.
 * An empty object means the form is valid.
 */
export function validateBooking(values: BookingValues): BookingErrors {
  const errors: BookingErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  // Accepts 10 digits, optionally prefixed with +91, 91 or 0, and with spaces
  // or dashes anywhere — the formats people actually type.
  const digits = values.phone.replace(/[\s()-]/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Please enter a phone number we can reach you on.";
  } else if (!/^(?:\+?91|0)?[6-9]\d{9}$/.test(digits)) {
    errors.phone =
      "Enter a valid 10-digit Indian mobile number, for example 98765 43210.";
  }

  if (!values.carBrand.trim()) {
    errors.carBrand = "Please enter your car's brand, for example BMW.";
  }

  if (!values.carModel.trim()) {
    errors.carModel = "Please enter your car's model, for example 3 Series.";
  }

  const currentYear = new Date().getFullYear();
  const year = Number(values.vehicleYear);
  if (!values.vehicleYear.trim()) {
    errors.vehicleYear = "Please enter your vehicle's year.";
  } else if (
    !Number.isInteger(year) ||
    year < MIN_VEHICLE_YEAR ||
    year > currentYear + 1
  ) {
    errors.vehicleYear = `Enter a year between ${MIN_VEHICLE_YEAR} and ${currentYear + 1}.`;
  }

  if (!values.service) {
    errors.service = "Please choose the service you need.";
  }

  if (!values.location.trim()) {
    errors.location = "Please tell us your city or area.";
  }

  if (!values.preferredDate) {
    errors.preferredDate = "Please choose a preferred date.";
  } else if (values.preferredDate < todayIsoDate()) {
    errors.preferredDate = "Please choose today or a later date.";
  }

  if (!values.preferredTime) {
    errors.preferredTime = "Please choose a preferred time.";
  }

  if (!values.problem.trim()) {
    errors.problem = "Please describe the problem or the work you need.";
  } else if (values.problem.trim().length < 10) {
    errors.problem = "Please add a little more detail — at least 10 characters.";
  } else if (values.problem.length > MAX_PROBLEM_LENGTH) {
    errors.problem = `Please keep this under ${MAX_PROBLEM_LENGTH} characters.`;
  }

  return errors;
}
