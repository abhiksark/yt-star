import { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCreators } from "@/lib/data";
import { Shell } from "@/components/shell";
import { CreatorGrid } from "@/components/creator-grid";
import { getCanonicalUrl } from "@/lib/utils";
import { SEO_CONSTANTS } from "@/lib/types/seo";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

function generateCategorySchema(categoryName: string, categorySlug: string, creatorCount: number) {
  const url = getCanonicalUrl(`categories/${categorySlug}`);
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${categoryName} Tutorial Creators`,
    "description": `Discover the top ${categoryName.toLowerCase()} tutorial creators and educators. Find expert-led content for learning ${categoryName.toLowerCase()} programming and development.`,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": creatorCount,
      "itemListElement": {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Thing",
          "name": categoryName,
          "description": `Best ${categoryName.toLowerCase()} tutorial creators and educational content`,
        }
      }
    }
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you're looking for doesn't exist."
    };
  }
  
  // Get creators for this category for the count
  const categoryCreators = await getCreators();
  
  // Create SEO-friendly title and description
  const title = `Top ${category.name} Content Creators & Tutorials`;
  const description = `Discover ${categoryCreators.length || 'expert'} content creators specializing in ${category.name}. Find highly-rated tutorials, courses, and educational content for ${category.name} learning and mastery.`;
  
  // Construct related technologies based on the category
  const relatedTechnologies = getRelatedTechnologies(category.name);
  
  // SEO-optimized keywords for the category
  const keywords = `${category.name}, ${category.name} tutorials, learn ${category.name}, ${category.name} courses, ${relatedTechnologies.join(', ')}, programming education, tech content creators`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://www.bestyoutubechannels.com/categories/${params.slug}`,
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://www.bestyoutubechannels.com/categories/${params.slug}`,
      images: [
        {
          url: `https://www.bestyoutubechannels.com/images/categories/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${category.name} Tutorials and Content Creators`,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.bestyoutubechannels.com/images/categories/${params.slug}.jpg`],
    }
  };
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);
  
  if (!category) {
    notFound();
  }
  
  const categoryCreators = await getCreators();
  
  return (
    <>
      <Shell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateCategorySchema(category.name, category.slug, categoryCreators.length))
          }}
        />
        <div className="space-y-8">
          <div className="relative space-y-6 pb-8">
            {/* Decorative background elements */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-background/80" />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute inset-0 -z-10 bg-[size:200%_200%] bg-[linear-gradient(45deg,var(--primary)/10,var(--accent)/10,var(--secondary)/10,var(--primary)/10)]" />

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                {category.name} Creators
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                {categoryCreators.length} expert {category.name.toLowerCase()} educators sharing their knowledge and experience.
              </p>
            </div>
          </div>

          <div>
            <CreatorGrid 
              creators={categoryCreators} 
              emptyMessage={`No ${category.name.toLowerCase()} content creators found yet.`}
            />
          </div>
        </div>
      </Shell>
      
      {/* Keep the JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `Top ${category.name} Content Creators & Tutorials`,
            "description": `Discover content creators specializing in ${category.name}. Find highly-rated tutorials and courses.`,
            "url": `https://www.bestyoutubechannels.com/categories/${params.slug}`,
            "about": {
              "@type": "Thing",
              "name": category.name,
              "description": category.description
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "Tech Content Creators Platform",
              "url": "https://www.bestyoutubechannels.com"
            }
          })
        }}
      />
    </>
  );
}

// Helper function to get related technologies based on category name
function getRelatedTechnologies(categoryName: string): string[] {
  const technologiesMap: Record<string, string[]> = {
    "Web Development": ["HTML", "CSS", "JavaScript", "React", "Next.js", "Angular", "Vue"],
    "Backend Development": ["Node.js", "Express", "Django", "Flask", "Spring Boot", "Ruby on Rails"],
    "Mobile Development": ["React Native", "Flutter", "Swift", "Kotlin", "iOS", "Android"],
    "Data Science": ["Python", "R", "Pandas", "NumPy", "Jupyter", "TensorFlow", "PyTorch"],
    "DevOps": ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "AWS", "Azure", "GCP"],
    "Cloud Computing": ["AWS", "Azure", "GCP", "Serverless", "Microservices", "Infrastructure as Code"],
    "Game Development": ["Unity", "Unreal Engine", "C#", "C++", "Godot", "3D Modeling"],
    "Artificial Intelligence": ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision"],
    "Blockchain": ["Ethereum", "Solidity", "Web3", "Smart Contracts", "NFTs", "Cryptocurrencies"],
    "Cybersecurity": ["Network Security", "Ethical Hacking", "Penetration Testing", "Encryption", "Security Protocols"]
  };
  
  // Return related technologies if exists, otherwise return generic tech terms
  return technologiesMap[categoryName] || ["Programming", "Software Development", "Coding", "Tech Education"];
} 