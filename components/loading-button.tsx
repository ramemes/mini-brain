import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
 
interface LoadingButtonProps {
  isLoading : boolean;
  children: React.ReactNode;
  loadingText: string;
}

export const LoadingButton = ({
  isLoading,
  children,
  loadingText
}: LoadingButtonProps) => {
  return (
    <Button
      className="flex gap-2 items-center p-3"
      disabled={isLoading}
      type="submit"
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
};
