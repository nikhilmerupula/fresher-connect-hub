
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Clock } from "lucide-react";
import { useState } from "react";
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
  const { toast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
      toast({
        title: "Question liked",
        description: "Thank you for your feedback!",
      });
    } else {
      setLikes(prev => prev - 1);
      setLiked(false);
    }
  };

  return (
    <Card className="hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
            #{category}
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {timeAgo}
          </div>
        </div>
        <CardTitle className="text-lg">
          <Link to={`/questions/${id}`} className="hover:text-primary transition-colors">
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
          <div 
            className={`flex items-center cursor-pointer ${liked ? 'text-primary' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp className="h-3 w-3 mr-1" />
            {likes}
          </div>
          <Link to={`/questions/${id}`} className="flex items-center hover:text-primary">
            <MessageCircle className="h-3 w-3 mr-1" />
            {replies}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
