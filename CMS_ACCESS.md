# 🔐 PSX CMS Access Control

## Access Method
- **URL**: `/pfp-maker/cms` (direct access only)
- **No public button** - only accessible via direct URL

## Authentication Code
**Code**: `PSX-ADMIN-2024`

## How It Works
1. Navigate to `/pfp-maker/cms`
2. Enter the authentication code: `PSX-ADMIN-2024`
3. Access granted - full CMS functionality
4. Session persists until logout

## Security Features
- ✅ **No public access** - button removed from main page
- ✅ **Authentication required** - code prompt on every visit
- ✅ **Session management** - stays logged in until logout
- ✅ **Logout option** - clear session when done

## To Change the Code
Edit line 158 in `app/pfp-maker/cms/page.tsx`:
```typescript
if (accessCode === "YOUR-NEW-CODE-HERE") {
```

## Access Flow
```
User visits /pfp-maker/cms
    ↓
Authentication prompt
    ↓
Enter code: PSX-ADMIN-2024
    ↓
Access granted → Full CMS
    ↓
Logout → Back to auth prompt
```

**Only you know this code - keep it secure!** 🔒
