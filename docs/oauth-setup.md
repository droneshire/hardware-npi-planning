# OAuth Setup for Firebase Data Connect

If you're getting an "Error 401: invalid_client" when trying to deploy or use Firebase Data Connect, you need to configure the OAuth consent screen in Google Cloud Console.

## Steps to Fix OAuth Error

### 1. Open Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project: **hw-npi-planning**

### 2. Configure OAuth Consent Screen

1. Navigate to **APIs & Services** → **OAuth consent screen**
2. Select **External** (unless you have a Google Workspace account, then use Internal)
3. Click **Create**

### 3. Fill in OAuth Consent Screen Information

**App information:**
- **App name**: Hardware NPI Planning (or your preferred name)
- **User support email**: Select your email (ryeager12@gmail.com)
- **App logo**: (Optional) Upload a logo if you have one

**App domain:**
- **Application home page**: `https://hw-npi-planning.web.app` (or your hosting URL)
- **Application privacy policy link**: (Optional, but recommended)
- **Application terms of service link**: (Optional)

**Authorized domains:**
- Add: `firebaseapp.com`
- Add: `web.app`
- Add: `localhost` (for development)

**Developer contact information:**
- **Email addresses**: Your email (ryeager12@gmail.com)

4. Click **Save and Continue**

### 4. Add Scopes (Optional)

1. Click **Add or Remove Scopes**
2. For Firebase Data Connect, you typically don't need to add custom scopes
3. Click **Save and Continue**

### 5. Add Test Users (if using External app type)

1. Add your email address as a test user
2. Click **Save and Continue**

### 6. Summary

1. Review your settings
2. Click **Back to Dashboard**

### 7. Create OAuth Client (if needed)

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Select **Web application**
4. Name it: "Firebase Data Connect Client"
5. **Authorized JavaScript origins**:
   - `https://hw-npi-planning.web.app`
   - `https://hw-npi-planning.firebaseapp.com`
   - `http://localhost:3000` (for development)
6. **Authorized redirect URIs**:
   - `https://hw-npi-planning.web.app/__/auth/handler`
   - `https://hw-npi-planning.firebaseapp.com/__/auth/handler`
   - `http://localhost:3000/__/auth/handler` (for development)
7. Click **Create**

### 8. Verify Firebase Authentication is Enabled

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **hw-npi-planning**
3. Navigate to **Authentication** → **Sign-in method**
4. Ensure **Email/Password** is enabled
5. If using Google OAuth, ensure **Google** provider is enabled

### 9. Retry Your Operation

After completing the OAuth consent screen setup, wait a few minutes for changes to propagate, then retry:

```bash
# For SDK generation
make update_sdk

# For schema deployment
make deploy_schema
```

## Troubleshooting

### Still Getting OAuth Errors?

1. **Wait a few minutes**: OAuth consent screen changes can take 5-10 minutes to propagate
2. **Check project selection**: Ensure you're using the correct project:
   ```bash
   firebase use hw-npi-planning
   ```
3. **Re-authenticate**: Try logging out and back in:
   ```bash
   firebase logout
   firebase login
   ```
4. **Check API enablement**: Ensure Firebase Data Connect API is enabled:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to **APIs & Services** → **Enabled APIs**
   - Search for "Firebase Data Connect API" and ensure it's enabled

### For Production Deployment

When deploying to production, you'll need to:
1. Submit your OAuth consent screen for verification (if using External app type)
2. Add your production domain to authorized domains
3. Update OAuth client redirect URIs with production URLs

## Additional Resources

- [Firebase Data Connect Documentation](https://firebase.google.com/docs/data-connect)
- [OAuth Consent Screen Guide](https://support.google.com/cloud/answer/10311615)
- [Firebase Authentication Setup](https://firebase.google.com/docs/auth)
