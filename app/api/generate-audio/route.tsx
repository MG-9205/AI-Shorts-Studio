import { protos, TextToSpeechClient } from "@google-cloud/text-to-speech";
import { NextRequest, NextResponse } from "next/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";

const client = new TextToSpeechClient({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
});

export async function POST(req: NextRequest) {
  const { text, id } = await req.json();
  const storageRef=ref(storage,'ai-shorts-video-file/'+id+'.mp3');

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text: text },

      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },

      audioConfig: { audioEncoding: "MP3" },
    };

  const [response] = await client.synthesizeSpeech(request);

  if (
    !response.audioContent ||
    !(response.audioContent instanceof Uint8Array)
  ) {
    return NextResponse.json(
      { error: "Failed to generate audio content" },
      { status: 500 }
    );
  }

  const audioBuffer = Buffer.from(response.audioContent);

  await uploadBytes(storageRef,audioBuffer,{contentType:'audio/mp3'});

  const downloadUrl=await getDownloadURL(storageRef);


  return NextResponse.json({ Result: downloadUrl });
}
