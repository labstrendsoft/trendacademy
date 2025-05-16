'use client';
import { useEffect, useRef } from 'react';
import Player from '@vimeo/player';

type VimeoPlayerProps = {
	videoUrl: string;
};

const VimeoPlayer = ({ videoUrl }: VimeoPlayerProps) => {
	const playerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (typeof window !== 'undefined' && playerRef.current) {
			const player = new Player(playerRef.current, {
				url: videoUrl,
				width: playerRef.current.offsetWidth,
				height: playerRef.current.offsetHeight,
			});

			player.on('play', () => console.log('Video is playing'));
			player.on('pause', () => console.log('Video is paused'));

			return () => {
				player.destroy();
			};
		}
	}, [videoUrl]);

	return <div ref={playerRef} className="w-full h-full" />;
};

export default VimeoPlayer;
