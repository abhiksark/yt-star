"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ProfileHeader() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        <div className="relative group">
          <Avatar className="h-24 w-24">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop"
              alt="Profile"
              className="aspect-square h-full w-full object-cover"
            />
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    defaultValue="John Doe"
                    className="max-w-md"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-muted-foreground">
                    Software Developer • San Francisco, CA
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Report Incorrect Information</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to report this profile information as incorrect?
                      Our team will review the report and take appropriate action.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Submit Report</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
          
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                defaultValue="Full-stack developer passionate about building great user experiences."
                className="max-w-md"
              />
            </div>
          ) : (
            <p className="max-w-md text-muted-foreground">
              Full-stack developer passionate about building great user experiences.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}