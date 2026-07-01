'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DiscordSDK } from '@discord/embedded-app-sdk';

interface DiscordUser {
  username: string;
  avatar: string | null;
  global_name: string | null;
}

interface DiscordContextType {
  discord: DiscordSDK | null;
  authenticated: boolean;
  user: DiscordUser | null;
  channelId: string | null;
  guildId: string | null;
}

const DiscordContext = createContext<DiscordContextType>({
  discord: null,
  authenticated: false,
  user: null,
  channelId: null,
  guildId: null,
});

export function useDiscord() {
  return useContext(DiscordContext);
}

export function DiscordProvider({ children }: { children: React.ReactNode }) {
  const [discord, setDiscord] = useState<DiscordSDK | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<DiscordUser | null>(null);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

    // If no client ID, skip Discord SDK init (dev mode outside Discord)
    if (!clientId || clientId === 'your_discord_app_client_id') {
      return;
    }

    const initDiscord = async () => {
      const discordSdk = new DiscordSDK(clientId);

      await discordSdk.ready();
      // Store channel/guild IDs from the SDK
      setDiscord(discordSdk);

      // Authenticate to get user info
      const { user: discordUser } = await discordSdk.commands.authenticate({
        access_token: undefined,
      });

      if (discordUser) {
        setUser({
          username: discordUser.username,
          avatar: discordUser.avatar ?? null,
          global_name: discordUser.global_name ?? null,
        });
      }

      setAuthenticated(true);
    };

    initDiscord().catch((err) => {
      console.error('Failed to initialize Discord SDK:', err);
    });
  }, []);

  const channelId = discord?.channelId ?? null;
  const guildId = discord?.guildId ?? null;

  return (
    <DiscordContext.Provider value={{ discord, authenticated, user, channelId, guildId }}>
      {children}
    </DiscordContext.Provider>
  );
}
