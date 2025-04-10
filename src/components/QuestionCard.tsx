
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Clock } from "lucide-react";

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
  likes,
  timeAgo,
}: QuestionCardProps) => {
  return (
    <Card className="hover-scale card-shadow h-full flex flex-col">
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
          <div className="flex items-center">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {likes}
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-1" />
            {replies}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
