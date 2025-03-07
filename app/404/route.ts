export async function GET() {
    return new Response(null, {
      status: 404,
      headers: {
        'X-Robots-Tag': 'noindex, nofollow'
      }
    });
  }