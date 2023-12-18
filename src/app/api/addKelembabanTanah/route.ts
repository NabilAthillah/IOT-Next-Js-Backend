import { push, ref, set } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";
import { database } from "../../../lib/firebaseConfig";

export const POST = async (req: NextRequest, res: Response) => {
  try {
    const url = new URL(req.url);
    const moist:any = url.searchParams.get("moist")

    const dataRef = ref(database, "datas");
    const newRef = push(dataRef);

    set(newRef, {
      moist: parseFloat(moist),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error uploading data to Firebase:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
