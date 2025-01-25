import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute bottom-0 right-0 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-muted-foreground">Farmer</p>
          </div>
        </Card>
        
        <Card className="p-6 md:col-span-2">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Enter your name" defaultValue="John Doe" />
              </div>
              
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your email" defaultValue="john@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="Enter your phone" defaultValue="+1 234 567 890" />
              </div>
              
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Enter your location" defaultValue="New York, USA" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>About</Label>
              <Textarea
                placeholder="Tell us about yourself"
                defaultValue="I'm a farmer specializing in organic produce..."
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;