
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const ExpiringItems = () => {
  const expiringItems = [
    { name: "Greek Yogurt", expiry: "2 days", urgent: true },
    { name: "Baby Spinach", expiry: "3 days", urgent: false },
    { name: "Chicken Breast", expiry: "5 days", urgent: false },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-orange-500" />
          Expiring Soon
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {expiringItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-sm">{item.name}</span>
              <Badge variant={item.urgent ? "destructive" : "secondary"}>
                {item.expiry}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpiringItems;
