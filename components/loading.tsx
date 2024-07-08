import { Loader2Icon, LoaderIcon } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex h-[100vh] w-full flex-col
    justify-center items-center">
      <Loader2Icon
        className="animate-spin w-8 h-8" 
      />
    </div>
  )
}