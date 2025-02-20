import React from 'react';
import type { CollectionEntry } from 'astro:content';

type Props = {
  testimonials: CollectionEntry<'testimonials'>[];
};

const Testimonials = ({ testimonials }: Props) => {
  return (
    <section className="py-16 bg-white dark:bg-primary transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-bebas text-4xl md:text-5xl text-primary dark:text-white text-center mb-12">
          WHAT THE CREW SAYS
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-primary-light dark:bg-primary-light/10 p-6 rounded-lg shadow-md">
              <p className="text-primary dark:text-white mb-4">{testimonial.data.content}</p>
              <div className="border-t border-secondary pt-4">
                <p className="font-bold text-primary dark:text-white">{testimonial.data.author}</p>
                <p className="text-sm text-secondary-dark dark:text-secondary">{testimonial.data.role}</p>
                <p className="text-xs text-primary-accent mt-1">via {testimonial.data.platform}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
