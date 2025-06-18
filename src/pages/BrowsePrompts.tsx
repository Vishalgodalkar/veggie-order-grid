
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Heart, Star, Eye } from 'lucide-react';

// Mock data for prompts
const mockPrompts = [
  {
    id: 1,
    title: "Creative Writing Assistant",
    description: "Generate engaging stories, articles, and creative content with this versatile writing prompt.",
    category: "Writing",
    rating: 4.8,
    uses: 1250,
    tags: ["creative", "writing", "storytelling"],
    author: "Sarah Johnson",
    isFavorite: false
  },
  {
    id: 2,
    title: "Code Documentation Generator",
    description: "Automatically generate comprehensive documentation for your code projects.",
    category: "Programming",
    rating: 4.9,
    uses: 890,
    tags: ["coding", "documentation", "technical"],
    author: "Alex Chen",
    isFavorite: true
  },
  {
    id: 3,
    title: "Marketing Copy Optimizer",
    description: "Create compelling marketing copy that converts and engages your target audience.",
    category: "Marketing",
    rating: 4.7,
    uses: 2100,
    tags: ["marketing", "copywriting", "conversion"],
    author: "Maria Rodriguez",
    isFavorite: false
  },
  {
    id: 4,
    title: "Data Analysis Helper",
    description: "Analyze and interpret complex datasets with clear explanations and insights.",
    category: "Analytics",
    rating: 4.6,
    uses: 650,
    tags: ["data", "analysis", "insights"],
    author: "David Kim",
    isFavorite: false
  },
  {
    id: 5,
    title: "Language Translator",
    description: "Translate text between multiple languages while preserving context and tone.",
    category: "Language",
    rating: 4.8,
    uses: 1750,
    tags: ["translation", "language", "communication"],
    author: "Elena Volkov",
    isFavorite: true
  },
  {
    id: 6,
    title: "Resume Builder Pro",
    description: "Create professional resumes tailored to specific job positions and industries.",
    category: "Career",
    rating: 4.7,
    uses: 980,
    tags: ["resume", "career", "job search"],
    author: "Michael Brown",
    isFavorite: false
  }
];

const categories = ["All", "Writing", "Programming", "Marketing", "Analytics", "Language", "Career"];

const BrowsePrompts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prompts, setPrompts] = useState(mockPrompts);

  const toggleFavorite = (id: number) => {
    setPrompts(prev => prev.map(prompt => 
      prompt.id === id ? { ...prompt, isFavorite: !prompt.isFavorite } : prompt
    ));
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Prompts</h1>
          <p className="text-gray-600">Discover and explore thousands of AI prompts for every use case</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search prompts, tags, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPrompts.length} of {prompts.length} prompts
          </p>
        </div>

        {/* Prompts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <Card key={prompt.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{prompt.category}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(prompt.id)}
                    className="p-1 h-auto"
                  >
                    <Heart 
                      className={`h-5 w-5 ${prompt.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </Button>
                </div>
                <CardTitle className="text-lg">{prompt.title}</CardTitle>
                <CardDescription>{prompt.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {prompt.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {prompt.rating}
                    </div>
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {prompt.uses.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Author */}
                <p className="text-xs text-gray-500 mb-4">by {prompt.author}</p>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Use Prompt
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No prompts found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePrompts;
