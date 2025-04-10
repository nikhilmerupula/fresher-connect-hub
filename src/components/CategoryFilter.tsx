
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryCounts = {},
}: CategoryFilterProps) => {
  const getTotalCount = () => {
    return Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory("all")}
        className="rounded-full hover:bg-primary/90 transition-colors"
      >
        All
        {categoryCounts && Object.keys(categoryCounts).length > 0 && (
          <Badge variant="secondary" className="ml-2">
            {getTotalCount()}
          </Badge>
        )}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
          className="rounded-full hover:bg-primary/10 transition-colors"
        >
          #{category}
          {categoryCounts && categoryCounts[category] && (
            <Badge variant="secondary" className="ml-2">
              {categoryCounts[category]}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};
