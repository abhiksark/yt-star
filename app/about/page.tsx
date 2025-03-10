import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Github as GithubIcon, X as TwitterIcon, ArrowRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Our Mission and Team",
  description: "Learn about BestYoutubeChannels's mission to help developers discover the best educational content creators.",
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    twitter: string;
    github: string;
    personalWebsite: string;
  };
}

const team: TeamMember[] = [
  {
    name: "Abhik Sarkar",
    role: "Creator",
    bio: "Software Engineer, passionate about making tech education accessible.",
    image: "/images/abhik.jpeg",
    social: {
      twitter: "https://x.com/abhiksarkar",
      github: "https://github.com/abhiksarkar",
      personalWebsite: "https://abhik.xyz", // Added personal website
    },
  },
];

export default function AboutPage() {
  return (
    <div className="container max-w-6xl space-y-16 py-8">
      {/* Hero Section */}
      <HeroSection />
      {/* Mission Section */}
      <MissionSection />
      {/* Team Section */}
      <TeamSection team={team} />
      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="text-center space-y-4">
      <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
        About BestYoutubeChannels
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Making Tech Education{" "}
        <span className="text-gradient">Accessible</span>
      </h1>
      <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
        We're on a mission to help developers discover the best educational content
        creators and accelerate their learning journey.
      </p>
    </section>
  );
}

// Mission Section Component
function MissionSection() {
  return (
    <section className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Our Mission</h2>
        <p className="text-muted-foreground">
          In the vast landscape of online tech education, finding the right content
          creator can make all the difference in your learning journey. We built
          BestYoutubeChannels to connect developers with expert educators who can
          help them master new technologies and advance their careers.
        </p>
        <div className="pt-4">
          <Button asChild>
            <Link href="/categories" className="group">
              Browse Categories
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/30 via-accent/30 to-primary/30 blur-2xl" />
        <Card className="p-8 space-y-4 glass-effect">
          <div className="space-y-2">
            <h3 className="font-semibold">Our Impact</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Expert Creators</p>
              </div>
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Monthly Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">30+</p>
                <p className="text-sm text-muted-foreground">Tech Topics</p>
              </div>
              <div>
                <p className="text-3xl font-bold">15K+</p>
                <p className="text-sm text-muted-foreground">Hours of Content</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// Team Section Component
function TeamSection({ team }: { team: TeamMember[] }) {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Meet Our Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're a passionate team of tech enthusiasts and educators working to
          make quality tech education more discoverable.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center items-center">
        {team.map((member) => (
          <Card key={member.name} className="group overflow-hidden">
            <div className="aspect-square relative">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-muted-foreground">{member.bio}</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <TwitterIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href={member.social.personalWebsite} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection() {
  return (
    <section className="text-center space-y-4">
      <h2 className="text-3xl font-bold">Get in Touch</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Have questions or suggestions? We'd love to hear from you.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Button asChild>
          <Link href="mailto:abhik@shiptoscale.com" className="group">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/categories">
            Explore Platform
          </Link>
        </Button>
      </div>
    </section>
  );
}