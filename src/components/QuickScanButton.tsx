
import { Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const QuickScanButton = () => {
  const { toast } = useToast();

  const handleScan = () => {
    toast({
      title: "Scanner Ready",
      description: "Camera functionality will be available when deployed on mobile devices",
    });
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleScan}>
      <CardContent className="p-4 text-center">
        <Camera className="h-8 w-8 mx-auto mb-2 text-green-500" />
        <p className="font-medium text-sm">Scan Barcode</p>
        <p className="text-xs text-gray-500">Add to inventory</p>
      </CardContent>
    </Card>
  );
};

export default QuickScanButton;
