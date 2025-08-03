import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { assignFreeTier } from "../../utils/assignFreeTier"

export const config = {
  api: {
    bodyParser: false
  }
}

// Clerk Webhook event structure
interface ClerkUserCreatedEvent {
  type: "user.created"
  data: {
    id: string
    email_addresses: Array<{ email_address: string }>
    [key: string]: unknown
  }
}

export async function POST(req: Request) {
  const payload = await req.text()

  const headers = {
    "svix-id": req.headers.get("svix-id") ?? "",
    "svix-timestamp": req.headers.get("svix-timestamp") ?? "",
    "svix-signature": req.headers.get("svix-signature") ?? ""
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: ClerkUserCreatedEvent
  try {
    evt = wh.verify(payload, headers) as ClerkUserCreatedEvent
  } catch (err) {
    console.error("Webhook verification failed:", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  const { type, data } = evt

  if (type === "user.created") {
    const clerkId = data.id
    const email = data.email_addresses?.[0]?.email_address

    if (!clerkId || !email) {
      console.error("Missing clerkId or email")
      return new NextResponse("Missing required fields", { status: 400 })
    }

    console.log("Clerk user.created payload:", data)

    await assignFreeTier(clerkId, email)
  }

  return NextResponse.json({ received: true })
}

