import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Download, GraduationCap, Briefcase, MapPin, Calendar, Code, Users, Brain, Target } from 'lucide-react'

const ResumeSection = ({ downloadCV }) => {
  return (
    <section id="resume" className="py-16 px-6 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 transition-colors duration-300">Resume & CV</h2>
          <Button onClick={downloadCV} className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition-colors duration-300">
            <Download className="w-4 h-4 mr-2" />
            Download Full CV
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <div className="flex items-center mb-6">
              <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">Education</h3>
            </div>
            
            <div className="space-y-4">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">RMIT University</CardTitle>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    Melbourne, Australia
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-slate-700 dark:text-slate-200 transition-colors duration-300">Bachelor of Applied Science (Psychology)</p>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-2 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    2022-2024
                    <Badge className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Graduated</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">Werribee Secondary College</CardTitle>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    Melbourne, Australia
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-slate-700 dark:text-slate-200 transition-colors duration-300">High School Diploma with Distinction</p>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mt-2 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    2017-2021
                    <Badge className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">IB Diploma</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <div className="flex items-center mb-6">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">Professional Experience</h3>
            </div>
            
            <div className="space-y-6">
              {/* Latest Experience - VTAC */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">User-Centered UI/UX Design Implementation</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">VTAC/Xolvit Industry Challenge – UX Design Track</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    Melbourne CBD
                    <Badge className="ml-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">Onsite</Badge>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    Mar 2025 - Apr 2025
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300">
                    • Utilised comprehensive design tools (Figma, Adobe XD, Photoshop, Canva) to conceptualise and build user-focused interfaces aimed at enhancing the student application journey<br/>
                    • Applied human-centered design principles, incorporating iterative feedback loops and usability metrics to improve user experience and accessibility<br/>
                    • Enhanced user experience through data-informed, empathetic front-end development and improved decision-making processes for students
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Figma
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Adobe XD
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Photoshop
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Canva
                    </Badge>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      User Research
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      Design Thinking
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* GenAI Consultant */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">GenAI Prompt Consultant</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Remote Consulting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    Online/Remote work
                    <Badge className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">Remote</Badge>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    Nov 2024 - Current
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300">
                    • Demonstrated strong adaptability and on-the-job learning by quickly acquiring role-specific knowledge and implementing tailored procedural practices<br/>
                    • Developed and optimized AI prompts using ChatGPT, Claude, and DeepSeek for business applications, improving output quality and efficiency<br/>
                    • Utilized Scispace and Notion for research documentation and project management, streamlining workflow processes
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      ChatGPT
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Claude
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      DeepSeek
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Scispace
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Notion
                    </Badge>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      Prompt Engineering
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
                      <Target className="w-3 h-3 mr-1" />
                      Process Optimization
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Research Assistant */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">In-Depth Data Analysis & Research Expertise</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Research Assistant – RMIT Centre for Industrial AI Research & Innovation (CIAIRI)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    Melbourne CBD
                    <Badge className="ml-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">Hybrid</Badge>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    Jul 2024 - Apr 2025
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300">
                    • Conducted comprehensive qualitative and quantitative data analysis using SPSS, R Studio, Python, and VosViewer, diving into behavioral data, interpreting patterns, and contributing to high-impact behavioral research<br/>
                    • Utilized WEKA for advanced data mining and machine learning analysis, generating actionable insights that supported the team's research direction<br/>
                    • Project initiative successfully secured research funding from institutional grants, recognising the quality and relevance of the research
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      SPSS
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      R Studio
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Python
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      VosViewer
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      WEKA
                    </Badge>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      Statistical Analysis
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Research Collaboration
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* UNIQLO */}
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-800 dark:text-white transition-colors duration-300">Strategic Feasibility & High-Pressure Project Execution</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Global Management Program – UNIQLO, Tokyo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-2 transition-colors duration-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    Tokyo, Japan
                    <Badge className="ml-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">Onsite</Badge>
                  </div>
                  <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm mb-3 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-1" />
                    Jul 2024 - Aug 2024
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 transition-colors duration-300">
                    • Led a cross-functional team in developing a market expansion and branding strategy using comprehensive Microsoft Office Suite (Excel, PowerPoint, Teams) and Google Workspace tools<br/>
                    • Conducted in-depth budget feasibility and market analysis under tight timeframes and limited resources, utilizing advanced Excel modeling and data visualization techniques<br/>
                    • Achieved strategic alignment with real-world business metrics and received special commendation from UNIQLO senior executives for delivering the most accurate and realistic budget feasibility among global participants
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Excel
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      PowerPoint
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Teams
                    </Badge>
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Google Workspace
                    </Badge>
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Cross-functional Leadership
                    </Badge>
                    <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">
                      <Target className="w-3 h-3 mr-1" />
                      Strategic Planning
                    </Badge>
                    <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">
                      <Brain className="w-3 h-3 mr-1" />
                      Market Analysis
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Technical Skills & Tools Section */}
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <Code className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 transition-colors duration-300" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">Technical Skills & Tools</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-800 dark:text-white transition-colors duration-300">Development & Design</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">React</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">JavaScript</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">HTML/CSS</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">Figma</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">Adobe XD</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">Photoshop</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">Premier Pro</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">After Effects</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">Canva</Badge>
                  <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs">CapCut</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-800 dark:text-white transition-colors duration-300">Data Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">SPSS</Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">R Studio</Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">Python</Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">Excel</Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">VosViewer</Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">WEKA</Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">Statistical Analysis</Badge>
                  <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs">Data Visualization</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-800 dark:text-white transition-colors duration-300">AI & Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">ChatGPT</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Claude</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">DeepSeek</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Scispace</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Notion</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Microsoft Office Suite</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Google Workspace</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">PowerPoint</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Teams</Badge>
                  <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs">Meet</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 transition-colors duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-800 dark:text-white transition-colors duration-300">Core Competencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Ideation</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Collaboration</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Problem-Solving</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Strategic Thinking</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Cross-Cultural Communication</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Project Management</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Stakeholder Engagement</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Change Management</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Innovation Leadership</Badge>
                  <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs">Quality Assurance</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection

