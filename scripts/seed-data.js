/**
 * Seed Data Script (JavaScript version for easier execution)
 *
 * Creates initial organization data, default templates, and sample portfolios,
 * programs, and projects for testing.
 *
 * Usage:
 *   node scripts/seed-data.js
 *   or
 *   npm run seed
 */

// Note: This is a placeholder. The actual seeding should be done via the UI
// or through a Next.js API route that can properly initialize Firebase.

console.log(`
🌱 Data Seeding

To seed initial data:

1. **Default Phase Templates**:
   - Go to Settings → Phase Templates
   - Click "Initialize Defaults" button
   - This will create all 4 default templates (Standard NPI, Fast Track, Extended NPI, Software-Focused)

2. **Sample Data**:
   - Use the UI to create portfolios, programs, and projects
   - Or use the browser console to call seed functions

For automated seeding, use the TypeScript version with proper Firebase initialization:
   npx tsx scripts/seed-data.ts
`)
