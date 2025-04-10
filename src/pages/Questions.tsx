
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuestionCard } from "@/components/QuestionCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trendingQuestions, categories } from "@/data/mockData";
import { Search, Plus } from "lucide-react";

const Questions = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredQuestions = trendingQuestions
    .filter(q => 
      (activeCategory === "all" || q.category === activeCategory) &&
      (searchQuery === "" || 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Questions & Discussions</h1>
            <p className="text-muted-foreground">
              Browse questions or start a new discussion with the community
            </p>
          </div>
          <Button className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Ask Question
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
            
            <div className="space-y-6">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard key={question.id} {...question} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No questions found matching your criteria.</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Ask the First Question
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button 
                      key={category}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => setActiveCategory(category)}
                    >
                      #{category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Question Guidelines</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>Be specific and clear about your question</li>
                  <li>Check if your question has been asked before</li>
                  <li>Use appropriate tags for better visibility</li>
                  <li>Be respectful and follow community guidelines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Questions;
