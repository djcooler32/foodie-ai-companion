import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, Settings as SettingsIcon, User, Bell, Shield, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    kosher: false,
    halal: false,
    keto: false,
    paleo: false,
  });

  const [allergies, setAllergies] = useState({
    nuts: false,
    shellfish: false,
    eggs: false,
    soy: false,
  });

  const [voiceSettings, setVoiceSettings] = useState({
    voiceAssistant: true,
    speechFeedback: true,
    wakePhraseEnabled: false,
    voiceLanguage: 'en-US'
  });

  const toggleDietaryRestriction = (key: string) => {
    setDietaryRestrictions(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const toggleAllergy = (key: string) => {
    setAllergies(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const toggleVoiceSetting = (key: string) => {
    setVoiceSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 py-4 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowDown className="h-5 w-5 rotate-90" />
            </Button>
          </Link>
          <div className="ml-3 flex items-center space-x-3">
            <SettingsIcon className="h-6 w-6 text-gray-700" />
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Daily Calories</label>
                <p className="text-2xl font-bold text-green-600">2,000</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Activity Level</label>
                <p className="text-sm text-gray-600">Moderately Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Voice Assistant Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Voice Commands</p>
                <p className="text-sm text-gray-600">Enable voice control for app functions</p>
              </div>
              <Switch
                checked={voiceSettings.voiceAssistant}
                onCheckedChange={() => toggleVoiceSetting('voiceAssistant')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Speech Feedback</p>
                <p className="text-sm text-gray-600">Hear responses from the assistant</p>
              </div>
              <Switch
                checked={voiceSettings.speechFeedback}
                onCheckedChange={() => toggleVoiceSetting('speechFeedback')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Wake Phrase</p>
                <p className="text-sm text-gray-600">Always listen for "Hey FoodieAI"</p>
              </div>
              <Switch
                checked={voiceSettings.wakePhraseEnabled}
                onCheckedChange={() => toggleVoiceSetting('wakePhraseEnabled')}
              />
            </div>
            <div className="pt-3">
              <h4 className="font-medium mb-2">Compatible Assistants</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Siri Shortcuts</Badge>
                <Badge variant="default">Google Assistant</Badge>
                <Badge variant="default">Alexa Skills</Badge>
                <Badge variant="secondary">Bixby (Beta)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dietary Restrictions */}
        <Card>
          <CardHeader>
            <CardTitle>Dietary Preferences & Laws</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Diet Types</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(dietaryRestrictions).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <Switch
                      checked={value}
                      onCheckedChange={() => toggleDietaryRestriction(key)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Allergies</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(allergies).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm capitalize">{key}</label>
                    <Switch
                      checked={value}
                      onCheckedChange={() => toggleAllergy(key)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <h4 className="font-medium mb-2">Active Restrictions</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(dietaryRestrictions)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <Badge key={key} variant="secondary">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </Badge>
                  ))}
                {Object.entries(allergies)
                  .filter(([_, value]) => value)
                  .map(([key]) => (
                    <Badge key={key} variant="destructive">
                      {key} allergy
                    </Badge>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Expiration Alerts</p>
                <p className="text-sm text-gray-600">Get notified about expiring items</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Meal Reminders</p>
                <p className="text-sm text-gray-600">Daily meal planning suggestions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* AI Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Smart Suggestions</p>
                <p className="text-sm text-gray-600">AI-powered meal recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ingredient Substitutions</p>
                <p className="text-sm text-gray-600">Alternative ingredient suggestions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
