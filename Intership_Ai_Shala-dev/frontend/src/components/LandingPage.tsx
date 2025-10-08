import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BrainCircuit, 
  Shield, 
  Users, 
  FileCheck, 
  Briefcase, 
  BookOpen,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* Navbar */}
     <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center overflow-hidden">
      {/* Use your internship logo image here */}
      <img 
        src="/imtershiplogo.png" 
        alt="Internship Logo" 
        className="w-full h-full object-contain" 
      />
    </div>
    <h1 className="text-xl font-bold">SkillForge</h1>
  </div>
  <nav className="flex items-center gap-6">
    <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
    <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
    <a href="#stats" className="text-gray-700 hover:text-blue-600 font-medium">Stats</a>
    <a href="#cta" className="text-gray-700 hover:text-blue-600 font-medium">Get Started</a>
  </nav>
  <div className="flex gap-4">
    <Button variant="ghost">Login</Button>
    <Button onClick={onGetStarted}>Get Started</Button>
  </div>
</header>


      {/* Hero Section */}
      <section id="home" className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Find Your Perfect Internship & Freelance Opportunities
              </h1>
              <p className="text-lg text-muted-foreground">
                AI-powered platform connecting Indian students and professionals with verified internships, 
                freelance projects, and mentorship opportunities. Built with fraud detection and ATS integration.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline">
                For Companies
              </Button>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>100% Fraud Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Verified Companies</span>
              </div>
            </div>
          </div>

          {/* Right Image/Video */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
              alt="Students working with technology"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold">Powerful Features for Your Success</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines AI technology with human expertise to provide the best internship and freelancing experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BrainCircuit className="w-10 h-10 text-blue-600 mb-4" />
                <CardTitle>AI-Powered Matching</CardTitle>
                <CardDescription>
                  Advanced algorithms match your skills and interests with the perfect opportunities
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <FileCheck className="w-10 h-10 text-green-600 mb-4" />
                <CardTitle>ATS Resume Check</CardTitle>
                <CardDescription>
                  AI-powered resume analysis with instant feedback and improvement suggestions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="w-10 h-10 text-red-600 mb-4" />
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>
                  Advanced fraud detection system protects against fake opportunities and credentials
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="w-10 h-10 text-purple-600 mb-4" />
                <CardTitle>Mentorship Network</CardTitle>
                <CardDescription>
                  Connect with industry mentors and join communities for guidance and support
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-orange-600 mb-4" />
                <CardTitle>Skill Roadmaps</CardTitle>
                <CardDescription>
                  Personalized career roadmaps and course recommendations based on your goals
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <BookOpen className="w-10 h-10 text-indigo-600 mb-4" />
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Access curated courses, tutorials, and resources to enhance your skills
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="px-6 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p>Active Internships</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">5,000+</h3>
              <p>Students Placed</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">1,200+</h3>
              <p>Partner Companies</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">98%</h3>
              <p>Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of students and professionals who have found their dream opportunities through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SkillForge. Built for Indian students and professionals.</p>
        </div>
      </footer>
    </div>
  );
}
