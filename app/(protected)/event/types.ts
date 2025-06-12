// Event and Session types for event page
import type { Session } from "next-auth";

export interface Event {
  id: string;
  title: string;
  dateTime: string; // ISO string
  location: string;
  description: string;
  customFields?: Array<{ label: string; value: string }>;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventsResult {
  events: Event[];
  session: Session;
  error?: string;
}
