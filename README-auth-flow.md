# Authentication Flow Structure

This project uses Expo Router, which is similar to Next.js file-based routing. The authentication flow is set up as follows:

## Folder Structure

```
app/
├── _layout.tsx                           # Main app layout
├── index.tsx                             # Landing page with 5-second redirect to signup
├── components/
│   └── global/
│       └── AuthScreenWrapper.tsx         # Reusable wrapper for auth screens
├── (auth)/                               # Auth group (parentheses make this a group)
│   ├── _layout.tsx                       # Layout specific to auth screens with background color
│   └── signup/                           # Signup flow
│       ├── index.tsx                     # Redirects to setMobileNumber
│       ├── setMobileNumber.tsx           # Mobile number input screen
│       └── verifyOtp.tsx                 # OTP verification screen
```

## How It Works

1. The user lands on the main index.tsx page
2. After 5 seconds, they are automatically redirected to the setMobileNumber page
3. Alternatively, they can tap the "opinionate" button to go to signup immediately
4. The user enters their mobile number and is taken to the OTP verification screen
5. After verifying OTP, the user can proceed to complete their profile

## Styling and Layout

The auth screens share a common style and layout using the `AuthScreenWrapper` component which provides:

- Consistent background color (#000504)
- Safe area insets handling
- Keyboard avoiding behavior
- Scrollable content when needed
- Status bar configuration

## Adding More Screens

To add more screens to the signup flow, create new files in the `app/(auth)/signup/` directory:

- `createProfile.tsx` - For creating a user profile
- `setUsername.tsx` - For setting username
- etc.

All new screens should use the `AuthScreenWrapper` component for consistent styling.

## Navigation

Navigation is handled by Expo Router. To navigate between screens:

```typescript
import { useRouter } from "expo-router";

// Inside your component
const router = useRouter();

// Navigate to a screen (adds to history)
router.push("/(auth)/signup/nextScreen");

// Replace current screen (no back button)
router.replace("/(auth)/signup/nextScreen");
``` 