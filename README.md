# Discord Music Activity

A Discord Embedded App (web activity) that lets you play YouTube Music and Apple Music through your own subscription — no ads, no interruptions.

## Architecture

```
Discord Bot (existing)
    └── /playmusic command → opens Activity
                              └── Your Vercel URL (iframe)
                                      ├── YouTube Music embed (Premium → ad-free)
                                      └── Apple Music embed (subscription → ad-free)
```

Your music plays through **your own** YouTube Music Premium / Apple Music subscription. Discord is just the launcher/UI.

---

## Setup Guide

### Step 1: Create a Discord App for the Activity

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Click **New Application**, name it (e.g. "Music Activity")
3. Go to **Installation**:
   - Under **Install Link**, select **Discord Provided URL**
   - Copy the **Application ID** (you'll need it for `NEXT_PUBLIC_DISCORD_CLIENT_ID`)
4. Go to **General Information**:
   - Add a **Redirect URI**: `https://localhost:3000` (for local dev)
   - Add your Vercel URL as another redirect: `https://your-app.vercel.app`
5. Under **Default Install Settings**, pick **Guild Install** or **User Install**

### Step 2: Add a Slash Command to Your Existing Bot

You need your **existing bot** to trigger the Activity. Add a slash command that launches the URL:

1. Open your existing bot's application in the Discord Developer Portal
2. Go to **Commands → Create Command**:
   - Name: `playmusic`
   - Type: `CHAT_INPUT`
   - Description: "Open the music activity"
   - For **Install Scope**: select your bot's scopes

Alternatively, use the Discord API or your bot framework (discord.js, discord.py, etc.) to register the command:

```js
// Example with discord.js (your existing bot)
await rest.patch(
  Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
  {
    body: [
      {
        name: 'playmusic',
        type: 1, // CHAT_INPUT
        description: 'Open music activity',
      },
    ],
  }
);
```

### Step 3: Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com), import the repo
3. Add environment variable:
   - `NEXT_PUBLIC_DISCORD_CLIENT_ID` = your Discord Application ID
4. Deploy

### Step 4: Configure Discord App URL

1. In your Activity app's Discord Developer Portal, go to **Installation**
2. Set the **Install Link** to a URL containing your Vercel deployment, e.g.:
   ```
   https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0&scope=applications.commands+activities
   ```
3. Or, for the Activity URL: set the **Redirect URI** to your Vercel URL

### Step 5: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` — the app runs outside Discord too (you'll see a placeholder since no Discord SDK is active without the Activity context).

---

## Environment Variables

```env
NEXT_PUBLIC_DISCORD_CLIENT_ID=your_discord_app_client_id
```

- **Required**: `NEXT_PUBLIC_DISCORD_CLIENT_ID` — from your Discord app's General Information page

---

## Usage

1. User types `/playmusic` in a server with your bot
2. Bot opens the Activity (or sends a button/link to launch it)
3. The web activity loads inside Discord, showing the music player
4. User pastes a YouTube Music or Apple Music link
5. Music plays ad-free through their own subscription

---

## Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main activity UI with tab switcher |
| `components/YouTubeMusicEmbed.tsx` | YouTube Music iframe player |
| `components/AppleMusicEmbed.tsx` | Apple Music iframe player |
| `lib/discord.tsx` | Discord SDK provider & auth |

---

## Limitations & Notes

- **Login**: Users must be logged into their YouTube Premium / Apple Music account in the browser for embeds to respect subscription status
- **Embedded App context**: The Discord SDK auto-injects `access_token` in the URL hash when running as a Discord Activity — no extra login needed for Discord auth
- **Backend token exchange**: For full OAuth flows, you need a backend to exchange the auth code for a long-lived token. This MVP uses the SDK's built-in auth.
