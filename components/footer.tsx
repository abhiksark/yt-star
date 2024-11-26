import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold">BestYoutubeChannels</h3>
            <p className="text-sm text-muted-foreground">
              Discover and connect with amazing tech content creators from around the world.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/categories">Browse All</Link></li>
              <li>Technology</li>
              <li>System Design</li>
              <li>Programming</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BestYoutubeChannels. All rights reserved.
        </div>
      </div>
    </footer>
  );
}