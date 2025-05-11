"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronRight, CheckCircle, Star, Menu, X, Mic, Video, Zap, ClipboardCheck, BarChart, Smile } from 'lucide-react'

export default function HomeScreen() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const features = [
    {
      icon: <Mic className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Questions',
      description: 'Get tailored questions based on your role, company, and experience level with our advanced NLP system'
    },
    {
      icon: <Video className="h-10 w-10 text-primary" />,
      title: 'Realistic Practice',
      description: 'Face-to-face video practice sessions with our AI interviewer that mimics real interview conditions'
    },
    {
      icon: <ClipboardCheck className="h-10 w-10 text-primary" />,
      title: 'Comprehensive Feedback',
      description: 'Receive detailed analysis on your answers, delivery, body language, and communication skills'
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: 'Progress Tracking',
      description: 'Visualize your improvement over time with detailed metrics and personalized recommendations'
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: 'Quick Prep Sessions',
      description: '15-minute focused practice sessions for when you\'re short on time but need to prepare'
    },
    {
      icon: <Smile className="h-10 w-10 text-primary" />,
      title: 'Confidence Building',
      description: 'Reduce interview anxiety through repeated exposure and positive reinforcement'
    }
  ]

  const testimonials = [
    {
      quote: "The AI mock interviewer helped me identify weaknesses in my answers I didn't even know I had. Landed my dream job after just 3 practice sessions!",
      author: "Sarah K.",
      role: "Software Engineer at Google",
      rating: 5,
      avatar: "/avatar1.png"
    },
    {
      quote: "As someone with interview anxiety, this tool was a game-changer. I could practice at my own pace without judgment.",
      author: "Michael T.",
      role: "Product Manager at Meta",
      rating: 5,
      avatar: "/avatar3.png"
    },
    {
      quote: "The feedback is incredibly detailed and helpful. It's like having a personal interview coach available 24/7.",
      author: "Jessica L.",
      role: "Marketing Director at Airbnb",
      rating: 4,
      avatar: "/avatar2.png"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 right-20 w-48 h-48 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-52 h-52 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/pinit-logo.svg" 
              alt="AI Mock Interviewer Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto scale-150 ml-5"
            />
            
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-primary font-medium transition-colors">Features</a>
            <a href="#testimonials" className="text-slate-600 hover:text-primary font-medium transition-colors">Testimonials</a>
            <a href="#pricing" className="text-slate-600 hover:text-primary font-medium transition-colors">Pricing</a>
            
            <Button variant="outline" className="ml-2 hover:bg-slate-50 transition-colors" onClick={handleGetStarted}>Log in</Button>
            <Button onClick={handleGetStarted} className="hover:shadow-md transition-shadow">Sign up - It's free</Button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4 animate-in fade-in">
            <nav className="container mx-auto px-4 flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-slate-600 hover:text-primary font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                className="text-slate-600 hover:text-primary font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#pricing" 
                className="text-slate-600 hover:text-primary font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="flex gap-4 pt-2">
                <Button variant="outline" className="flex-1">Log in</Button>
                <Button className="flex-1">Sign up</Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
     <section className="container mx-auto px-4 md:px-8 py-20 md:py-32">
  <div className="flex flex-col-reverse lg:flex-row items-center justify-around gap-6">
    
    {/* Left Text Section */}
    <div className="max-w-xl w-full text-left space-y-6">
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full">
        <Zap className="h-4 w-4" />
        <span className="text-sm font-medium">Trusted by 50,000+ job seekers</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
        Ace Your Next <span className="text-primary">Tech Interview</span> with AI
      </h1>

      <p className="text-lg md:text-xl text-slate-600">
        Practice with our intelligent mock interviewer, get instant feedback on your technical and behavioral responses, and gain the confidence to succeed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={handleGetStarted} size="lg" className="px-8 py-6 text-lg font-semibold hover:shadow-lg">
          Start Free Trial
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        <Button onClick={handleGetStarted} variant="outline" size="lg" className="px-8 py-6 text-lg font-semibold hover:bg-slate-50">
          See How It Works
        </Button>
      </div>
    </div>

    {/* Right Image Section */}
    <div className="w-full max-w-xl">
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
        <div className="text-center px-6 pt-6 pb-4">
          <h3 className="text-2xl font-bold text-white">AI Mock Interview Platform</h3>
          <p className="text-white/80 mt-2">Practice. Get Feedback. Improve.</p>
        </div>
        <div className="relative aspect-video bg-slate-700">
          <img src="/interview.png" alt="Mock Interview" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>

  </div>
</section>



        {/* Trusted By Section */}
        <section className="py-12 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-4">
            <p className="text-center text-slate-500 text-sm font-medium mb-6">TRUSTED BY ENGINEERS AT</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix'].map((company, index) => (
                <div key={index} className="text-lg font-semibold text-slate-700 opacity-80 hover:opacity-100 transition-opacity">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Master Every Aspect of Interviewing</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our AI-powered platform provides comprehensive preparation for technical and behavioral interviews.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="mb-4 group-hover:-translate-y-1 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Demo Section */}
      <section className="py-20 bg-slate-50 px-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row items-center md:justify-around gap-6">
      
      {/* Left Text Content */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Experience the Future of Interview Prep
        </h2>
        
        <ul className="space-y-4 mt-10">
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">Real-time speech analysis and feedback</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">Technical question bank with 1000+ questions</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">Behavioral question practice with STAR method guidance</span>
          </li>
        </ul>
      </div>

      {/* Right Image Card with Overlay */}
      <div className="w-full max-w-xl flex-1">
        <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
          <div className="text-center px-6 pt-6 pb-4">
            <h3 className="text-2xl font-bold text-white">Feedback analysis</h3>
            <p className="text-white/80 mt-2">start your interview.</p>
          </div>
          <div className="relative aspect-video bg-slate-700">
            <img src="/feedback1.png" alt="Mock Interview" className="object-contain w-full h-full" />
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


        
        {/* Testimonial Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full mb-2">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Rated 4.9/5 by our users</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Success Stories From Our Users</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-left hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}`}
                  />
                ))}
              </div>
                  <p className="text-white/90 italic mb-6">"{testimonial.quote}"</p>
                  <footer className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      <Image 
                        src={testimonial.avatar} 
                        alt={testimonial.author} 
                        width={40} 
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white">{testimonial.author}</div>
                      <div className="text-white/80 text-sm">{testimonial.role}</div>
                    </div>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Choose the plan that fits your needs. Cancel anytime.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Starter</h3>
                <p className="text-slate-600 mb-6">Perfect for occasional practice</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$9</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">5 interview sessions per month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Basic feedback analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Access to 500+ questions</span>
                  </li>
                </ul>
                <Button onClick={handleGetStarted} variant="outline" className="w-full">Get Started</Button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary/20 relative">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Professional</h3>
                <p className="text-slate-600 mb-6">For serious job seekers</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$19</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Unlimited interview sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Advanced feedback analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Access to all 1000+ questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Company-specific question sets</span>
                  </li>
                </ul>
                <Button onClick={handleGetStarted}  className="w-full hover:shadow-md">Get Started</Button>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Team</h3>
                <p className="text-slate-600 mb-6">For companies and schools</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$99</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Up to 10 users</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">All Professional features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Admin dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Custom question sets</span>
                  </li>
                </ul>
                <Button onClick={handleGetStarted} variant="outline" className="w-full">Contact Sales</Button>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-slate-600">Not sure which plan is right for you? <a href="#" className="text-primary font-medium hover:underline">Compare plans</a></p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to transform your interview skills?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Join thousands of job seekers who have improved their interview performance and landed their dream jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold hover:shadow-lg transition-all"
                onClick={handleGetStarted}
              >
                Start 7-Day Free Trial
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
              onClick={handleGetStarted}
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold hover:bg-white/80 transition-colors"
              >
                Schedule a Demo
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-4">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/pinit-logo.svg" 
                  alt="AI Mock Interviewer Logo" 
                  width={32} 
                  height={32}
                  className="h-8 w-auto brightness-200"
                />
              
              </div>
              <p className="text-sm mb-4">
                AI-powered interview preparation to help you land your dream job.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Facebook', 'Instagram'].map((social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-slate-400 hover:text-white transition-colors"
                    aria-label={social}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-6 w-6 bg-slate-700 rounded-full flex items-center justify-center">
                      {social.charAt(0)}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Interview Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tech Interview Handbook</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} PinIT. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-white transition-colors">Security</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="text-sm hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}