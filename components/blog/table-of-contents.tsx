import { useState, useEffect } from 'react';
import { Link } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }));
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    elements.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="space-y-2 text-sm">
      <div className="flex items-center gap-2 font-medium">
        <Link className="h-4 w-4" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-2 text-muted-foreground">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
          >
            <a
              href={`#${heading.id}`}
              className={`hover:text-primary transition-colors ${
                activeId === heading.id ? 'text-primary font-medium' : ''
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}