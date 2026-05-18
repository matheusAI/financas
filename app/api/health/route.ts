import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({
      status: 'ok',
      database: 'not_configured',
      message: 'Configure DATABASE_URL para habilitar as consultas via Prisma.',
    });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido ao consultar o banco.';

    return NextResponse.json(
      {
        status: 'error',
        database: 'unreachable',
        message,
      },
      { status: 500 },
    );
  }
}
