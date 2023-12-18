import { push, ref, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../lib/firebaseConfig";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    const url = new URL(req.url);
    const temp:any = url.searchParams.get("temp")
    const humid:any = url.searchParams.get("humid")

    const dataRef = ref(database, "room");
    const newRef = push(dataRef);

    set(newRef, {
      temp: parseFloat(temp),
      humid: parseFloat(humid),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error uploading data to Firebase:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
