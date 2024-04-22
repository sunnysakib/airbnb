import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(){
    const {getUser} = getKindeServerSession();
    
    const user = await getUser();

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
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
            }
        });
    }

    return NextResponse.redirect("https://localhost:3000");
}