import React from 'react';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  platform: string;
}

const testimonials: Testimonial[] = [
  {
    content: "The Weekly Devs Brew is my go-to source for staying updated with the dev world. Each issue is packed with valuable insights!",
    author: "Sarah Chen",
    role: "Senior Developer",
    platform: "Twitter"
  },
  {
    content: "Finally, a dev newsletter that respects my time. No fluff, just pure valuable content. Highly recommended! 🚀",
    author: "Mike Johnson",
    role: "Tech Lead",
    platform: "LinkedIn"
  },
  {
    content: "I've learned more from this newsletter in 3 months than I did from random blog posts in a year. Keep brewing the good stuff! ☕",
    author: "Alex Rivera",
    role: "Full Stack Developer",
    platform: "Twitter"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white dark:bg-primary transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-bebas text-4xl md:text-5xl text-primary dark:text-white text-center mb-12">
          WHAT THE CREW SAYS
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-primary-light dark:bg-primary-light/10 p-6 rounded-lg shadow-md">
              <p className="text-primary dark:text-white mb-4">{testimonial.content}</p>
              <div className="border-t border-secondary pt-4">
                <p className="font-bold text-primary dark:text-white">{testimonial.author}</p>
                <p className="text-sm text-secondary-dark dark:text-secondary">{testimonial.role}</p>
                <p className="text-xs text-primary-accent mt-1">via {testimonial.platform}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;