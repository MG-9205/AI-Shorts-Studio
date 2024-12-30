import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";


export async function POST(req:NextRequest) {
    try {
     const {prompt} = await req.json();   
const replicate = new Replicate({
    auth:process.env.REPLICATE_API_TOKEN
});

const input = {
prompt:prompt,
height:1280,
width:1204,
num_outputs:1
};

const output:any = await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input });

const base64Image='data:images/png;base64,'+await ConvertImage(output[0])
const fileName='ai-short-video-files/'+Date.now()+'.png';

const storageRef=ref(storage,fileName);
await uploadString(storageRef,base64Image,'data_url');
const downloadUrl=await getDownloadURL(storageRef);

return NextResponse.json({'result': downloadUrl}) 
    } catch (error) {
      return NextResponse.json({'error':error}) 
    }
}


const ConvertImage=async(imageUrl:string)=>{
try {
    const resp= await axios.get(imageUrl,{responseType:'arraybuffer'}) 
    const base64Image=Buffer.from(resp.data).toString('base64')
    return base64Image;
} catch (error) {
    console.log('error :' + error)
}
}