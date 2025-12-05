# LocalWheels

This is a Next.js application for finding local drivers.

## Features

- **Location-based Search**: Find drivers in your selected province and municipality.
- **Vehicle Type Filtering**: Filter drivers by vehicle combustion type (Electric, Combustion, Hybrid).
- **Driver Profiles**: View driver aliases and vehicle images.
- **Direct Contact**: Easily contact drivers via WhatsApp or phone call.
- **Responsive Design**: Mobile-first design for a seamless experience on any device.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Environment Variables

This project uses Supabase for its backend. You'll need to set up a Supabase project and create a `.env.local` file in the root of the project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

You can find these keys in your Supabase project's API settings.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd LocalWheels
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.
