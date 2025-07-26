# Virtual fashion Store
A responsive React application that displays a catalog of items from the CLO-SET CONNECT API.
Built with React, Redux Toolkit, TypeScript, and styled-components.

## Features

- **Live API fetching** of product data.
- **Responsive grid layout** (1–4 columns depending on device width).
- **Keyword search** by title or creator.
- **Multi-select filter** (Paid, Free, View Only).
- **Reset button** to clear all filters and search.
- **Modern, accessible UI** with a green-accent theme.
- **Infinite-scroll ready** (client-side rendering).
- **TypeScript** for type safety.

## Live Demo

https://aartiveer.github.io/virtual-fashion-store/

## Tech Stack

- **React** (CRA TypeScript template)
- **Redux Toolkit** (state management)
- **styled-components** (CSS-in-JS)
- **TypeScript** (static typing)
- **React Infinite Scroll Component** (grid handling)

## Installation

1. **Clone the repository**

```
git clone https://github.com/aartiveer/virtual-fashion-store.git
cd virtual-fashion-store
```

2. **Install dependencies**
```
npm install -f
```
3. **Start the dev server**
```
npm start
```
4. **Open your browser and navigate to**

http://localhost:3000

## API Usage

The app fetches product data from:
https://closet-recruiting-api.azurewebsites.net/api/data

Each item contains:
- `id` (string)
- `creator` (string)
- `title` (string)
- `pricingOption` (number: 0 = Paid, 1 = Free, 2 = View Only)
- `imagePath` (string: image URL)
- `price` (optional number, shown for Paid items)

## Customization

- **Styling:** Edit colors and spacing in `GlobalStyle.tsx` and `App.tsx`.
- **Grid Layout:** Adjust breakpoints in the `Grid` styled-component.
- **API Mocking:** Switch to static array in `fetchContents.ts` for offline dev.
- **Features:** Add sorting, pagination, or custom hooks as needed.

## How It Works

- **On load**, the app fetches all products from the API.
- **Search bar** (top-left): Instantly filters by keyword in title or creator.
- **Filter bar**: Filter by Paid, Free, or View Only (multi-select).
- **Reset**: Clears filters and search.
- **Grid**: Dynamically resizes columns based on viewport width.
- **Cards**: Title, creator, and pricing are shown in a single row for each product.

## Scripts

- `npm start` — Start dev server
- `npm run build` — Create production build
- `npm test` — Run tests
