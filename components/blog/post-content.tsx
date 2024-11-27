interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      {content || (
        <>
          <p>
            The landscape of web development education is constantly evolving, and few
            creators have had as significant an impact as Theo. Through his unique
            approach to teaching and commitment to practical, real-world examples,
            Theo has built a community of developers who are pushing the boundaries
            of what's possible on the web.
          </p>

          <h2>The Journey to Education</h2>
          <p>
            Before becoming a content creator, Theo worked as a senior developer at
            several high-profile tech companies. This experience shaped his
            teaching style, focusing on practical solutions to real-world problems
            rather than theoretical concepts in isolation.
          </p>

          <h2>Impact on the Community</h2>
          <p>
            Through his YouTube channel and online presence, Theo has helped
            thousands of developers level up their skills. His no-nonsense approach
            to explaining complex concepts has made advanced topics accessible to
            developers at all skill levels.
          </p>

          <h2>Looking to the Future</h2>
          <p>
            As web development continues to evolve, Theo's role in educating the
            next generation of developers becomes increasingly important. His
            commitment to staying current with the latest technologies while
            maintaining a focus on fundamental principles sets him apart in the
            world of tech education.
          </p>
        </>
      )}
    </div>
  );
}