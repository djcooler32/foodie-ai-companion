
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3 } from "lucide-react";

const NutritionOverview = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-500" />
          Nutrition Today
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium">Calories</span>
              <span className="text-xs text-gray-600">320/2000</span>
            </div>
            <Progress value={16} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium">Protein</span>
              <span className="text-xs text-gray-600">22g/150g</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionOverview;
