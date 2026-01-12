# Setup Guide

This guide will walk you through setting up the Hardware NPI Planning application from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** (comes with Node.js)
- **Git**
- **Firebase CLI**: Install with `npm install -g firebase-tools`
- A **Firebase account** (free tier is sufficient for development)

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd hardware_project_planning
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Firebase SDK, and UI components.

## Step 3: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard:
   - Enter a project name
   - Enable Google Analytics (optional)
   - Accept terms and create project

## Step 4: Configure Firebase Services

### Enable Firebase Authentication

1. In Firebase Console, go to **Authentication** → **Get started**
2. Enable **Email/Password** provider
3. Enable **Google** provider (optional, for OAuth)
   - Add authorized domains if needed

### Enable Firebase Data Connect

1. In Firebase Console, go to **Data Connect** → **Get started**
2. Create a new Data Connect instance
3. Note the instance location (e.g., `us-central1`)

### Configure Firebase Hosting

1. In Firebase Console, go to **Hosting** → **Get started**
2. Follow the setup wizard (or skip if using CLI)

## Step 5: Initialize Firebase in Your Project

```bash
firebase login
firebase init
```

When prompted:
- Select **Hosting** and **Data Connect**
- Choose your Firebase project
- For Hosting:
  - Public directory: `out` (Next.js static export)
  - Single-page app: Yes
  - Set up automatic builds: No (we use GitHub Actions)
- For Data Connect:
  - Source directory: `dataconnect`
  - Schema file: `schema.gql`

## Step 6: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Firebase configuration:
   - Go to Firebase Console → Project Settings → General
   - Scroll to "Your apps" section
   - Click the web icon (`</>`) to add a web app
   - Copy the configuration values

3. Edit `.env.local` with your values:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# NextAuth Configuration
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Firebase Data Connect
NEXT_PUBLIC_FIREBASE_DATACONNECT_ENDPOINT=https://your-project-default-rtdb.firebaseio.com
```

### Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and use it as your `NEXTAUTH_SECRET`.

## Step 7: Deploy Data Connect Schema

```bash
firebase dataconnect:sdk:generate
firebase deploy --only dataconnect
```

This will:
- Generate the TypeScript SDK from your GraphQL schema
- Deploy the schema to Firebase Data Connect

## Step 8: Set Up Authentication

### For Email/Password Authentication

No additional setup needed if you enabled it in Step 4.

### For Google OAuth (Optional)

1. In Firebase Console → Authentication → Sign-in method → Google
2. Enable Google provider
3. Add your OAuth client ID and secret to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

## Step 9: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 10: Create Initial Data

After logging in, you'll need to create:

1. **Organization**: Your organization settings (fiscal year start, etc.)
2. **Portfolio**: Top-level portfolio grouping
3. **Program**: Programs within portfolios
4. **Projects**: Individual projects within programs
5. **Teams**: Team structure for resource planning
6. **Phase Templates**: NPI phase templates (EVT/DVT/PVT/MP)

See the [User Guide](user-guide.md) for details on creating and managing these entities.

## Troubleshooting

### Firebase CLI Not Found

```bash
npm install -g firebase-tools
```

### Data Connect SDK Generation Fails

Ensure you've:
- Deployed the Data Connect schema first
- Set the correct `NEXT_PUBLIC_FIREBASE_DATACONNECT_ENDPOINT` in `.env.local`
- Run `firebase login` to authenticate

### Authentication Not Working

- Verify all environment variables are set correctly
- Check that Firebase Authentication is enabled in the console
- Ensure `NEXTAUTH_URL` matches your current URL (localhost:3000 for dev)

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

- Read the [User Guide](user-guide.md) to learn how to use the application
- Review the [Architecture](architecture.md) documentation
- Check the [Development Guide](development.md) for contributing

## Production Deployment

For production deployment, see the [Development Guide - Deployment](development.md#deployment) section.
