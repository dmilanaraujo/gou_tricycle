# **App Name**: LocalWheels

## Core Features:

- Location Modal: Display a modal on first visit to select province and municipality, saving the selection to localStorage.
- Header Selectors: Display province and municipality selectors in the header, allowing users to change their location and trigger a new search.
- Combustion Type Filter: Implement a multiple-selection filter for combustion types (electric, combustion, hybrid).
- Driver Listing: Display drivers with avatar (vehicle image), alias, WhatsApp and phone call buttons.
- Image Carousel: Implement a modal carousel to display all images of a driver's vehicle when the avatar is clicked.
- Driver Search: Fetch drivers from Supabase based on selected province, municipality, and combustion type filters. Randomize the results on the server side.
- Supabase Integration Tool: Configure Supabase client with environment variables and implement server actions to interact with the database and a tool for shuffling.

## Style Guidelines:

- Primary color: Soft blue (#A0CFEC) to convey trust and reliability.
- Background color: Very light blue (#F0F9FF) for a clean and airy feel.
- Accent color: Teal (#468C98) for interactive elements and highlights.
- Body and headline font: 'PT Sans', a modern sans-serif providing good readability and a touch of warmth.
- Use clear, professional icons for navigation and driver details (phone, WhatsApp).
- Mobile-first responsive design using Tailwind CSS for optimal viewing on all devices.
- Subtle transitions and animations for a smooth user experience when opening modals or updating the driver list.