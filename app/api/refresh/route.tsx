export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const imageUrl = "TODO";

  return new Response(
    `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Vote Recorded</title>
            <meta property="og:title" content="Vote Recorded">
            <meta property="og:image" content="${imageUrl}">
            <meta name="fc:frame" content="vNext">
            <meta name="fc:frame:image" content="${imageUrl}">
            <meta name="fc:frame:post_url" content="${
              process.env.NEXT_PUBLIC_DOMAIN
            }/api/og?timestamp=${new Date().getTime()}-refresh">
            <meta name="fc:frame:button:1" content="Refresh">
        </head>
        <body>
        </body>
        </html>`,
    {
      status: 200,
      headers: { "Content-Type": "text/html" },
    }
  );
}
