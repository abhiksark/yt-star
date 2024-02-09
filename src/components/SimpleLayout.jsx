import { Container } from '@/components/Container'

import React from 'react';
import Image from 'next/image';

export function SimpleLayout({ title, intro, children }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  )
}

export function NewLayout({ title, children }) {
  return (
    <Container className="flex-row mt-16 sm:mt-32">
      <h2 className="h3 text-gray-100 font-extrabold mb-0">{title}</h2>
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {children}
      </div>
    </Container>
  );
}

export function SimpleLayoutNew({ title, children }) {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="flex flex-col gap-6 bg-zinc-100  dark:bg-gray-800 p-8 rounded-2xl shadow-md">
        <header className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h2>

        </header>
        {/* <div className="mt-16 sm:mt-20"> */}
        <div className="flex flex-col gap-16">
          {children}
        </div>
      </div>
      {/* </div> */}
    </Container>
  )
}

export function CategoryList({ category }) {
  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl md:text-3xl">
        {category.name}
      </h3>
      <div className="mt-5">
        <ul role="list" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {category.items.map(item => (
            <li key={item.name} className="flex flex-col items-center hover:translate-y-1 transition duration-300">
              <a href={item.link} target="_blank" rel="noreferrer noopener" className="flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden relative">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    width={96}
                    height={96}
                    unoptimized
                  />
                </div>
                <h4 className="mt-4 text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-100 text-center">{item.name}</h4>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export function LearningResources({ categories }) {
  return (
    <div>
      {categories.map(category => (
        <CategoryList key={category.name} category={category} />
      ))}
    </div>
  );
}
