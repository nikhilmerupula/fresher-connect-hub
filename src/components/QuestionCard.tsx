
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Clock, BookmarkPlus, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface QuestionCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  username: string;
  userType: string;
  replies: number;
  likes: number;
  timeAgo: string;
}

export const QuestionCard = ({
  id,
  title,
  excerpt,
  category,
  username,
  userType,
  replies,
  likes: initialLikes,
  timeAgo,
}: QuestionCardProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for previously liked questions
    const likedQuestions = JSON.parse(localStorage.getItem('likedQuestions') || '[]');
    if (likedQuestions.includes(id)) {
      setLiked(true);
    }

    // Check for bookmarked questions
    const bookmarkedQuestions = JSON.parse(localStorage.getItem('bookmarkedQuestions') || '[]');
    if (bookmarkedQuestions.includes(id)) {
      setBookmarked(true);
    }
  }, [id]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get existing liked questions
    const likedQuestions = JSON.parse(localStorage.getItem('likedQuestions') || '[]');
    
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
      
      // Add to liked questions
      if (!likedQuestions.includes(id)) {
        likedQuestions.push(id);
        localStorage.setItem('likedQuestions', JSON.stringify(likedQuestions));
      }
      
      toast({
        title: "Question liked",
        description: "Thank you for your feedback!",
      });
    } else {
      setLikes(prev => prev - 1);
      setLiked(false);
      
      // Remove from liked questions
      const updatedLikes = likedQuestions.filter((qId: string) => qId !== id);
      localStorage.setItem('likedQuestions', JSON.stringify(updatedLikes));
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get existing bookmarked questions
    const bookmarkedQuestions = JSON.parse(localStorage.getItem('bookmarkedQuestions') || '[]');
    
    if (!bookmarked) {
      setBookmarked(true);
      
      // Add to bookmarked questions
      if (!bookmarkedQuestions.includes(id)) {
        bookmarkedQuestions.push(id);
        localStorage.setItem('bookmarkedQuestions', JSON.stringify(bookmarkedQuestions));
      }
      
      toast({
        title: "Question bookmarked",
        description: "Added to your saved questions.",
      });
    } else {
      setBookmarked(false);
      
      // Remove from bookmarked questions
      const updatedBookmarks = bookmarkedQuestions.filter((qId: string) => qId !== id);
      localStorage.setItem('bookmarkedQuestions', JSON.stringify(updatedBookmarks));
      
      toast({
        title: "Bookmark removed",
        description: "Removed from your saved questions.",
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/questions/${id}`);
  };

  return (
    <Card 
      className="hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg h-full flex flex-col cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
            #{category}
          </Badge>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0"
              onClick={handleBookmark}
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <BookmarkPlus className="h-4 w-4" />
              )}
            </Button>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo}
            </div>
          </div>
        </div>
        <CardTitle className="text-lg">
          <Link 
            to={`/questions/${id}`} 
            className="hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t flex justify-between items-center text-xs">
        <div className="flex items-center gap-1">
          <div className="bg-primary/20 text-primary px-2 py-1 rounded-full">
            {username}
          </div>
          <Badge variant="secondary" className="text-[10px]">
            {userType}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center h-6 p-0 ${liked ? 'text-primary' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            {likes}
          </Button>
          <Link 
            to={`/questions/${id}`} 
            className="flex items-center hover:text-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            {replies}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
