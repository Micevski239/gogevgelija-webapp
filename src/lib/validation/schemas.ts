import { z } from 'zod';

// ============================================================================
// Category Schemas
// ============================================================================

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  name_en: z.string().optional(),
  name_mk: z.string().optional(),
  slug: z.string().optional(),
  icon: z.string(),
  image: z.string().optional(),
  color: z.string().optional(),
  parent_id: z.number().nullable(),
  level: z.number().optional(),
  order: z.number().optional(),
  is_active: z.boolean().optional(),
  show_in_search: z.boolean().optional(),
  show_in_navigation: z.boolean().optional(),
  trending: z.boolean(),
  featured: z.boolean().optional(),
  applies_to: z.enum(['listing', 'event', 'both']).optional(),
  description: z.string().optional(),
  description_en: z.string().optional(),
  description_mk: z.string().optional(),
  item_count: z.number().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

// ============================================================================
// Listing Schemas
// ============================================================================

export const ListingAmenitySchema = z.object({
  icon: z.string().optional(),
  text: z.string(),
});

export const ListingSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  address: z.string(),
  open_time: z.string().nullable(),
  working_hours: z.record(z.string()).nullable().optional(),
  show_open_status: z.boolean().optional(),
  is_open: z.boolean().optional(),
  category: CategorySchema.nullable(),
  tags: z.union([z.array(z.string()), z.string()]).nullable().optional(),
  amenities_title: z.string().optional(),
  amenities: z.union([
    z.array(ListingAmenitySchema),
    z.array(z.string())
  ]).nullable().optional(),
  image: z.string(),
  images: z.array(z.string()).optional(),
  thumbnail_image: z.string().nullable().optional(),
  image_thumbnail: z.string().nullable().optional(),
  image_medium: z.string().nullable().optional(),
  images_medium: z.array(z.string()).optional(),
  phone_number: z.string().optional(),
  facebook_url: z.string().optional(),
  instagram_url: z.string().optional(),
  website_url: z.string().optional(),
  google_maps_url: z.string().optional(),
  featured: z.boolean(),
  trending: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  rating: z.union([z.number(), z.string()]).nullable().optional(),
  can_edit: z.boolean().optional(),
});

export type Listing = z.infer<typeof ListingSchema>;

// ============================================================================
// Event Schemas
// ============================================================================

export const EventExpectationSchema = z.object({
  icon: z.string(),
  text: z.string(),
});

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date_time: z.string(),
  location: z.string(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  thumbnail_image: z.string().nullable().optional(),
  image_thumbnail: z.string().nullable().optional(),
  image_medium: z.string().nullable().optional(),
  cover_image: z.string().optional(),
  entry_price: z.string().nullable(),
  category: CategorySchema.nullable(),
  age_limit: z.string().nullable(),
  expectations: z.array(EventExpectationSchema),
  join_count: z.number(),
  has_joined: z.boolean(),
  featured: z.boolean(),
  is_active: z.boolean().optional(),
  show_join_button: z.boolean(),
  phone_number: z.string().optional(),
  facebook_url: z.string().optional(),
  instagram_url: z.string().optional(),
  website_url: z.string().optional(),
  google_maps_url: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Event = z.infer<typeof EventSchema>;

// ============================================================================
// Promotion Schemas
// ============================================================================

export const PromotionSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  has_discount_code: z.boolean(),
  discount_code: z.string(),
  tags: z.union([z.array(z.string()), z.string()]).nullable().optional(),
  image: z.string(),
  images: z.array(z.string()).optional(),
  thumbnail_image: z.string().nullable().optional(),
  image_thumbnail: z.string().nullable().optional(),
  image_medium: z.string().nullable().optional(),
  valid_until: z.string().nullable(),
  featured: z.boolean(),
  website: z.string().optional(),
  phone_number: z.string().optional(),
  facebook_url: z.string().optional(),
  instagram_url: z.string().optional(),
  address: z.string().optional(),
  google_maps_url: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Promotion = z.infer<typeof PromotionSchema>;

// ============================================================================
// Blog Schemas
// ============================================================================

export const BlogSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  content: z.string(),
  author: z.string(),
  category: z.string(),
  tags: z.union([z.array(z.string()), z.string()]).nullable().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  thumbnail_image: z.string().nullable().optional(),
  image_thumbnail: z.string().nullable().optional(),
  image_medium: z.string().nullable().optional(),
  cover_image: z.string().optional(),
  read_time_minutes: z.number(),
  featured: z.boolean(),
  published: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Blog = z.infer<typeof BlogSchema>;

// ============================================================================
// User & Auth Schemas
// ============================================================================

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  is_admin: z.boolean().optional(),
  profile: z.object({
    language_preference: z.string().optional(),
    avatar: z.string().optional(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
  }).optional(),
});

export type User = z.infer<typeof UserSchema>;

// ============================================================================
// Wishlist Schemas
// ============================================================================

export const WishlistItemSchema = z.object({
  id: z.string(),
  item_type: z.enum(['listing', 'event', 'promotion', 'blog']),
  item_data: z.union([ListingSchema, EventSchema, PromotionSchema, BlogSchema]),
  created_at: z.string(),
});

export type WishlistItem = z.infer<typeof WishlistItemSchema>;

// ============================================================================
// Pagination Schema
// ============================================================================

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(itemSchema),
  });

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// ============================================================================
// Search Results Schema
// ============================================================================

export const SearchResultsSchema = z.object({
  listings: z.array(ListingSchema),
  events: z.array(EventSchema),
  promotions: z.array(PromotionSchema),
  blogs: z.array(BlogSchema),
  total_count: z.number(),
  query: z.string(),
});

export type SearchResults = z.infer<typeof SearchResultsSchema>;

// ============================================================================
// Home Section Schemas
// ============================================================================

export const HomeSectionItemSchema = z.object({
  id: z.number(),
  type: z.string(),
  data: z.union([ListingSchema, EventSchema, PromotionSchema]).nullable(),
  order: z.number(),
});

export const HomeSectionSchema = z.object({
  id: z.number(),
  label: z.string(),
  card_type: z.enum(['small', 'big', 'carousel']),
  items: z.array(HomeSectionItemSchema),
  order: z.number(),
});

export type HomeSection = z.infer<typeof HomeSectionSchema>;

// ============================================================================
// Form Validation Schemas
// ============================================================================

export const LoginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().min(4, 'Code must be at least 4 characters').max(10),
});

export const RegisterFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

export const SendCodeFormSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const UpdateProfileFormSchema = z.object({
  username: z.string().min(2).optional(),
  current_password: z.string().optional(),
  new_password: z.string().min(8).optional(),
  avatar: z.string().optional(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
