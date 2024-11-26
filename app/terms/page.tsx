import { Separator } from "@/components/ui/separator";

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto prose dark:prose-invert">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <Separator className="my-6" />
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p>By accessing and using Creator Discovery, you accept and agree to be bound by the terms and provisions of this agreement.</p>

        <h2 className="text-2xl font-semibold">2. Use License</h2>
        <p>Permission is granted to temporarily access the materials (information or software) on Creator Discovery for personal, non-commercial viewing only.</p>

        <h2 className="text-2xl font-semibold">3. Disclaimer</h2>
        <p>The materials on Creator Discovery are provided on an &apos;as is&apos; basis. Creator Discovery makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

        <h2 className="text-2xl font-semibold">4. Limitations</h2>
        <p>In no event shall Creator Discovery or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Creator Discovery.</p>

        <h2 className="text-2xl font-semibold">5. Revisions</h2>
        <p>The materials appearing on Creator Discovery could include technical, typographical, or photographic errors. Creator Discovery does not warrant that any of the materials on its website are accurate, complete, or current.</p>

        <h2 className="text-2xl font-semibold">6. Links</h2>
        <p>Creator Discovery has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Creator Discovery of the site.</p>

        <h2 className="text-2xl font-semibold">7. Modifications</h2>
        <p>Creator Discovery may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
      </section>
    </div>
  );
}