import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

const Profile = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error loading profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">{profile?.full_name || 'Anonymous'}</h2>
            <p className="text-sm text-muted-foreground capitalize">{profile?.role || 'No role set'}</p>
            <div className="w-full px-4 py-2 bg-muted rounded-md text-sm">
              <p className="text-center break-all">ID: {profile?.id}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  placeholder="Enter your name" 
                  value={profile?.full_name || ''} 
                  onChange={(e) => updateProfile({ full_name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Role</Label>
                <Select 
                  value={profile?.role} 
                  onValueChange={(value) => updateProfile({ role: value as 'farmer' | 'retailer' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="retailer">Retailer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Contact</Label>
                <Input 
                  placeholder="Enter your contact" 
                  value={profile?.contact || ''} 
                  onChange={(e) => updateProfile({ contact: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Location</Label>
                <Input 
                  placeholder="Enter your location" 
                  value={profile?.location || ''} 
                  onChange={(e) => updateProfile({ location: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>About</Label>
              <Textarea
                placeholder="Tell us about yourself"
                value={profile?.about || ''}
                onChange={(e) => updateProfile({ about: e.target.value })}
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;