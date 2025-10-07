import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, User, Building, UserCheck } from 'lucide-react';

interface AuthFlowProps {
  onAuthSuccess: (userData: any, userType: 'student' | 'company' | 'mentor') => void;
  onBack: () => void;
}

const FIELDS = [
  'Engineering',
  'Medical',
  'Law',
  'Arts',
  'Commerce',
  'AI/ML',
  'Blockchain',
  'Cybersecurity',
  'Cloud Computing',
  'Data Science'
];

const SKILLS = [
  'Frontend Development',
  'Backend Development',
  'Mobile Development',
  'Blockchain',
  'Java',
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'SQL',
  'Machine Learning',
  'Data Analysis',
  'UI/UX Design',
  'Digital Marketing',
  'Content Writing',
  'Project Management'
];

export function AuthFlow({ onAuthSuccess, onBack }: AuthFlowProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'student' | 'company' | 'mentor' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    field: '',
    skills: [] as string[],
    experience: '',
    companyName: '',
    designation: ''
  });

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = () => {
    const userData = {
      ...formData,
      userType,
      id: Math.random().toString(36).substring(7)
    };
    onAuthSuccess(userData, userType!);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl">Choose Your Role</CardTitle>
              <CardDescription>
                Select how you want to use InternConnect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => {
                  setUserType('student');
                  setStep(2);
                }}
              >
                <User className="w-8 h-8" />
                <div>
                  <div>Student/Professional</div>
                  <div className="text-sm text-muted-foreground">Looking for opportunities</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => {
                  setUserType('company');
                  setStep(2);
                }}
              >
                <Building className="w-8 h-8" />
                <div>
                  <div>Company/Recruiter</div>
                  <div className="text-sm text-muted-foreground">Hiring talent</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                onClick={() => {
                  setUserType('mentor');
                  setStep(2);
                }}
              >
                <UserCheck className="w-8 h-8" />
                <div>
                  <div>Mentor</div>
                  <div className="text-sm text-muted-foreground">Guide and support others</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <Button 
            variant="ghost" 
            onClick={() => setStep(1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {userType === 'student' ? 'Student' : userType === 'company' ? 'Company' : 'Mentor'} Registration
              </CardTitle>
              <CardDescription>
                Tell us about yourself to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>

              {userType === 'company' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={formData.companyName}
                      onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Your Designation</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                      placeholder="e.g., HR Manager"
                    />
                  </div>
                </div>
              )}

              {(userType === 'student' || userType === 'mentor') && (
                <>
                  <div className="space-y-2">
                    <Label>Primary Field</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, field: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your field" />
                      </SelectTrigger>
                      <SelectContent>
                        {FIELDS.map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Skills & Technologies</Label>
                    <p className="text-sm text-muted-foreground">Select all skills you have experience with</p>
                    <div className="grid grid-cols-2 gap-3">
                      {SKILLS.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={formData.skills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                          />
                          <Label htmlFor={skill} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {userType === 'mentor' && (
                    <div className="space-y-2">
                      <Label>Years of Experience</Label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </>
              )}

              <Button 
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                disabled={!formData.name || !formData.email}
              >
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}