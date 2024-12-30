import { NextRequest, NextResponse } from "next/server";
import { AssemblyAI } from 'assemblyai'

export async function POST(req:NextRequest) {
    try{
    const {audioFileUrl}= await req.json();
    const client = new AssemblyAI({
        apiKey: process.env.Caption_API || ''
      })
      
      const audioFile = audioFileUrl;
      
      const params = {
        audio: audioFile
      }
      
   
        const transcript = await client.transcripts.transcribe(params);
      
        console.log(transcript.words)
        return NextResponse.json({'result': transcript.words})
    }catch(error){
        return NextResponse.json({'error': error})
    }
}