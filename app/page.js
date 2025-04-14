"use client"

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronRight, CheckCircle, Star, Menu, X } from 'lucide-react'

export default function HomeScreen() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Questions',
      description: 'Get tailored questions based on your role and experience level'
    },
    {
      icon: <Star className="h-10 w-10 text-primary" />,
      title: 'Instant Feedback',
      description: 'Receive detailed analysis on your answers and delivery'
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: 'Unlimited Practice',
      description: 'Practice as much as you need, anytime, anywhere'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo2.svg" 
              alt="AI Mock Interviewer Logo" 
              width={40} 
              height={40}
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-slate-800"></span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-primary font-medium">Features</a>
            <a href="#testimonials" className="text-slate-600 hover:text-primary font-medium">Testimonials</a>
            
            <Button variant="outline" className="ml-2" onClick={handleGetStarted} >Log in</Button>
            <Button onClick={handleGetStarted}>Sign up</Button>
          </nav>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 py-4">
            <nav className="container mx-auto px-4 flex flex-col gap-4">
              <a href="#features" className="text-slate-600 hover:text-primary font-medium py-2">Features</a>
              <a href="#testimonials" className="text-slate-600 hover:text-primary font-medium py-2">Testimonials</a>
              <a href="#pricing" className="text-slate-600 hover:text-primary font-medium py-2">Pricing</a>
              <div className="flex gap-4 pt-2">
                <Button variant="outline" className="flex-1">Log in</Button>
                <Button className="flex-1">Sign up</Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Ace Your Next Interview with <span className="text-primary">AI</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              Practice with our intelligent mock interviewer, get instant feedback, and gain the confidence to succeed in your real interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold"
                onClick={handleGetStarted}
              >
                 Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
             
            </div>
            
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none h-20 -bottom-5 -top-auto"></div>
              <div className="bg-slate-800 rounded-xl overflow-hidden shadow-2xl">
                
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our AI-powered platform makes interview preparation simple, effective, and tailored to your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonial Section */}
        <section id="testimonials" className="bg-blue-500 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">What Our Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  quote: "The AI mock interviewer helped me identify weaknesses in my answers I didn't even know I had. Landed my dream job after just 3 practice sessions!",
                  author: "Sarah K.",
                  role: "Software Engineer"
                },
                {
                  quote: "As someone with interview anxiety, this tool was a game-changer. I could practice at my own pace without judgment.",
                  author: "Michael T.",
                  role: "Product Manager"
                },
                {
                  quote: "The feedback is incredibly detailed and helpful. It's like having a personal interview coach available 24/7.",
                  author: "Jessica L.",
                  role: "Marketing Director"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-left">
                  <p className="text-white/90 italic mb-6 ">"{testimonial.quote}"</p>
                  <footer className="font-bold text-white">
                    — {testimonial.author}, <span className="opacity font-bold">{testimonial.role}</span>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to transform your interview skills?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Join thousands of job seekers who have improved their interview performance and landed their dream jobs.
            </p>
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold"
              onClick={handleGetStarted}
            >
              Start Practicing Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image 
                  src="/logo2.svg" 
                  alt="AI Mock Interviewer Logo" 
                  width={32} 
                  height={32}
                  className="h-8 w-auto brightness-200"
                />
                <span className="font-bold text-white text-lg"></span>
              </div>
              <p className="text-sm">
                AI-powered interview preparation to help you land your dream job.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} PinIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
