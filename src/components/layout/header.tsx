import { Brain, Crosshair, LineChart, Map, Target } from "lucide-react";
import Link from "next/link";

import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container max-w-[1920px] mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-3">
          <Crosshair className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">R6 Tools</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2">
          <Link href="/callouts">
            <Button variant="ghost" className="flex items-center space-x-2 h-12 px-4 text-base">
              <Map className="h-5 w-5" />
              <span>Callouts</span>
            </Button>
          </Link>
          <Link href="#strats">
            <Button variant="ghost" className="flex items-center space-x-2 h-12 px-4 text-base">
              <Target className="h-5 w-5" />
              <span>Strats</span>
            </Button>
          </Link>
          <Link href="#matches">
            <Button variant="ghost" className="flex items-center space-x-2 h-12 px-4 text-base">
              <LineChart className="h-5 w-5" />
              <span>Matches</span>
            </Button>
          </Link>
          <Link href="#training">
            <Button variant="ghost" className="flex items-center space-x-2 h-12 px-4 text-base">
              <Brain className="h-5 w-5" />
              <span>Training</span>
            </Button>
          </Link>
        </nav>
        <UserMenu />
      </div>
    </header>
  );
} 