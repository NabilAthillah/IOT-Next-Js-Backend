"use client"
import { useEffect, useState } from "react";
import { database } from "../../lib/firebaseConfig";
import { onValue, ref } from "firebase/database";

const room = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [datas, setDatas] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const datasRef = ref(database, "room");

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
  return     <div className="px-8">
  <div className="flex gap-10">
    <p>No</p>
    <p>Temperature Ruangan</p>
    <p>Kelembaban Ruangan</p>
  </div>
  <div>
    {datas.map((data: any, index) => (
      <div className="flex gap-14" key={data.id}>
        <p>{index + 1}</p>
        <p>{data.temp}</p>
        <p className="pl-28">{data.humid}</p>
      </div>
    ))}
  </div>
</div>;
};

export default room;
