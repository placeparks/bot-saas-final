import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { RailwayClient } from '@/lib/railway/client'
import { parseLogsForStats } from '@/lib/openclaw/log-parser'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { instance: true },
    })

    if (!user?.instance?.containerId) {
      return NextResponse.json({ stats: null })
    }

    const railway = new RailwayClient()
    const deployment = await railway.getLatestDeployment(user.instance.containerId)

    if (!deployment) {
      return NextResponse.json({ stats: null })
    }

    const logs = await railway.getLogs(deployment.id, 500)
    const stats = parseLogsForStats(logs, deployment.createdAt)

    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error('Stats fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
