import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/FeatureCard";
import { QuestionCard } from "@/components/QuestionCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Shield, MessageCircle, Users, Newspaper, TrendingUp } from "lucide-react";
import { trendingQuestions, categories } from "@/data/mockData";
import { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredQuestions = activeCategory === "all" 
    ? trendingQuestions.slice(0, 3) 
    : trendingQuestions.filter(q => q.category === activeCategory).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Why Student Connect?</h2>
              <p className="text-muted-foreground md:text-lg max-w-[800px]">
                Our platform provides a safe space for students to connect, learn, and grow through anonymous interactions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon={Shield} 
                title="Anonymous Profiles" 
                description="Create a unique username to maintain privacy while building your reputation on campus."
              />
              <FeatureCard 
                icon={MessageCircle} 
                title="Public Q&A" 
                description="Ask questions and get answers from verified seniors, professors, and alumni."
              />
              <FeatureCard 
                icon={Users} 
                title="Verified Community" 
                description="Everyone is verified with their college email to ensure a genuine campus community."
              />
              <FeatureCard 
                icon={Newspaper} 
                title="Resource Hub" 
                description="Access curated resources and guides specific to your college experience."
              />
            </div>
          </div>
        </section>
        
        {/* Trending Questions Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold tracking-tighter">Trending Questions</h2>
              </div>
              <p className="text-muted-foreground md:text-lg max-w-[800px]">
                See what other students are asking and join the conversation.
              </p>
            </div>
            
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuestions.map((question) => (
                <QuestionCard key={question.id} {...question} />
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <Button asChild className="rounded-full">
                <Link to="/questions">View All Questions</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Join Our Community Today</h2>
              <p className="md:text-lg max-w-[800px] text-primary-foreground/80">
                Connect with peers, receive guidance from seniors, and contribute to building a supportive college community.
              </p>
              <Button asChild size="lg" variant="secondary" className="mt-4 rounded-full">
                <Link to="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
