# VendorView
VendorView is an application that allows street vendors to create a profile, list their products, and track their whereabouts. This frontend application is built using Next.js, TypeScript, ShadCN, Tailwind, and jotai.

## Getting Started

First, install the depedencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```


Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can also open up our deployed app [here](https://vendorview-frontend.vercel.app/)

You can start by creating a new account or logging in with the following credentials:
**vendor**
- email: davetobing20@gmail.com
- password: andi

**customer**
- email: davetobing4@gmail.com
- password: andi

## Features
- **Authentication**: Users can sign up and log in to the application.
- **Profile**: Users can view their profile and update their information.
- **Products**: Vendors can add, update, and delete their products.
- **Location**: Vendors can update their location in real time using websocket.
- **Search**: Users can view all the nearest vendors based on their location.