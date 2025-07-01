
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Apple, 
  ChefHat, 
  Settings, 
  Camera, 
  Plus, 
  Calendar,
  TrendingUp,
  AlertCircle 
} from "lucide-react";
import { Link } from "react-router-dom";
import QuickScanButton from "@/components/QuickScanButton";
import VoiceAssistantButton from "@/components/VoiceAssistantButton";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [inventory, setInventory] = useState([
    { name: "Apples", quantity: 5, expiry: "3 days", category: "fruits", protein: 0, calories: 80 },
    { name: "Chicken Breast", quantity: 2, expiry: "2 days", category: "proteins", protein: 25, calories: 165 },
    { name: "Spinach", quantity: 1, expiry: "5 days", category: "vegetables", protein: 3, calories: 25 },
    { name: "Greek Yogurt", quantity: 3, expiry: "7 days", category: "dairy", protein: 15, calories: 100 },
  ]);

  const handleAddFood = (food: string) => {
    // Add food to inventory
    const newItem = {
      name: food,
      quantity: 1,
      expiry: "7 days",
      category: "other",
      protein: 0,
      calories: 100
    };
    setInventory(prev => [...prev, newItem]);
    toast({
      title: "Food Added",
      description: `${food} has been added to your inventory`,
    });
  };

  const handleCheckExpiring = () => {
    const expiringSoon = inventory.filter(item => 
      parseInt(item.expiry) <= 3
    );
    
    toast({
      title: "Expiring Items",
      description: `You have ${expiringSoon.length} items expiring soon: ${expiringSoon.map(item => item.name).join(', ')}`,
    });
  };

  const handleSuggestMeal = (mealType: string) => {
    const availableIngredients = inventory.map(item => item.name);
    toast({
      title: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Suggestion`,
      description: `Based on your ${availableIngredients.slice(0, 3).join(', ')}, I suggest a healthy ${mealType}!`,
    });
  };

  const handleGroceryList = () => {
    toast({
      title: "Grocery List",
      description: "Generated grocery list based on your meal plans and missing ingredients",
    });
  };

  const totalCalories = inventory.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  const totalProtein = inventory.reduce((sum, item) => sum + (item.protein * item.quantity), 0);
  const expiringItems = inventory.filter(item => parseInt(item.expiry) <= 3).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Apple className="h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">FoodieAI</h1>
              <p className="text-sm text-gray-600">Your Smart Food Companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <VoiceAssistantButton
              onAddFood={handleAddFood}
              onCheckExpiring={handleCheckExpiring}
              onSuggestMeal={handleSuggestMeal}
              onGroceryList={handleGroceryList}
            />
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{inventory.length}</div>
              <div className="text-sm text-gray-600">Items</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">{expiringItems}</div>
              <div className="text-sm text-gray-600">Expiring Soon</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{totalCalories}</div>
              <div className="text-sm text-gray-600">Total Calories</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <QuickScanButton />
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link to="/meal-planner">
              <CardContent className="p-4 text-center">
                <ChefHat className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <p className="font-medium text-sm">Meal Planner</p>
                <p className="text-xs text-gray-500">AI suggestions</p>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Voice Commands Help */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Voice Commands</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>"Add [food] to inventory"</strong> - Add items to your food list</p>
              <p><strong>"Check expiring items"</strong> - See what's expiring soon</p>
              <p><strong>"Suggest breakfast/lunch/dinner"</strong> - Get meal ideas</p>
              <p><strong>"Show grocery list"</strong> - View shopping recommendations</p>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {inventory.slice(0, 4).map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity} • Expires in {item.expiry}</p>
                  </div>
                  <Badge variant={parseInt(item.expiry) <= 3 ? "destructive" : "secondary"}>
                    {parseInt(item.expiry) <= 3 ? "Urgent" : "Fresh"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
