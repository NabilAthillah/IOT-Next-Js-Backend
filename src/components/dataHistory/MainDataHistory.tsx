"use client";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../lib/firebaseConfig";

const MainDataHistory = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const datasRef = ref(database, "datas");

    const unsubscribe = onValue(
      datasRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const datasArray: any = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...(data as any),
            })
          );
          setDatas(datasArray);
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="px-8">
      <div className="flex gap-10">
        <p>No</p>
        <p>Kelembaban Tanah</p>
        <p>TimeStamp</p>
      </div>
      <div>
        {datas.map((data: any, index) => (
          <div className="flex gap-14" key={data.id}>
            <p>{index + 1}</p>
            <p>{data.moist}</p>
            <p className="pl-28">{new Date(data.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDataHistory;
