
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp, ArrowLeft, Send, Clock, MessageCircle } from "lucide-react";
import { trendingQuestions } from "@/data/mockData";

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replies, setReplies] = useState<any[]>([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const { toast } = useToast();

  // Fetch question data
  useEffect(() => {
    // Simulate API call to get question details
    setTimeout(() => {
      const foundQuestion = trendingQuestions.find(q => q.id === id);
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setLikes(foundQuestion.likes);
        
        // Generate some mock replies
        const mockReplies = [
          {
            id: "r1",
            username: "HelpfulSenior",
            userType: "Senior",
            content: "I'd recommend starting with the campus orientation sessions. They provide a lot of useful information and resources specifically for freshers.",
            timeAgo: "2d ago",
            likes: 12,
          },
          {
            id: "r2",
            username: "ProfWisdom",
            userType: "Faculty",
            content: "Don't hesitate to visit professors during office hours. We're here to help you adjust and succeed in your academic journey.",
            timeAgo: "1d ago",
            likes: 8,
          }
        ];
        setReplies(mockReplies);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
      toast({
        title: "Question liked",
        description: "Thank you for your feedback!"
      });
    }
    setLiked(!liked);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReply = {
        id: `r${replies.length + 1}`,
        username: "You",
        userType: "Fresher",
        content: replyText,
        timeAgo: "Just now",
        likes: 0
      };
      
      setReplies(prev => [newReply, ...prev]);
      setReplyText("");
      setIsSubmitting(false);
      
      toast({
        title: "Reply posted!",
        description: "Your reply has been added to the discussion."
      });
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container px-4 md:px-6 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container px-4 md:px-6 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Question not found</h2>
            <p className="text-muted-foreground mb-6">The question you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/questions">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Questions
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container px-4 md:px-6 py-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to="/questions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Questions
            </Link>
          </Button>
          
          {/* Question */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                #{question.category}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {question.timeAgo}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold">{question.title}</h1>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {question.username}
                </div>
                <Badge variant="secondary">{question.userType}</Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLike}
                  className={`flex items-center gap-1 ${liked ? 'text-primary' : ''}`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{likes}</span>
                </Button>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>{replies.length}</span>
                </div>
              </div>
            </div>
            
            <p className="text-lg">{question.excerpt}</p>
            <p className="text-muted-foreground">
              {question.content || "I'm a new student and feeling a bit overwhelmed with everything. Can anyone share some advice on how to make the most of my first few weeks on campus? What resources should I be aware of? Any tips for balancing academics and social life?"}
            </p>
          </div>
          
          <Separator className="my-8" />
          
          {/* Reply Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Reply</h2>
            <form onSubmit={handleReplySubmit}>
              <Textarea
                placeholder="Share your thoughts or advice..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[120px] mb-4"
                disabled={isSubmitting}
              />
              <Button type="submit" disabled={!replyText.trim() || isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting...
                  </div>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Post Reply
                  </>
                )}
              </Button>
            </form>
          </div>
          
          {/* Replies */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Replies ({replies.length})</h2>
            
            {replies.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground">
                <p>No replies yet. Be the first to reply!</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {replies.map((reply) => (
                  <Card key={reply.id} className="p-4">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">
                          {reply.username}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {reply.userType}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {reply.timeAgo}
                      </div>
                    </div>
                    <p className="mb-3">{reply.content}</p>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="text-sm flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" /> {reply.likes}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuestionDetail;
