import { revalidatePath, revalidateTag } from 'next/cache'

export async function GET() {
  return new Response('Revalidated', { status: 200 })
}

export async function POST(req: Request) {
  const body = await req.json()

  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!body.path && !body.tag) {
    return new Response('Path or tag is required', { status: 400 })
  }

  if (body.path) {
    revalidatePath(body.path, 'layout')
  }

  if (body.tag) {
    revalidateTag(body.tag)
  }

  return new Response('Revalidated', { status: 200 })
}
