'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
	videoUrl: string; // La URL del video
};

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
	const [isPlaying, setIsPlaying] = useState(false); // Controla si el video está reproduciéndose
	const [playerSpeed, setPlayerSpeed] = useState(1); // Controla la velocidad de reproducción

	// Maneja el estado cuando el video está listo
	const handleOnReady = () => {
		console.log('El video está listo para reproducirse.');
	};

	// Maneja el estado cuando el video comienza a reproducirse
	const handleOnPlay = () => {
		console.log('El video está reproduciéndose.');
		setIsPlaying(true);
	};

	// Maneja el estado cuando el video se pausa
	const handleOnStop = () => {
		console.log('El video está pausado.');
		setIsPlaying(false);
	};

	// Maneja el estado cuando el video termina
	const handleOnEnded = () => {
		console.log('El video ha terminado.');
		setIsPlaying(false); // Puedes ponerlo en `false` o hacer algo más cuando el video termine
	};

	// Maneja el cambio en la velocidad de reproducción
	const handleOnPlaybackRateChange = (speed: number) => {
		console.log('La velocidad de reproducción ha cambiado a:', speed);
		setPlayerSpeed(speed);
	};

	return (
		<div className="w-full h-full">
			<ReactPlayer
				playing={isPlaying} // Controla si el video se reproduce o no
				controls // Muestra los controles estándar del reproductor
				width="100%" // Asegura que el video ocupe el 100% del ancho
				height="100%" // Asegura que el video ocupe el 100% de la altura
				playbackRate={playerSpeed} // La velocidad de reproducción
				onReady={handleOnReady} // Evento cuando el video está listo
				onPlay={handleOnPlay} // Evento cuando el video comienza a reproducirse
				onPause={handleOnStop} // Evento cuando el video se pausa
				onEnded={handleOnEnded} // Evento cuando el video termina
				onPlaybackRateChange={handleOnPlaybackRateChange} // Evento cuando se cambia la velocidad
				url={videoUrl} // URL del video que se va a reproducir
				playsinline // Reproduce en línea en dispositivos móviles
				config={{
					vimeo: {
						playerOptions: {
							title: false, // Ocultar el título
							byline: false, // Ocultar la línea del autor
							portrait: false, // Ocultar la imagen del autor
							loop: true, // Hacer que el video se repita
							autoplay: false, // Desactivar la reproducción automática
							logo: false, // Ocultar el logo (requiere cuenta Pro)
						},
					},
				}}
			/>
		</div>
	);
};

export default VideoPlayer;
