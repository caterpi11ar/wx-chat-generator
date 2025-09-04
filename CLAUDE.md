# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a WeChat chat history generator built with React 19, TypeScript, Vite, and Ant Design. It allows users to create mock WeChat conversations with custom user profiles, send messages, and export them as high-quality images.

## Development Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint and fix code
pnpm lint:fix
```

## Architecture

### State Management
The application uses React Hooks for state management, with all state centralized in `HomePage.tsx`:
- `messageList`: Array of chat messages
- `userList`: Tuple containing two user profiles [recipient, sender]
- `metaInfo`: Environment settings (time, background image)

### Core Components
- **HomePage** (`src/pages/HomePage.tsx`): Main container with responsive layout (desktop: left-right split, mobile: vertical)
- **CombinedForm** (`src/components/CombinedForm/index.tsx`): Unified configuration panel handling:
  - User profile management (avatars, usernames)
  - Environment settings (time, background)
  - Message composition and sending
  - Image export functionality using html2canvas
- **MessageList** (`src/components/MessageList/index.tsx`): Chat preview area mimicking WeChat interface
- **MessageInfo** (`src/components/MessageInfo/`): Individual message components

### Type System
Key interfaces defined in `src/types/index.ts`:
- `MessageDetail`: Message structure with id, type, sender, content
- `UserInfo`: User profile with username and avatar
- `SENDER`: Enum for message sender (Recipient=0, Sender=1)
- `MESSAGE_TYPE`: Enum for message types (TEXT, IMAGE, VIDEO, FILE, LINK, transaction)

### Styling Approach
- **UnoCSS**: Primary utility framework with custom config for pseudo-elements
- **Ant Design**: Component library for forms and UI elements
- **Tailwind-style utilities**: Used throughout for responsive design
- Custom CSS classes for WeChat-specific styling (message bubbles, layout)

## Key Features Implementation

### Image Export
Located in `CombinedForm/index.tsx:109-136`, uses html2canvas to capture the `.message-list-container` element with specific settings:
- 2x scale for high resolution
- Custom background color (#ededed)
- CORS and taint handling enabled

### File Upload Handling
Universal upload handler pattern for avatars and backgrounds using base64 conversion and FileReader API.

### Responsive Design
Desktop (lg+): Horizontal split layout
Mobile: Vertical stacked layout with compact forms

## Development Notes

- Uses strict TypeScript with React 19
- ESLint configured with @antfu/eslint-config (console.log allowed)
- Vite with React plugin and path aliases (`@` -> `/src`)
- pnpm as package manager
- No test framework currently configured
