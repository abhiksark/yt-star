"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobApplicationDialog } from "@/components/job-application-dialog";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "We're looking for a Frontend Developer to help build and maintain our web applications. The ideal candidate has experience with React, TypeScript, and modern web technologies.",
    requirements: [
      "3+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with modern frontend tools",
      "Understanding of web performance optimization",
    ],
  },
  {
    id: 2,
    title: "Content Curator",
    department: "Content",
    location: "Remote",
    type: "Full-time",
    description: "Join our content team to help discover and curate the best tech educational content. You'll be responsible for evaluating and categorizing content creators.",
    requirements: [
      "Deep understanding of tech education",
      "Experience in content curation",
      "Strong analytical skills",
      "Excellent written communication",
    ],
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "We're seeking a UX Designer to help create intuitive and beautiful user experiences. You'll work closely with our product and engineering teams.",
    requirements: [
      "4+ years of UX design experience",
      "Strong portfolio of web applications",
      "Experience with Figma",
      "User research experience",
    ],
  },
];

export function JobList() {
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  return (
    <div className="grid gap-6">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.department}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">{job.location}</Badge>
                <Badge variant="outline">{job.type}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{job.description}</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSelectedJob(job)}>Apply Now</Button>
          </CardFooter>
        </Card>
      ))}

      <JobApplicationDialog
        job={selectedJob}
        open={!!selectedJob}
        onOpenChange={() => setSelectedJob(null)}
      />
    </div>
  );
}