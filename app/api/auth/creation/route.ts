import prisma from '@/app/lib/db';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET(){
    const session = await auth()
    const user = session?.user;

    if(!user || user === null || !user.id ){
        throw new Error('User not found');
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        }
    });

    if(!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? "",
                name: user.name ?? "",
                profileImage: user.image ?? `https://avatar.vercel.sh/${user.name}`,
            }
        });
    }

    return NextResponse.redirect("https://localhost:3000");
}