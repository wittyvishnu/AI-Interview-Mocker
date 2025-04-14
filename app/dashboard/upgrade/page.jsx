"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X, ArrowRight, Zap } from "lucide-react"


export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      name: "Free",
      description: "Basic interview practice for casual users",
      price: { monthly: 0, annually: 0 },
      features: [
        { included: true, text: "5 practice sessions per month" },
        { included: true, text: "Text-based interviews" },
        { included: true, text: "Basic feedback" },
        { included: false, text: "Audio interviews" },
        { included: false, text: "Video interviews" },
        { included: false, text: "Advanced analytics" },
        { included: false, text: "Custom questions" },
        { included: false, text: "Industry-specific feedback" },
      ],
      buttonText: "Current Plan",
      popular: false,
      disabled: true,
    },
    {
      name: "Pro",
      description: "For serious job seekers",
      price: { monthly: 19, annually: 15 },
      features: [
        { included: true, text: "Unlimited practice sessions" },
        { included: true, text: "Text-based interviews" },
        { included: true, text: "Detailed feedback" },
        { included: true, text: "Audio interviews" },
        { included: true, text: "Basic analytics" },
        { included: true, text: "Custom questions" },
        { included: false, text: "Video interviews" },
        { included: false, text: "Industry-specific feedback" },
      ],
      buttonText: "Upgrade to Pro",
      popular: true,
      disabled: false,
    },
    {
      name: "Premium",
      description: "For professionals and executives",
      price: { monthly: 39, annually: 29 },
      features: [
        { included: true, text: "Unlimited practice sessions" },
        { included: true, text: "Text-based interviews" },
        { included: true, text: "Expert-level feedback" },
        { included: true, text: "Audio interviews" },
        { included: true, text: "Video interviews" },
        { included: true, text: "Advanced analytics" },
        { included: true, text: "Custom questions" },
        { included: true, text: "Industry-specific feedback" },
      ],
      buttonText: "Upgrade to Premium",
      popular: false,
      disabled: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
    

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Upgrade Your Plan</h1>
            <p className="text-lg text-slate-600">Choose the perfect plan to accelerate your interview preparation</p>
          </div>

          <div className="flex justify-center mb-8">
            <Tabs defaultValue="monthly" className="w-[300px]" onValueChange={(value) => setBillingCycle(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annually">
                  Annually
                  <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200">
                    Save 20%
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`border ${plan.popular ? "border-primary shadow-md relative" : "border-slate-200"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-sm font-medium py-1 px-3 rounded-full flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5" />
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-slate-600 ml-1">
                      {billingCycle === "monthly" ? "/month" : "/month, billed annually"}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-slate-300 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-slate-700" : "text-slate-500"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${plan.popular ? "" : "bg-slate-800 hover:bg-slate-700"}`}
                    disabled={plan.disabled}
                  >
                    {plan.buttonText}
                    {!plan.disabled && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-16 bg-white rounded-xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">What Our Subscribers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "The Pro plan was a game-changer for my job search. The audio interview feature helped me improve my verbal communication skills tremendously.",
                  author: "Michael T.",
                  role: "Software Engineer",
                  plan: "Pro Plan",
                },
                {
                  quote:
                    "As a senior executive, the Premium plan's industry-specific feedback was invaluable. Worth every penny for the confidence it gave me.",
                  author: "Sarah K.",
                  role: "Marketing Director",
                  plan: "Premium Plan",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-lg">
                  <p className="italic text-slate-700 mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-600">
                      {testimonial.role} • {testimonial.plan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "Can I upgrade or downgrade at any time?",
                  answer:
                    "Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, you'll receive credit towards your next billing cycle.",
                },
                {
                  question: "Is there a free trial for paid plans?",
                  answer:
                    "Yes, we offer a 7-day free trial for both Pro and Premium plans. You can cancel anytime during the trial period without being charged.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.",
                },
                {
                  question: "Can I get a refund if I'm not satisfied?",
                  answer:
                    "We offer a 30-day money-back guarantee if you're not completely satisfied with your paid plan.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h2>
            <p className="text-slate-600 mb-6">Our team is here to help you choose the right plan for your needs.</p>
            <Button variant="outline" size="lg">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
