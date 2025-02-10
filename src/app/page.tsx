import { Ivideo } from "@/models/Videos";
import { ApiClient } from "@/util/api-client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const  [Videos, setVideos] = useState<Ivideo[]>([])
  useEffect(() => {
    const fetchVideos = async () =>{
      try{
       const data = await ApiClient.getVideos()
       setVideos(data)
      }catch(error){
        console.error("Error Fetching video",error)
      }
    }


    fetchVideos()
  }, [])

  return (
    <div>
      <h1>Athlete-Bridge</h1>
    </div>
  );
}
