import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Events drive the homepage "next up", /events, and the HERizon schedule.
// Past events drop off "upcoming" automatically at build time (a daily rebuild keeps it fresh).
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    series: z.enum(['herizon', 'aiming-for-opportunity', 'urban-bourbon', 'elevating-women', 'other']),
    date: z.coerce.date().optional(), // omit when the date isn't set yet
    dateLabel: z.string().optional(), // e.g. "Summer 2027" when there is no exact date
    time: z.string().optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    summary: z.string(),
    registerUrl: z.string().url().optional(),
    page: z.string().optional(), // internal page with full details
  }),
});

export const collections = { events };
