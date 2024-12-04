import { Metadata } from "next";
import { JobList } from "@/components/job-list";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers - Join Our Team",
  description: "Join BestYoutubeChannels and help make tech education more accessible. View our open positions and apply today.",
};

const perks = [
  {
    title: "Remote-First",
    description: "Work from anywhere in the world. We believe in hiring the best talent, regardless of location.",
  },
  {
    title: "Learning Budget",
    description: "Annual budget for courses, books, and conferences to support your professional growth.",
  },
  {
    title: "Health Benefits",
    description: "Comprehensive health, dental, and vision coverage for you and your dependents.",
  },
  {
    title: "Flexible Hours",
    description: "Set your own schedule and work when you're most productive.",
  },
];

export default function CareersPage() {
  return (
    <div className="container max-w-6xl py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Join Our <span className="text-gradient">Mission</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Help us make tech education more accessible and discoverable. We're
          looking for passionate individuals to join our growing team.
        </p>
      </section>

      {/* Culture Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Our Culture</h2>
          <p className="text-muted-foreground">
            We're building a diverse, inclusive team of passionate individuals who
            believe in the power of education. Our culture is built on
            transparency, continuous learning, and making a positive impact.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link href="#open-positions" className="group">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {perks.map((perk) => (
            <Card key={perk.title} className="p-6 space-y-2">
              <h3 className="font-semibold">{perk.title}</h3>
              <p className="text-sm text-muted-foreground">
                {perk.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Open Positions</h2>
          <p className="text-muted-foreground">
            Find your next role at BestYoutubeChannels. We're always looking for
            talented individuals to join our team.
          </p>
        </div>
        <JobList />
      </section>
    </div>
  );
}