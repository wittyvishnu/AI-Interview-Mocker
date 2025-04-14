"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, BookOpen, Clock, ArrowRight } from "lucide-react"


// Enhanced AI-focused question categories
const questionCategories = [
  {
    id: "ai-fundamentals",
    name: "AI Fundamentals",
    questions: [
      {
        id: 1,
        question: "Explain the difference between supervised, unsupervised, and reinforcement learning.",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 2,
        question: "What is the bias-variance tradeoff in machine learning?",
        difficulty: "Medium",
        timeToAnswer: "3 min",
      },
      {
        id: 3,
        question: "Explain how backpropagation works in neural networks.",
        difficulty: "Hard",
        timeToAnswer: "5 min",
      },
      {
        id: 4,
        question: "What are activation functions and why are they important in neural networks?",
        difficulty: "Medium",
        timeToAnswer: "3 min",
      },
      {
        id: 5,
        question: "Describe the differences between CNN, RNN, and Transformer architectures.",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 6,
        question: "What is transfer learning and when would you use it?",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 7,
        question: "Explain the concept of gradient descent and its variants.",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 8,
        question: "What is regularization and why is it important in machine learning models?",
        difficulty: "Medium",
        timeToAnswer: "3 min",
      },
    ],
  },
  {
    id: "nlp-llms",
    name: "NLP & LLMs",
    questions: [
      {
        id: 9,
        question: "Explain how transformers work and why they revolutionized NLP.",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 10,
        question: "What is attention mechanism and how does it work in transformer models?",
        difficulty: "Hard",
        timeToAnswer: "5 min",
      },
      {
        id: 11,
        question: "Describe the architecture of GPT models and how they generate text.",
        difficulty: "Hard",
        timeToAnswer: "7 min",
      },
      {
        id: 12,
        question: "What are embedding vectors and how are they used in NLP?",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 13,
        question: "Explain the concept of prompt engineering and its importance for LLMs.",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 14,
        question: "What is fine-tuning in the context of LLMs and how does it differ from pre-training?",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
      {
        id: 15,
        question: "Describe techniques for mitigating bias in language models.",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 16,
        question: "What is Retrieval-Augmented Generation (RAG) and how does it improve LLM outputs?",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
    ],
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    questions: [
      {
        id: 17,
        question: "Explain how Convolutional Neural Networks (CNNs) work for image recognition.",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
      {
        id: 18,
        question: "What is object detection and how do algorithms like YOLO or R-CNN work?",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 19,
        question: "Describe the architecture and applications of GANs in computer vision.",
        difficulty: "Hard",
        timeToAnswer: "7 min",
      },
      {
        id: 20,
        question: "What is semantic segmentation and how does it differ from instance segmentation?",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 21,
        question: "Explain how image transformers like ViT work compared to CNNs.",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 22,
        question: "What are feature extraction techniques in computer vision?",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 23,
        question: "Describe how diffusion models work for image generation.",
        difficulty: "Hard",
        timeToAnswer: "7 min",
      },
      {
        id: 24,
        question: "What is transfer learning in computer vision and how would you implement it?",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
    ],
  },
  {
    id: "ml-engineering",
    name: "ML Engineering",
    questions: [
      {
        id: 25,
        question: "Explain the ML lifecycle from data collection to model deployment.",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
      {
        id: 26,
        question: "What is MLOps and why is it important for production AI systems?",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 27,
        question: "Describe techniques for optimizing model inference in production.",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 28,
        question: "How would you handle concept drift in deployed machine learning models?",
        difficulty: "Hard",
        timeToAnswer: "5 min",
      },
      {
        id: 29,
        question: "Explain model quantization and when you would use it.",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 30,
        question: "What are the challenges of distributed training for large AI models?",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 31,
        question: "Describe how you would implement A/B testing for ML model deployment.",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
      {
        id: 32,
        question: "What metrics would you use to monitor an ML system in production?",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
    ],
  },
  {
    id: "ai-ethics",
    name: "AI Ethics",
    questions: [
      {
        id: 33,
        question: "What are the main ethical concerns with deploying AI systems?",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
      {
        id: 34,
        question: "Explain the concept of algorithmic bias and how to mitigate it.",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
      {
        id: 35,
        question: "What is explainable AI (XAI) and why is it important?",
        difficulty: "Medium",
        timeToAnswer: "4 min",
      },
      {
        id: 36,
        question: "Describe the privacy concerns with large language models and how to address them.",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 37,
        question: "What is the alignment problem in AI and why is it significant?",
        difficulty: "Hard",
        timeToAnswer: "7 min",
      },
      {
        id: 38,
        question: "How would you ensure fairness in an AI system for hiring?",
        difficulty: "Hard",
        timeToAnswer: "6 min",
      },
      {
        id: 39,
        question: "Explain the concept of AI safety and its importance for advanced AI systems.",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
      {
        id: 40,
        question: "What regulatory frameworks exist for AI and how might they impact development?",
        difficulty: "Medium",
        timeToAnswer: "5 min",
      },
    ],
  },
]

export default function QuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [activeTab, setActiveTab] = useState("ai-fundamentals")

  const router = useRouter()

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleQuestionSelect = (id) => {
    setSelectedQuestions((prev) => (prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]))
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Weekly Top Interview Questions</h1>
            <p className="text-slate-600 mt-1">Browse our curated collection of AI interview questions</p>
          </div>

          <div className="flex gap-3">
          
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <Tabs defaultValue="ai-fundamentals" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex flex-wrap">
            {questionCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {questionCategories.map((category) => {
            const filteredQuestions = category.questions.filter((q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()),
            )

            return (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border ${
                        selectedQuestions.includes(question.id)
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 bg-white"
                      } hover:border-primary/50 transition-colors cursor-pointer`}
                      
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                                question.difficulty,
                              )}`}
                            >
                              {question.difficulty}
                            </span>
                            
                          </div>
                          <h3 className="font-medium text-slate-900">{question.question}</h3>
                        </div>
                       
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <BookOpen className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No questions found</h3>
                    <p className="text-slate-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>

        {selectedQuestions.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-6 py-4 border border-slate-200 flex items-center gap-4">
            <span className="text-slate-900 font-medium">{selectedQuestions.length} questions selected</span>
            
          </div>
        )}
      </main>
    </div>
  )
}
