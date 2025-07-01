
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Camera, Clock, Plus, Utensils, BarChart3, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import QuickScanButton from "@/components/QuickScanButton";
import ExpiringItems from "@/components/ExpiringItems";
import TodaysMeals from "@/components/TodaysMeals";
import NutritionOverview from "@/components/NutritionOverview";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FoodSmart</h1>
              <p className="text-sm text-gray-500">Smart Food Management</p>
            </div>
          </div>
          <Link to="/settings">
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="inventory" className="text-xs">Inventory</TabsTrigger>
            <TabsTrigger value="meals" className="text-xs">Meals</TabsTrigger>
            <TabsTrigger value="nutrition" className="text-xs">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <QuickScanButton />
              <Link to="/meal-planner">
                <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Utensils className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="font-medium text-sm">Plan Meals</p>
                    <p className="text-xs text-gray-500">AI suggestions</p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Expiring Items Alert */}
            <ExpiringItems />

            {/* Today's Meals Preview */}
            <TodaysMeals />

            {/* Quick Nutrition Stats */}
            <NutritionOverview />
          </TabsContent>

          <TabsContent value="inventory">
            <div className="text-center py-8">
              <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">Your Inventory</h3>
              <p className="text-gray-600 mb-4">Scan items to build your smart inventory</p>
              <QuickScanButton />
            </div>
          </TabsContent>

          <TabsContent value="meals">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5" />
                    Today's Meal Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Breakfast</span>
                      <Badge variant="outline">Planned</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Lunch</span>
                      <Badge variant="secondary">Suggestion Available</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Dinner</span>
                      <Badge variant="outline">Not Planned</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrition">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Daily Nutrition Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Calories</span>
                      <span className="text-sm text-gray-600">1,200 / 2,000</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Protein</span>
                      <span className="text-sm text-gray-600">45g / 150g</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Carbohydrates</span>
                      <span className="text-sm text-gray-600">120g / 250g</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Fat</span>
                      <span className="text-sm text-gray-600">35g / 65g</span>
                    </div>
                    <Progress value={54} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
