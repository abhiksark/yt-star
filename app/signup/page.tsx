import { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { AuthFooter } from "@/components/auth/auth-footer";
import { Shell } from "@/components/shell";

export const metadata: Metadata = {
  title: "Sign Up - Create Your Account",
  description: "Join BestYoutubeChannels and discover the best tech education content creators.",
};

export default function SignUpPage() {
  return (
    <div className="container min-h-[calc(100vh-14rem)] grid lg:grid-cols-2 lg:gap-8 items-center">
      <div className="hidden lg:flex flex-col justify-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Join Our Community
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover and connect with the best tech content creators. Start your
            learning journey today.
          </p>
        </div>
        <div className="grid gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icons.check className="h-5 w-5 text-primary" />
            <span>Access to exclusive content</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.check className="h-5 w-5 text-primary" />
            <span>Personalized recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons.check className="h-5 w-5 text-primary" />
            <span>Join a thriving community</span>
          </div>
        </div>
      </div>
      <Shell className="max-w-lg mx-auto lg:mx-0">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-2xl font-semibold tracking-tight lg:hidden">
            Join Our Community
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        <SignUpForm />
        <AuthFooter />
      </Shell>
    </div>
  );
}