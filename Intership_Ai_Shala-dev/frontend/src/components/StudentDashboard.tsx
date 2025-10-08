import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  FileUp, 
  BookOpen, 
  MessageSquare,
  Bell,
  LogOut,
  TrendingUp,
  Award,
  Star,
  ExternalLink,
  Download,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface StudentDashboardProps {
  user: any;
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('discover');

  // Mock data
  const recommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechStart India',
      location: 'Bangalore',
      type: 'Internship',
      duration: '3 months',
      stipend: '₹15,000/month',
      skills: ['React', 'JavaScript', 'CSS'],
      matchScore: 95,
      verified: true
    },
    {
      id: 2,
      title: 'Data Science Freelancer',
      company: 'DataCorp',
      location: 'Remote',
      type: 'Freelance',
      duration: '2 weeks',
      stipend: '₹25,000',
      skills: ['Python', 'Machine Learning', 'SQL'],
      matchScore: 88,
      verified: true
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'DesignHub',
      location: 'Mumbai',
      type: 'Internship',
      duration: '6 months',
      stipend: '₹12,000/month',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      matchScore: 76,
      verified: true
    }
  ];

  const courses = [
    {
      title: 'Advanced React Development',
      provider: 'TechEd',
      rating: 4.8,
      students: 15420,
      recommended: true
    },
    {
      title: 'Machine Learning Fundamentals',
      provider: 'DataAcademy',
      rating: 4.9,
      students: 23100,
      recommended: true
    }
  ];

  const communities = [
    {
      name: 'React Developers India',
      members: 12500,
      type: 'WhatsApp',
      active: true
    },
    {
      name: 'Data Science Beginners',
      members: 8900,
      type: 'Telegram',
      active: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h1>InternConnect</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-muted-foreground">
            Find your next opportunity in {user?.field}
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input placeholder="Search internships, freelance projects..." className="pl-10" />
                  </div>
                  <Button>Search</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Profile Match</p>
                      <p className="text-2xl font-bold">87%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Applications</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <FileUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Interviews</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Offers</p>
                      <p className="text-2xl font-bold">1</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>
                  AI-curated opportunities based on your skills and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{job.title}</h3>
                          {job.verified && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {job.matchScore}% Match
                        </Badge>
                        <p className="text-sm text-muted-foreground">{job.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.stipend}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm">Apply Now</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis</CardTitle>
                <CardDescription>
                  AI-powered ATS check and optimization suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Your Resume</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your resume file or click to browse
                  </p>
                  <Button>Choose File</Button>
                </div>

                {/* Mock ATS Results */}
                <div className="space-y-4">
                  <h3>Last ATS Analysis</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h4>ATS Score</h4>
                        <span className="text-2xl font-bold text-green-600">78%</span>
                      </div>
                      <Progress value={78} className="mb-4" />
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Keywords optimization: Good</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span>Skills section needs improvement</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Format compatibility: Excellent</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Courses</CardTitle>
                <CardDescription>
                  Boost your skills with these curated courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-muted-foreground text-sm">{course.provider}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {course.rating}
                          </div>
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {course.recommended && (
                          <Badge variant="secondary">Recommended</Badge>
                        )}
                        <Button size="sm">Enroll</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Join Communities</CardTitle>
                <CardDescription>
                  Connect with peers and mentors in your field
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {communities.map((community, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{community.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          {community.members.toLocaleString()} members • {community.type}
                        </p>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Find a Mentor</CardTitle>
                <CardDescription>
                  Get guidance from industry professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Browse Mentors
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>
                  Track the status of your internship and freelance applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No applications yet</p>
                  <p className="text-sm">Start applying to opportunities to see them here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}