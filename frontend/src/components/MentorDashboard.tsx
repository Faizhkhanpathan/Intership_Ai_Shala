import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  MessageSquare, 
  Users, 
  Calendar, 
  Clock,
  Bell,
  LogOut,
  UserCheck,
  Star,
  BookOpen,
  Video,
  Phone,
  Mail,
  CheckCircle,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  Heart
} from 'lucide-react';

interface MentorDashboardProps {
  user: any;
  onLogout: () => void;
}

export function MentorDashboard({ user, onLogout }: MentorDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data
  const mentees = [
    {
      id: 1,
      name: 'Rahul Kumar',
      field: 'Frontend Development',
      joinedDate: '2024-01-10',
      progress: 75,
      lastSession: '2024-01-20',
      nextSession: '2024-01-25',
      status: 'active',
      goals: ['Learn React', 'Build Portfolio', 'Find Internship']
    },
    {
      id: 2,
      name: 'Priya Sharma',
      field: 'Data Science',
      joinedDate: '2024-01-15',
      progress: 60,
      lastSession: '2024-01-22',
      nextSession: '2024-01-27',
      status: 'active',
      goals: ['Master Python', 'Complete ML Course', 'Get Job']
    },
    {
      id: 3,
      name: 'Arjun Singh',
      field: 'Backend Development',
      joinedDate: '2024-01-05',
      progress: 90,
      lastSession: '2024-01-21',
      nextSession: 'Completed',
      status: 'completed',
      goals: ['Learn Node.js', 'Build APIs', 'Deploy Projects']
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentee: 'Rahul Kumar',
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Video Call',
      topic: 'React Components & State Management'
    },
    {
      id: 2,
      mentee: 'Priya Sharma',
      date: '2024-01-27',
      time: '2:00 PM',
      type: 'Code Review',
      topic: 'Machine Learning Project Review'
    }
  ];

  const mentorshipRequests = [
    {
      id: 1,
      name: 'Neha Gupta',
      field: 'UI/UX Design',
      experience: 'Beginner',
      goals: 'Learn design fundamentals and get internship',
      requestDate: '2024-01-23'
    },
    {
      id: 2,
      name: 'Vikram Patel',
      field: 'Cloud Computing',
      experience: 'Intermediate',
      goals: 'AWS certification and career transition',
      requestDate: '2024-01-22'
    }
  ];

  const resources = [
    {
      title: 'React Fundamentals Course',
      type: 'Course',
      provider: 'TechEd',
      rating: 4.8,
      recommended: true
    },
    {
      title: 'JavaScript Interview Questions',
      type: 'Document',
      provider: 'Self-created',
      rating: 4.9,
      recommended: true
    },
    {
      title: 'Career Roadmap Template',
      type: 'Template',
      provider: 'Mentor Resources',
      rating: 4.7,
      recommended: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            <h1>InternConnect Mentor</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarFallback>{user?.name?.charAt(0) || 'M'}</AvatarFallback>
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
            Guide the next generation of {user?.field} professionals
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mentees">My Mentees</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Mentees</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Sessions This Month</p>
                      <p className="text-2xl font-bold">28</p>
                    </div>
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Mentor Rating</p>
                      <p className="text-2xl font-bold">4.9</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>
                  Your scheduled mentoring sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        {session.type === 'Video Call' ? (
                          <Video className="w-6 h-6 text-blue-600" />
                        ) : (
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{session.mentee}</h4>
                        <p className="text-sm text-muted-foreground">{session.topic}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{session.date}</span>
                          <span>{session.time}</span>
                          <Badge variant="outline">{session.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Reschedule</Button>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Completed session with Rahul Kumar</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Received 5-star rating from Priya Sharma</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span>Arjun Singh got placed at TechCorp!</span>
                  <span className="text-muted-foreground">3 days ago</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentees Tab */}
          <TabsContent value="mentees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Mentees</CardTitle>
                <CardDescription>
                  Track progress and manage your mentoring relationships
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentees.map((mentee) => (
                  <div key={mentee.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{mentee.name}</h4>
                          <p className="text-sm text-muted-foreground">{mentee.field}</p>
                          <p className="text-xs text-muted-foreground">
                            Started: {new Date(mentee.joinedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={mentee.status === 'active' ? 'default' : 'secondary'}
                          className={mentee.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {mentee.status === 'active' ? 'Active' : 'Completed'}
                        </Badge>
                        <div className="mt-2">
                          <span className="text-sm text-muted-foreground">Progress: </span>
                          <span className="font-semibold">{mentee.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Goals:</p>
                        <div className="flex gap-2 flex-wrap">
                          {mentee.goals.map((goal) => (
                            <Badge key={goal} variant="outline" className="text-xs">
                              {goal}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Last session: {new Date(mentee.lastSession).toLocaleDateString()}</span>
                        <span>Next: {mentee.nextSession === 'Completed' ? 'Completed' : new Date(mentee.nextSession).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="w-4 h-4 mr-1" />
                          Schedule
                        </Button>
                        <Button size="sm">View Profile</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Schedule and manage your mentoring sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>Select Mentee</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Choose a mentee...</option>
                      {mentees.filter(m => m.status === 'active').map((mentee) => (
                        <option key={mentee.id} value={mentee.id}>
                          {mentee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label>Session Type</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Video Call</option>
                      <option>Code Review</option>
                      <option>Career Guidance</option>
                      <option>Mock Interview</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label>Time</label>
                    <Input type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label>Session Topic</label>
                  <Input placeholder="e.g., React Component Architecture" />
                </div>

                <div className="space-y-2">
                  <label>Agenda/Notes</label>
                  <Textarea 
                    placeholder="Outline the session agenda and any preparation notes..."
                    rows={4}
                  />
                </div>

                <Button className="w-full">Schedule Session</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Requests</CardTitle>
                <CardDescription>
                  New students seeking your guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentorshipRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{request.name}</h4>
                        <p className="text-sm text-muted-foreground">{request.field}</p>
                        <Badge variant="outline" className="mt-1">
                          {request.experience}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-1">Goals:</p>
                      <p className="text-sm">{request.goals}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentoring Resources</CardTitle>
                <CardDescription>
                  Share resources and create content for your mentees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full mb-4">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Create New Resource
                </Button>

                {resources.map((resource, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{resource.title}</h4>
                        <p className="text-sm text-muted-foreground">{resource.provider}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {resource.rating}
                          </div>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {resource.recommended && (
                          <Badge variant="secondary">Recommended</Badge>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm">Share</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}