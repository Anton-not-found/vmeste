// app/api/activities/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { Activity } from "@/entities/activity/model/activity.model";
import "@/entities/user/model/user.model";
import { verifyAccessToken } from '@/lib/jwt.config';

export async function GET() {

  try {
    await dbConnect();

    const activities = await Activity.find()
      .populate("authorId", "name avatar rating")
      .sort({ createdAt: -1 })
      .lean();

    const formattedActivities = activities.map((activity) => ({
      id: activity._id.toString(),
      title: activity.title,
      description: activity.description,
      category: activity.category,
      activateOnUtc: activity.date.toISOString(),
      location: activity.location,
      price: activity.price,
      currentParticipants: activity.participants?.length || 0,
      maxParticipants: activity.maxParticipants,
      imageUrl: activity.imageUrl,
      isFavorite: false, // пока заглушка
      author: {
        id: (activity.authorId as any)._id.toString(),
        name: (activity.authorId as any).name,
        avatar: (activity.authorId as any).avatar,
        rating: (activity.authorId as any).rating,
      },
    }));

    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 },
    );
  }
}

const getUserIdFromToken = (request: NextRequest): string | null => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.split(' ')[1];
  const payload = verifyAccessToken(token);
  
  return payload?.userId || null;
};


export async function POST(request: NextRequest) {
    console.log('=== POST /api/activities START ===');
  try {
    await dbConnect();
    console.log('DB connected');

    
    // Получаем userId из токена
    const userId = getUserIdFromToken(request);
    console.log('userId:', userId);
    if (!userId) {
        console.log('Unauthorized - no userId');
        return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 401 }
        );
    }
    const body = await request.json();
     console.log('body received:', JSON.stringify(body, null, 2));

    const newActivity = await Activity.create({
      title: body.title,
      description: body.description,
      category: body.category ?? null,
      date: body.activateOnUtc,
      location: body.location,
      address: body.address,
      price: body.price,
      maxParticipants: body.maxParticipants,
      imageUrl: body.imageUrl,
      authorId: userId,
    });

     console.log('Activity created, id:', newActivity._id);

    return NextResponse.json(
      { success: true, data: { id: newActivity._id.toString() } },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Failed to create activity:", error);
     console.error('ERROR in POST /api/activities:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { success: false, error: "Failed to create activity" },
      { status: 500 },
    );
  }
}
