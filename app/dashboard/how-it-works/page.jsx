"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Mic, Video, MessageSquare, BarChart, Brain, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      title: "Select your questions",
      description: "Choose from our curated list of interview questions ",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
    },
    {
      id: 2,
      title: "Start your interview",
      description:
        "Our AI interviewer will ask you questions through text or voice, simulating a real interview experience.",
      icon: <Mic className="h-8 w-8 text-primary" />,
    },
    {
      id: 3,
      title: "Record your responses",
      description:
        "Respond to questions via text, audio, or video depending on your preference and subscription level.",
      icon: <Video className="h-8 w-8 text-primary" />,
    },
    {
      id: 4,
      title: "Get detailed feedback",
      description:
        "Receive instant AI-powered analysis of your responses, including content quality, delivery, and areas for improvement.",
      icon: <BarChart className="h-8 w-8 text-primary" />,
    },
  ]

  const faqs = [
    {
      question: "How accurate is the AI feedback?",
      answer:
        "Our AI feedback system is trained on thousands of real interview responses and industry best practices. It provides insights comparable to human interviewers with 90%+ accuracy based on our validation studies.",
    },
    {
      question: "Can I practice for specific job roles?",
      answer:
        "Yes! You can select from various job roles and industries to get questions tailored to your target position. Premium users can also upload job descriptions for ultra-specific question generation.",
    },
    {
      question: "How many practice sessions can I do?",
      answer:
        "Free users get 5 practice sessions per month. Premium users get unlimited practice sessions with additional features like video recording and advanced analytics.",
    },
    {
      question: "Is my interview data private?",
      answer:
        "Absolutely. Your privacy is our priority. All your interview recordings and responses are encrypted and only accessible to you. We do not share your data with third parties.",
    },
    {
      question: "Can I practice on my mobile device?",
      answer:
        "Yes, our platform is fully responsive and works on desktop, tablet, and mobile devices. You can practice interviews anywhere, anytime.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">How InterviewAI Works</h1>
            <p className="text-lg text-slate-600">
              Our AI-powered platform makes interview preparation simple, effective, and tailored to your needs.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {steps.map((step) => (
              <Card key={step.id} className="border border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">{step.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        {step.id}. {step.title}
                      </h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Technology Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Powered by Advanced AI</h2>
                <p className="text-slate-700 mb-4">
                  Our platform uses state-of-the-art natural language processing and machine learning algorithms to
                  provide human-like interview experiences and feedback.
                </p>
                <ul className="space-y-3">
                  {[
                    "Real-time speech analysis and feedback",
                    "Sentiment and confidence detection",
                    "Content relevance scoring",
                    "Personalized improvement suggestions",
                    "Industry-specific evaluation criteria",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <Brain className="h-48 w-48 text-primary/80" />
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-slate-900">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-slate-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to ace your next interview?</h2>
            <p className="text-slate-600 mb-6">
              Start practicing with our AI interviewer today and gain the confidence you need.
            </p>
            <Link href="/dashboard" passHref>
                <Button size="lg" className="px-8">
                    Start Practicing Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
