import { Ivideo } from "@/models/Videos";
export type VideoFormData = Omit<Ivideo, "_id">

type FetchOptions = {
    method? : "GET" | "POST" |"PUT" |"DELETE";
    body? : any;
    headers? : Record<string , string>
}


class apiClient{

    private async fetch<T>(        endpoint: string,
        options: FetchOptions = {}

    ):Promise<T>{
        const {method = "GET", body , headers = {}} = options
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            body: body? JSON.stringify(body): undefined,
            headers: defaultHeaders
        })
        if(!response.ok){
            throw new Error(await response.text());
        }
        return response.json();
    }
    async getVideos(){
        return this.fetch<Ivideo[]>("/video")
    }

    async  getAVideos(id:string) {
        return this.fetch<Ivideo>( `/videos/${id}`)
    }

    async createVideo(videoData: VideoFormData){
        return this.fetch("/video",{
            method:"POST",
            body: videoData
        })
    }


}

export const ApiClient = new apiClient()
