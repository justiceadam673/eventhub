# Vendors Page Setup Guide

## Overview

The vendors page is now fully dynamic and fetches data from Firebase Firestore. It includes:

- ✅ Pagination (20 vendors per page)
- ✅ Dynamic search and filtering
- ✅ Vendor profile overlay modal
- ✅ Dynamic vendor data from Firestore

## Firestore Collection Structure

Create a `vendors` collection in Firebase Firestore with the following document structure:

```javascript
{
  // Document ID: auto-generated or use vendor email
  name: "Elite Catering",
  category: "Catering", // Must match: All, Catering, Photography, Decoration, DJ, Makeup
  location: "Abuja",
  rating: 4.9,
  reviews: 128,
  pricing: "₦250,000",
  image: "https://images.unsplash.com/...", // URL to vendor image
  description: "We provide premium catering services for all types of events...",
  phone: "+234 XXX XXX XXXX",
  email: "contact@elitecatering.com",
  website: "www.elitecatering.com",
  availability: "Weekends & Weekdays",
  services: ["Corporate Events", "Weddings", "Birthdays", "Conferences"],
  approved: true // Only approved vendors are shown
}
```

## Field Descriptions

| Field          | Type    | Required | Description                                                        |
| -------------- | ------- | -------- | ------------------------------------------------------------------ |
| `name`         | String  | Yes      | Vendor business name                                               |
| `category`     | String  | Yes      | Must be one of: All, Catering, Photography, Decoration, DJ, Makeup |
| `location`     | String  | Yes      | City/Location of vendor                                            |
| `rating`       | Number  | No       | Rating out of 5 (e.g., 4.9)                                        |
| `reviews`      | Number  | No       | Number of reviews/completed jobs                                   |
| `pricing`      | String  | Yes      | Starting price (e.g., "₦250,000")                                  |
| `image`        | String  | Yes      | URL to vendor's primary image                                      |
| `description`  | String  | No       | Detailed description of services                                   |
| `phone`        | String  | No       | Contact phone number                                               |
| `email`        | String  | No       | Contact email address                                              |
| `website`      | String  | No       | Vendor's website URL                                               |
| `availability` | String  | No       | Availability info (e.g., "Weekends & Weekdays")                    |
| `services`     | Array   | No       | Array of service types offered                                     |
| `approved`     | Boolean | Yes      | Controls vendor visibility (true to show)                          |

## Sample Data for Testing

Add these sample documents to your `vendors` collection:

```javascript
// Document 1: Elite Catering
{
  name: "Elite Catering",
  category: "Catering",
  location: "Abuja",
  rating: 4.9,
  reviews: 128,
  pricing: "₦250,000",
  image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
  description: "Premium catering services specializing in corporate events, weddings, and celebrations.",
  phone: "+234 701 234 5678",
  email: "contact@elitecatering.com",
  website: "www.elitecatering.com",
  availability: "Weekends & Weekdays",
  services: ["Corporate Events", "Weddings", "Birthdays", "Conferences"],
  approved: true
}

// Document 2: Flash Photography
{
  name: "Flash Photography",
  category: "Photography",
  location: "Lagos",
  rating: 4.8,
  reviews: 94,
  pricing: "₦180,000",
  image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
  description: "Professional photography and videography for all events.",
  phone: "+234 703 456 7890",
  email: "info@flashphoto.com",
  website: "www.flashphoto.com",
  availability: "By Appointment",
  services: ["Wedding Photography", "Event Coverage", "Portraits", "Videography"],
  approved: true
}

// Document 3: Royal Decorations
{
  name: "Royal Decorations",
  category: "Decoration",
  location: "Jos",
  rating: 4.7,
  reviews: 56,
  pricing: "₦300,000",
  image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
  description: "Elegant and creative decoration solutions for your special day.",
  phone: "+234 705 678 9012",
  email: "hello@royaldeco.com",
  website: "www.royaldeco.com",
  availability: "Weekdays & Weekends",
  services: ["Wedding Decor", "Corporate Setup", "Birthday Parties", "Theme Design"],
  approved: true
}

// Document 4: DJ Vibes
{
  name: "DJ Vibes",
  category: "DJ",
  location: "Abuja",
  rating: 4.9,
  reviews: 210,
  pricing: "₦120,000",
  image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
  description: "Professional DJ services with state-of-the-art equipment.",
  phone: "+234 707 890 1234",
  email: "bookings@djvibes.com",
  website: "www.djvibes.com",
  availability: "Weekends",
  services: ["Club Nights", "Wedding Receptions", "Corporate Events", "Private Parties"],
  approved: true
}

// Document 5: Glow Beauty Studio
{
  name: "Glow Beauty Studio",
  category: "Makeup",
  location: "Lagos",
  rating: 4.6,
  reviews: 42,
  pricing: "₦85,000",
  image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
  description: "Professional makeup and beauty services for all occasions.",
  phone: "+234 709 012 3456",
  email: "makeup@glow.com",
  website: "www.glowbeauty.com",
  availability: "Weekdays & Weekends",
  services: ["Bridal Makeup", "Event Makeup", "Hair Styling", "Beauty Consultation"],
  approved: true
}
```

## How It Works

### 1. **Data Fetching**

- When the component loads, it fetches all vendors with `approved: true` from Firestore
- Loading state is displayed while fetching

### 2. **Search & Filter**

- Users can search by vendor name or location
- Users can filter by category
- Results reset to page 1 when search/filter changes

### 3. **Pagination**

- Shows 20 vendors per page
- Navigation buttons to move between pages
- Page numbers displayed as buttons

### 4. **Vendor Profile Overlay**

- Click "View Profile" button to open overlay
- Shows complete vendor information:
  - Image and rating
  - Description
  - Contact details (phone, email, website)
  - Availability
  - Pricing
  - Services offered
- Close button and click-outside to dismiss

## Features Included

✅ **Dynamic Data**: All vendor data fetches from Firestore  
✅ **Pagination**: 20 vendors per page with navigation  
✅ **Search**: Real-time search by name or location  
✅ **Filter**: Filter by category (Catering, Photography, etc.)  
✅ **Profile Modal**: Click view profile to see full details  
✅ **Responsive**: Works on mobile, tablet, and desktop  
✅ **Loading State**: Shows spinner while loading data  
✅ **Empty State**: Shows message when no vendors match filters  
✅ **Save Favorites**: Heart icon to save vendors  
✅ **Smooth Animations**: Framer motion animations throughout

## Adding More Vendors

To add more vendors:

1. Go to Firestore Console
2. Click on `vendors` collection
3. Add Document
4. Fill in all required fields
5. Set `approved` to `true`
6. Click Save

The page will automatically fetch and display the new vendor.

## Customization

### Change Vendors Per Page

In `Vendors.jsx`, change `VENDORS_PER_PAGE`:

```javascript
const VENDORS_PER_PAGE = 20; // Change this number
```

### Add More Categories

Update the `categories` array:

```javascript
const categories = [
  "All",
  "Catering",
  "Photography",
  "Decoration",
  "DJ",
  "Makeup",
  "Venue", // Add new category
  "Planning", // Add new category
];
```

### Modify Overlay Fields

Edit the `VendorProfileOverlay` component to show/hide fields as needed.

## Troubleshooting

**Vendors not showing?**

- Verify `approved: true` is set in Firestore
- Check Firestore rules allow reads from your app
- Check browser console for errors

**Images not loading?**

- Ensure image URLs are correct and publicly accessible
- Use HTTPS URLs only

**Pagination not working?**

- Check `VENDORS_PER_PAGE` value
- Ensure you have enough vendors (>20) in database

## Next Steps

1. Add real vendor data to Firestore
2. Style the "Book Now" and "Contact" buttons in the overlay
3. Connect booking functionality
4. Add reviews/testimonials section
5. Implement vendor messaging
