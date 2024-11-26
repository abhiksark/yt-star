import { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the BestYoutubeChannels team. We're here to help with any questions or suggestions.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "support@bestyoutubechannels.com",
    description: "Our team typically responds within 24 hours.",
  },
  {
    icon: MapPin,
    title: "Location",
    details: "San Francisco, CA",
    description: "Silicon Valley Tech Hub",
  },
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    description: "Monday to Friday, 9AM to 5PM PST",
  },
];

export default function ContactPage() {
  return (
    <div className="container max-w-6xl py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Have questions or suggestions? We'd love to hear from you. Send us a
          message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {contactInfo.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="font-medium">{item.details}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Send Us a Message</h2>
          <p className="text-muted-foreground">
            Fill out the form below and we'll get back to you as soon as possible.
            We value your feedback and are here to help!
          </p>
          <ContactForm />
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/30 via-accent/30 to-primary/30 blur-2xl" />
          <Card className="h-full p-8 glass-effect">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Why Contact Us?</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Suggest new content creators or categories</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Report technical issues or bugs</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>Partnership opportunities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary">•</span>
                  <span>General inquiries and feedback</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}