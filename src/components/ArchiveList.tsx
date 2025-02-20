import React from 'react';
import type { CollectionEntry } from 'astro:content';

type Props = {
    episodes: CollectionEntry<'archive'>[];
};

const ArchiveList = ({ episodes }: Props) => {
    return (
        <div className="space-y-6">
            {episodes.map((episode) => (
                <article
                    key={episode.data.id}
                    className="bg-white dark:bg-primary-light p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bebas text-2xl text-primary-accent">{episode.data.title}</h3>
                        <span className="text-sm text-secondary-dark dark:text-secondary">{episode.data.date}</span>
                    </div>
                    <p className="text-primary dark:text-primary mb-3">{episode.data.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-secondary-dark dark:text-secondary">{episode.data.readTime}</span>
                        <a
                            href={`#episode-${episode.data.id}`}
                            className="text-primary-accent hover:text-secondary-dark transition-colors duration-200 font-bebas"
                        >
                            READ MORE →
                        </a>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default ArchiveList;
