import { Brain, ChevronRight, Crosshair, LineChart, Map } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container max-w-[1920px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            The Ultimate Rainbow Six Siege
            <span className="text-primary"> Strategy Platform</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-[600px] mx-auto mb-8">
            Master map knowledge, plan strategies, track performance, and improve your game with our comprehensive suite
            of tools designed for competitive R6 players.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="text-lg h-12 px-8">
              Get Started
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container max-w-[1920px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Professional Tools for Serious Players</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-background/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Map className="h-12 w-12 text-primary" />
                  <div>
                    <CardTitle className="text-xl mb-2">Interactive Map Callouts</CardTitle>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Multi-floor interactive maps with custom callouts
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Simultaneous floor viewing with transparency
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Define and edit stair/hatch locations
                      </li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 rounded-lg overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur">
                    <div className="h-full w-full border-2 border-dashed border-primary/20 rounded-lg flex items-center justify-center">
                      <p className="text-primary/40 text-sm">Interactive Map Preview</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Crosshair className="h-12 w-12 text-primary" />
                  <div>
                    <CardTitle className="text-xl mb-2">Advanced Strat Planning</CardTitle>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Drag-and-drop operator and gadget placement
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Drawing tools for annotations and arrows
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Save and export your strategies
                      </li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 rounded-lg overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur">
                    <div className="h-full w-full border-2 border-dashed border-primary/20 rounded-lg flex items-center justify-center">
                      <p className="text-primary/40 text-sm">Strategy Board Preview</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <LineChart className="h-12 w-12 text-primary" />
                  <div>
                    <CardTitle className="text-xl mb-2">Match Performance Tracking</CardTitle>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Log detailed match information
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Track operator picks and round results
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Visualize team performance trends
                      </li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 rounded-lg overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur">
                    <div className="h-full w-full border-2 border-dashed border-primary/20 rounded-lg flex items-center justify-center">
                      <p className="text-primary/40 text-sm">Statistics Dashboard Preview</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Brain className="h-12 w-12 text-primary" />
                  <div>
                    <CardTitle className="text-xl mb-2">Callout Training</CardTitle>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Timed quiz modes for callout mastery
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Click-to-identify or type-to-answer modes
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                        Track your progress and compete
                      </li>
                    </ul>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 rounded-lg overflow-hidden mt-4">
                  <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur">
                    <div className="h-full w-full border-2 border-dashed border-primary/20 rounded-lg flex items-center justify-center">
                      <p className="text-primary/40 text-sm">Quiz Interface Preview</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-[1920px] mx-auto px-4">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Game to the Next Level?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of players who are already using R6 Tools to improve their gameplay. Sign up now and get
              access to all our premium features.
            </p>
            <Button size="lg" className="text-lg">
              Start Free Trial
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container max-w-[1920px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Crosshair className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">R6 Tools</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} R6 Tools. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

