'use client'
import React, { useState } from 'react'
import SelectTopic from './_component/SelectTopic'
import SelectStyle from './_component/SelectStyle'
import SelectDuration from './_component/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import CustomLoading from './_component/CustomLoading'
import { v4 as uuidv4 } from 'uuid';

type HandleInputChange=(fieldName:string,fieldValue:string)=>void

type VideoScene = {
    scene: number;
    duration: number; 
    imageprompt: string; 
    ContentText: string; 
  };

function CreateNew() {
    const [loading,setLoading]=useState<boolean>(false)
    const [formData, setFormData] = useState<Record<string, any>>({});
    const[videoScript,setVideoScript]=useState<Array<VideoScene>>()
    const [audioFileUrl,setAudioFileUrl]=useState<any>();
    const [caption,setCaption]=useState();
    const [imageList,setImageList]=useState<Array<any>>([])
    const onHandleInputChange:HandleInputChange=(fieldName,fieldValue)=>{
        setFormData(perv=>({
            ...perv,
            [fieldName]:fieldValue
        }))
    }

    const onCreateClickHandler=()=>{
        GetVideoScript()
    }

    const GetVideoScript=async()=>{
        setLoading(true);
        const prompt="write a script to generate "+formData.duration+" video on topic : "+formData.topic+" along with AI image prompt in "+formData.imageStyle+" format for each scene and give me result in json format with imageprompt and content text as field, no plain text."
        const result=await axios.post('/api/get-video-script',{
            prompt:prompt
        }).then(resp=>{
            console.log(resp.data.result)
            setVideoScript(resp.data.result)
            GenerateAudioFile(resp.data.result)
        })
        setLoading(false)
    }

    const GenerateAudioFile=async(videoScriptData : Array<VideoScene>)=>{
        setLoading(true);
        let script='';
        const id = uuidv4();
        videoScriptData.forEach((element:VideoScene) => {
            script=script+element.ContentText+' ';
        });

        await axios.post('/api/generate-audio',{
            text:script,
            id:id
        }).then(async(resp)=>{
            console.log(resp.data)
            setAudioFileUrl(resp.data.Result)
           await GenerateAudioCaption(audioFileUrl,videoScriptData)
        })
        setLoading(false)
    }

    const GenerateAudioCaption=async(fileUrl:string | URL,videoScriptData:Array<VideoScene>)=>{
        setLoading(true)
        await axios.post('api/generate-caption',{
            audioFileUrl:fileUrl
        }).then(resp=>{
            console.log(resp.data.result);
            setCaption(resp?.data?.result)
            resp.data.result&&GenerateImage(videoScriptData)
        })
        setLoading(false);
    }
    const GenerateImage=(videoScriptData:any)=>{
        setLoading(true)
        let images:Array<any>=[];
        videoScript?.forEach(async(element:VideoScene) => {
            await axios.post('api/generate-image',{
                prompt:element?.imageprompt
            }).then(resp=>{
                console.log(resp.data.result);
                images.push(resp.data.result)
              
            })
        });
       setImageList(images)
        setLoading(false);
    }
  return (
    <div className='md:px-20'>
        <h2 className='font-bold text-primary text-center text-4xl'>
            Create New
        </h2>
        <div>
            {/* select topic */}
                <SelectTopic onUserSelect={onHandleInputChange}/>
            {/* select style */}
                <SelectStyle onUserSelect={onHandleInputChange}/>
            {/* Duration */}
                <SelectDuration onUserSelect={onHandleInputChange}/>
            {/* Create button */}
        </div>
        
        <Button className='w-full mt-10' onClick={onCreateClickHandler}>Create Short Video</Button>
        <CustomLoading loading={loading}/>
    </div>
  )
}

export default CreateNew