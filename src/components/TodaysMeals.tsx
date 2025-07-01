
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Plus } from "lucide-react";

const TodaysMeals = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-green-500" />
            Today's Meals
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-sm">Breakfast</p>
              <p className="text-xs text-gray-600">Greek yogurt parfait</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">320 cal</p>
              <p className="text-xs text-gray-600">22g protein</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
            <div>
              <p className="font-medium text-sm">Lunch</p>
              <p className="text-xs text-gray-600">Not planned yet</p>
            </div>
            <Button size="sm" variant="ghost">
              Get AI Suggestion
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysMeals;
