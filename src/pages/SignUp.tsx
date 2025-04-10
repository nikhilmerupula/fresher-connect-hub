
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Fingerprint, User, School, ArrowRight } from "lucide-react";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Verification link sent!",
        description: "Please check your college email to continue.",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container max-w-4xl px-4 md:px-6 py-12">
        <Card className="mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Join FreshersHub</CardTitle>
            <CardDescription>
              Connect with your college community while staying anonymous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Log In</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">College Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="yourname@college.edu" 
                            className="pl-10" 
                            required 
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          We'll send a verification link to this email
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username <Badge variant="outline" className="ml-2">Anonymous</Badge></Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="username" 
                            placeholder="Choose a username" 
                            className="pl-10" 
                            required 
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          This is how others will see you
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">I am a...</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="justify-start hover:bg-primary/10 border-primary/20"
                        >
                          <Fingerprint className="mr-2 h-4 w-4" />
                          Fresher
                        </Button>
                        <Button type="button" variant="outline" className="justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Senior
                        </Button>
                        <Button type="button" variant="outline" className="justify-start">
                          <School className="mr-2 h-4 w-4" />
                          Alumni
                        </Button>
                        <Button type="button" variant="outline" className="justify-start">
                          <School className="mr-2 h-4 w-4" />
                          Faculty
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="interests">Interests (select at least 3)</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Academics", "Career", "Research", "Internships", "Campus Life", 
                          "Housing", "Clubs", "Sports", "Mental Health", "Study Abroad"].map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="cursor-pointer hover:bg-primary/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          Join FreshersHub <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="login">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">College Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="login-email" 
                          type="email" 
                          placeholder="yourname@college.edu" 
                          className="pl-10" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      Send Login Link <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      We'll email you a magic link to log in
                    </p>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUp;
