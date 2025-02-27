import React from 'react';
import type { CollectionEntry } from 'astro:content';

type Props = {
    episodes: CollectionEntry<'archive'>[];
};

const ArchiveList = ({ episodes }: Props) => {
    if (episodes.length === 0) return null;

    const [featuredPost, ...remainingPosts] = episodes;

    return (
        <div className="space-y-12">
            {/* Featured Post */}
            <a href={`/archive/${featuredPost.data.slug}`} className="block">
                <article
                    key={featuredPost.data.id}
                    className="group bg-white dark:bg-primary-light rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img
                                src={featuredPost.data.thumbnailUrl}
                                alt={featuredPost.data.title}
                                className="w-full h-64 md:h-full object-fill"
                            />
                        </div>
                        <div className="p-8 md:w-1/2">
                            <span className="text-sm text-secondary-dark dark:text-secondary">{featuredPost.data.displayedDate}</span>
                            <h2 className="font-bebas text-3xl text-primary-accent group-hover:text-secondary-dark transition-colors duration-200 mt-2">
                                {featuredPost.data.title}
                            </h2>
                            <p className="text-primary dark:text-primary my-4">{featuredPost.data.previewText}</p>
                            <span className="inline-flex items-center text-primary-accent group-hover:text-secondary-dark transition-colors duration-200 font-bebas">
                                SAVOR THIS BREW →
                            </span>
                        </div>
                    </div>
                </article>
            </a>

            {/* Grid of Remaining Posts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((episode) => (
                    <a href={`/archive/${episode.data.slug}`} className="block">
                        <article
                            key={episode.data.id}
                            className="group bg-white dark:bg-primary-light rounded-lg shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <img
                                src={episode.data.thumbnailUrl}
                                alt={episode.data.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-6">
                                <span className="text-sm text-secondary-dark dark:text-secondary">{episode.data.displayedDate}</span>
                                <h3 className="font-bebas text-xl text-primary-accent group-hover:text-secondary-dark transition-colors duration-200 mt-2">
                                    {episode.data.title}
                                </h3>
                                <p className="text-primary dark:text-primary my-4 line-clamp-2">{episode.data.previewText}</p>
                                <span className="inline-flex items-center text-primary-accent group-hover:text-secondary-dark transition-colors duration-200 font-bebas">
                                    SAVOR THIS BREW →
                                </span>
                            </div>
                        </article>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ArchiveList;
