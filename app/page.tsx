import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Farcaster CryptoPunks The Graph Frame",
  description: "Powered by The Graph",
  openGraph: {
    images: [
      `https://${
        process.env.NEXT_PUBLIC_VERCEL_URL
      }/api/og?timestamp=${new Date().getTime()}`,
    ],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `https://${
      process.env.NEXT_PUBLIC_VERCEL_URL
    }/api/og?timestamp=${new Date().getTime()}`,
    "fc:frame:button:1": "Refresh",
    "fc:frame:post_url": `https://${
      process.env.NEXT_PUBLIC_VERCEL_URL
    }?timestamp=${new Date().getTime()}`,
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <img src="/api/og" />
      </div>
    </main>
  );
}
