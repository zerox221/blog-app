import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BlogPublishSettings = () => {
  const visibility = [
      { label: "Private", value: "private" },
    { label: "Public", value: "public" },
];
return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="p-2 border-b border-[#F6F5F1]">
        <h1 className="text-xl md:text-2xl font-medium">Publishing Settings</h1>
      </div>
      <div>
        <div className="w-full">
          <label htmlFor="visibility" className="text-sm font-medium">
            Visibility
          </label>
          <Select 
           visibility={visibility}>
            <SelectTrigger className="w-full rounded-md ">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                {visibility.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BlogPublishSettings;
