
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid college email").endsWith(".edu", {
    message: "Must be a college email ending with .edu"
  }),
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username cannot exceed 20 characters"),
  role: z.enum(["fresher", "senior", "alumni", "faculty"], {
    required_error: "Please select your role",
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid college email").endsWith(".edu", {
    message: "Must be a college email ending with .edu"
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const interestOptions = ["Academics", "Career", "Research", "Internships", "Campus Life", 
    "Housing", "Clubs", "Sports", "Mental Health", "Study Abroad"];
  
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      role: "fresher",
    },
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    signupForm.setValue("role", role as "fresher" | "senior" | "alumni" | "faculty");
  };
  
  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSignupSubmit = (values: SignupFormValues) => {
    if (selectedInterests.length < 3) {
      toast({
        title: "Please select at least 3 interests",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Mock user registration - in a real app, you would save to a database
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user info in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({
        username: values.username,
        email: values.email,
        role: values.role,
        interests: selectedInterests,
        isLoggedIn: true
      }));
      
      toast({
        title: "Welcome to FreshersHub!",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to questions page after successful signup
      navigate('/questions');
    }, 1000);
  };

  const handleLoginSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real app, you would verify credentials against a database
      // For now, we'll create a mock user
      localStorage.setItem('user', JSON.stringify({
        username: "DemoUser",
        email: values.email,
        role: "fresher",
        isLoggedIn: true
      }));
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      // Redirect to questions page after successful login
      navigate('/questions');
    }, 1000);
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
                <Form {...signupForm}>
                  <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>College Email</FormLabel>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                  <Input 
                                    placeholder="yourname@college.edu" 
                                    className="pl-10" 
                                    {...field} 
                                    disabled={isLoading}
                                  />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signupForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>Username <Badge variant="outline" className="ml-2">Anonymous</Badge></FormLabel>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <FormControl>
                                  <Input 
                                    placeholder="Choose a username" 
                                    className="pl-10" 
                                    {...field}
                                    disabled={isLoading}
                                  />
                                </FormControl>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                This is how others will see you
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <FormField
                          control={signupForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel>I am a...</FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <Button 
                                  type="button" 
                                  variant={selectedRole === "fresher" ? "default" : "outline"} 
                                  className="justify-start hover:bg-primary/10 border-primary/20"
                                  onClick={() => handleRoleSelect("fresher")}
                                  disabled={isLoading}
                                >
                                  <Fingerprint className="mr-2 h-4 w-4" />
                                  Fresher
                                </Button>
                                <Button 
                                  type="button" 
                                  variant={selectedRole === "senior" ? "default" : "outline"} 
                                  className="justify-start"
                                  onClick={() => handleRoleSelect("senior")}
                                  disabled={isLoading}
                                >
                                  <User className="mr-2 h-4 w-4" />
                                  Senior
                                </Button>
                                <Button 
                                  type="button" 
                                  variant={selectedRole === "alumni" ? "default" : "outline"} 
                                  className="justify-start"
                                  onClick={() => handleRoleSelect("alumni")}
                                  disabled={isLoading}
                                >
                                  <School className="mr-2 h-4 w-4" />
                                  Alumni
                                </Button>
                                <Button 
                                  type="button" 
                                  variant={selectedRole === "faculty" ? "default" : "outline"} 
                                  className="justify-start"
                                  onClick={() => handleRoleSelect("faculty")}
                                  disabled={isLoading}
                                >
                                  <School className="mr-2 h-4 w-4" />
                                  Faculty
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="interests">Interests (select at least 3)</Label>
                        <div className="flex flex-wrap gap-2">
                          {interestOptions.map((interest) => (
                            <Badge 
                              key={interest} 
                              variant={selectedInterests.includes(interest) ? "default" : "outline"} 
                              className="cursor-pointer hover:bg-primary/10"
                              onClick={() => handleInterestToggle(interest)}
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        {selectedInterests.length < 3 && (
                          <p className="text-xs text-destructive">Please select at least 3 interests</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading || selectedInterests.length < 3}
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
                </Form>
              </TabsContent>
              
              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>College Email</FormLabel>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="yourname@college.edu" 
                                  className="pl-10" 
                                  {...field} 
                                  disabled={isLoading}
                                />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full" disabled={isLoading}>
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
                            Log In <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground mt-4">
                        Quick login for demo purposes
                      </p>
                    </div>
                  </form>
                </Form>
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
