import React from 'react';
import Image from 'next/image';
import { Game } from '../../types/game';

interface GameThumbnailProps {
    game: Game;
}

export const GameThumbnail: React.FC<GameThumbnailProps> = ({ game }) => {
    return (
        <div className="relative group cursor-pointer">
            <Image
                src={game.image}
                alt={game.name}
                width={300}
                height={300}
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center">
                <h3 className="text-white text-center font-semibold px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm md:text-base drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                    {game.name}
                </h3>
            </div>
        </div>
    );
};
