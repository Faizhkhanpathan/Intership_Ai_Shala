import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Plus, 
  Users, 
  Eye, 
  MessageSquare,
  Bell,
  LogOut,
  Building,
  MapPin,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  BarChart3,
  TrendingUp
} from 'lucide-react';

interface CompanyDashboardProps {
  user: any;
  onLogout: () => void;
}

export function CompanyDashboard({ user, onLogout }: CompanyDashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data
  const jobListings = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      type: 'Internship',
      location: 'Bangalore',
      duration: '3 months',
      stipend: '₹15,000/month',
      posted: '2 days ago',
      applications: 45,
      status: 'active'
    },
    {
      id: 2,
      title: 'Backend Developer',
      type: 'Full-time',
      location: 'Mumbai',
      duration: 'Permanent',
      stipend: '₹8,00,000/year',
      posted: '1 week ago',
      applications: 78,
      status: 'active'
    }
  ];

  const applications = [
    {
      id: 1,
      candidateName: 'Rahul Kumar',
      role: 'Frontend Developer Intern',
      appliedDate: '2024-01-15',
      atsScore: 92,
      status: 'under_review',
      skills: ['React', 'JavaScript', 'CSS'],
      experience: 'Fresher'
    },
    {
      id: 2,
      candidateName: 'Priya Sharma',
      role: 'Frontend Developer Intern',
      appliedDate: '2024-01-14',
      atsScore: 87,
      status: 'shortlisted',
      skills: ['React', 'Node.js', 'TypeScript'],
      experience: '1 year'
    },
    {
      id: 3,
      candidateName: 'Arjun Singh',
      role: 'Backend Developer',
      appliedDate: '2024-01-13',
      atsScore: 76,
      status: 'interview_scheduled',
      skills: ['Python', 'Django', 'SQL'],
      experience: '2 years'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Badge variant="secondary">Under Review</Badge>;
      case 'shortlisted':
        return <Badge className="bg-blue-100 text-blue-800">Shortlisted</Badge>;
      case 'interview_scheduled':
        return <Badge className="bg-green-100 text-green-800">Interview Scheduled</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <h1>InternConnect for Business</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Avatar>
              <AvatarFallback>{user?.companyName?.charAt(0) || 'C'}</AvatarFallback>
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
          <h2 className="text-2xl mb-2">Welcome, {user?.companyName}!</h2>
          <p className="text-muted-foreground">
            Manage your job listings and find the best talent
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Listings</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Jobs</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Building className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Applications</p>
                      <p className="text-2xl font-bold">234</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Interviews</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Hired</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Latest candidates who applied to your positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{app.candidateName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{app.candidateName}</h4>
                          <p className="text-sm text-muted-foreground">{app.role}</p>
                          <div className="flex gap-2 mt-1">
                            {app.skills.slice(0, 2).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-semibold">ATS Score: {app.atsScore}%</p>
                          {getStatusBadge(app.status)}
                        </div>
                        <Button size="sm">Review</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Listings Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Job Listings</h3>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Job Posting</CardTitle>
                <CardDescription>
                  Post internships and full-time positions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label>Job Title</label>
                    <Input placeholder="e.g., Frontend Developer Intern" />
                  </div>
                  <div className="space-y-2">
                    <label>Job Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label>Location</label>
                    <Input placeholder="e.g., Bangalore" />
                  </div>
                  <div className="space-y-2">
                    <label>Duration</label>
                    <Input placeholder="e.g., 3 months" />
                  </div>
                  <div className="space-y-2">
                    <label>Stipend/Salary</label>
                    <Input placeholder="e.g., ₹15,000/month" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label>Job Description</label>
                  <Textarea 
                    placeholder="Describe the role, responsibilities, and requirements..."
                    rows={5}
                  />
                </div>

                <Button className="w-full">Post Job</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobListings.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
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
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Posted {job.posted}</span>
                          <span>{job.applications} applications</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Applications</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input placeholder="Search candidates..." className="pl-10 w-64" />
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="space-y-4 p-6">
                  {applications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{app.candidateName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{app.candidateName}</h4>
                            <p className="text-sm text-muted-foreground">{app.role}</p>
                            <p className="text-xs text-muted-foreground">
                              Applied on {new Date(app.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="mb-2">
                            <span className="text-sm text-muted-foreground">ATS Score</span>
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-bold text-green-600">{app.atsScore}%</div>
                              <Star className="w-4 h-4 text-yellow-500" />
                            </div>
                          </div>
                          {getStatusBadge(app.status)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">Skills & Experience</p>
                        <div className="flex items-center gap-2 mb-2">
                          {app.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{app.experience}</p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Resume
                        </Button>
                        <Button size="sm" variant="outline" className="text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Shortlist
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm">Schedule Interview</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                  <CardDescription>
                    Applications received over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Analytics chart would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Skills in Applications</CardTitle>
                  <CardDescription>
                    Most common skills among applicants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>React</span>
                      <span className="font-semibold">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>JavaScript</span>
                      <span className="font-semibold">38%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Python</span>
                      <span className="font-semibold">32%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Node.js</span>
                      <span className="font-semibold">28%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}