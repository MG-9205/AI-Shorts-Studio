"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

type OnUserSelectType = (fieldName: string, fieldValue: string) => void;

interface SelectTopicProps {
  onUserSelect: OnUserSelectType;
}

function SelectTopic({onUserSelect}:SelectTopicProps) {

  const option = ["Custom Prompt", "Random AI Story", "Scary Story", "Historical Facts",'Bed time Story','Fun Facts','Motivational'];
  const [selectedOption, setSelectedOption] = useState<String>();
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">What is the topic of your video? </p>
      <Select
        onValueChange={(value) => {
          setSelectedOption(value);
          value!='Custom Prompt' && onUserSelect('topic',value)
        }}
      >
        <SelectTrigger className="w-full mt-2 p-6 text-lg">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {option.map((item, index) => (
            <SelectItem value={item} key={index}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedOption == "Custom Prompt" && (
        <Textarea
          className="mt-3"
          placeholder="Write prompt on which you want to generate video"
            onChange={(e)=>onUserSelect( 'topic',e.target.value)}
        ></Textarea>
      )}
    </div>
  );
}

export default SelectTopic;
