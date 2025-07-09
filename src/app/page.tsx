import React from 'react';
import { getCollection } from '../api';
import { GameThumbnail } from '../components/GameThumbnail';

const Home: React.FC = async () => {
    const games = await getCollection();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 items-center justify-center">
            {games.map((game) => (
                <GameThumbnail key={game.name} game={game} />
            ))}
        </div>
    );
};

export default Home;
