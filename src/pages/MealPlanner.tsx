
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, Utensils, Clock, Users, ChefHat } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const MealPlanner = () => {
  const { toast } = useToast();
  const [selectedMeal, setSelectedMeal] = useState("breakfast");

  const mealSuggestions = {
    breakfast: [
      {
        name: "Greek Yogurt Parfait",
        time: "5 min",
        calories: 320,
        protein: "22g",
        ingredients: ["Greek yogurt", "Berries", "Granola"],
        availableIngredients: 3,
        totalIngredients: 3,
      },
      {
        name: "Spinach & Egg Scramble",
        time: "10 min",
        calories: 280,
        protein: "18g",
        ingredients: ["Eggs", "Spinach", "Cheese"],
        availableIngredients: 2,
        totalIngredients: 3,
      },
    ],
    lunch: [
      {
        name: "Chicken & Spinach Salad",
        time: "15 min",
        calories: 420,
        protein: "35g",
        ingredients: ["Chicken breast", "Spinach", "Olive oil", "Tomatoes"],
        availableIngredients: 2,
        totalIngredients: 4,
      },
    ],
    dinner: [
      {
        name: "Herb Roasted Chicken",
        time: "45 min",
        calories: 480,
        protein: "42g",
        ingredients: ["Chicken breast", "Herbs", "Vegetables"],
        availableIngredients: 1,
        totalIngredients: 3,
      },
    ],
  };

  const handleGenerateAI = () => {
    toast({
      title: "AI Suggestions Generated",
      description: "New meal ideas based on your inventory and preferences",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowDown className="h-5 w-5 rotate-90" />
              </Button>
            </Link>
            <div className="ml-3 flex items-center space-x-3">
              <ChefHat className="h-6 w-6 text-green-600" />
              <h1 className="text-xl font-bold text-gray-900">Meal Planner</h1>
            </div>
          </div>
          <Button onClick={handleGenerateAI} className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600">
            AI Suggest
          </Button>
        </div>
      </header>

      <div className="px-4 py-6">
        <Tabs value={selectedMeal} onValueChange={setSelectedMeal} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
          </TabsList>

          {Object.entries(mealSuggestions).map(([mealType, suggestions]) => (
            <TabsContent key={mealType} value={mealType} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold capitalize">{mealType} Ideas</h2>
                <Badge variant="outline" className="text-xs">
                  Based on your inventory
                </Badge>
              </div>

              {suggestions.map((meal, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{meal.name}</CardTitle>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meal.time}
                          </div>
                          <div>{meal.calories} cal</div>
                          <div>{meal.protein} protein</div>
                        </div>
                      </div>
                      <Badge
                        variant={meal.availableIngredients === meal.totalIngredients ? "default" : "secondary"}
                      >
                        {meal.availableIngredients}/{meal.totalIngredients} available
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Ingredients needed:</h4>
                        <div className="flex flex-wrap gap-2">
                          {meal.ingredients.map((ingredient, idx) => (
                            <Badge
                              key={idx}
                              variant={idx < meal.availableIngredients ? "default" : "outline"}
                              className="text-xs"
                            >
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1" 
                          disabled={meal.availableIngredients < meal.totalIngredients}
                        >
                          Cook This
                        </Button>
                        <Button variant="outline" className="flex-1">
                          View Recipe
                        </Button>
                      </div>
                      {meal.availableIngredients < meal.totalIngredients && (
                        <p className="text-xs text-orange-600 text-center">
                          Missing ingredients - check substitutions
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlanner;
