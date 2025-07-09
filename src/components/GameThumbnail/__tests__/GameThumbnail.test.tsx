import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameThumbnail } from '../GameThumbnail';
import { Game } from '../../../types/game';

jest.mock('next/image', () => {
    const MockedImage = ({ src, alt, ...props }: any) => {
        return <img src={src} alt={alt} {...props} />;
    };
    MockedImage.displayName = 'MockedImage';
    return MockedImage;
});

describe('GameThumbnail', () => {
    const mockGame: Game = {
        name: 'Gloomhaven',
        yearpublished: '2017',
        image: 'https://cf.geekdo-images.com/original/img/lDN358RgcYvQfYYN6Oy2TXpifyM=/0x0/pic2437871.jpg',
        thumbnail:
            'https://cf.geekdo-images.com/thumb/img/e7GyV3RNhtAzfqI29ONIFJLu7sM=/fit-in/200x150/pic2437871.jpg',
        numplays: '5',
    };

    it('should render game image with correct alt text', () => {
        render(<GameThumbnail game={mockGame} />);

        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Gloomhaven');
        expect(image).toHaveAttribute('src', mockGame.image);
    });

    it('should render game title in overlay', () => {
        render(<GameThumbnail game={mockGame} />);

        const title = screen.getByText('Gloomhaven');
        expect(title).toBeInTheDocument();
    });

    it('should have proper CSS classes for hover effects', () => {
        render(<GameThumbnail game={mockGame} />);

        const container = screen
            .getByText('Gloomhaven')
            .closest('div')?.parentElement;
        expect(container).toHaveClass('relative', 'group', 'cursor-pointer');

        const overlay = screen.getByText('Gloomhaven').parentElement;
        expect(overlay).toHaveClass('absolute', 'inset-0', 'bg-black');

        const title = screen.getByText('Gloomhaven');
        expect(title).toHaveClass('text-white', 'text-center', 'font-semibold');
    });

    it('should render with different game data', () => {
        const differentGame: Game = {
            name: 'Pandemic Legacy: Season 1',
            yearpublished: '2015',
            image: 'https://cf.geekdo-images.com/original/img/ZV0beTrNcFQI8qZe7Kn4WlUL5m8=/0x0/pic2452831.jpg',
            thumbnail:
                'https://cf.geekdo-images.com/thumb/img/o2w_VH-_PNPH2dn9vCX7LKOqpgk=/fit-in/200x150/pic2452831.jpg',
            numplays: '12',
        };

        render(<GameThumbnail game={differentGame} />);

        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('alt', 'Pandemic Legacy: Season 1');
        expect(image).toHaveAttribute('src', differentGame.image);

        const title = screen.getByText('Pandemic Legacy: Season 1');
        expect(title).toBeInTheDocument();
    });
});
