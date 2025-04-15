'use client';
import { useRef, useState, useEffect } from 'react';
import {
	Play,
	Pause,
	Volume2,
	VolumeX,
	Expand,
	RotateCcw,
	X,
	Loader2,
} from 'lucide-react';

interface VideoPlayerProps {
	onShowButton: () => void;
}

export default function CustomVideoPlayer({ onShowButton }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);
	const [videoEnded, setVideoEnded] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [volume, setVolume] = useState(0.5);
	const [isLoading, setIsLoading] = useState(true);

	// Manejo de carga del video
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleLoadedData = () => {
			setIsLoading(false);
			video.volume = volume;
			video
				.play()
				.catch(() =>
					console.warn('Autoplay bloqueado, esperando interacción del usuario.')
				);
		};

		const handleWaiting = () => setIsLoading(true);
		const handlePlaying = () => setIsLoading(false);
		const handleError = () => setIsLoading(false);

		video.addEventListener('loadeddata', handleLoadedData);
		video.addEventListener('waiting', handleWaiting);
		video.addEventListener('playing', handlePlaying);
		video.addEventListener('error', handleError);

		return () => {
			video.removeEventListener('loadeddata', handleLoadedData);
			video.removeEventListener('waiting', handleWaiting);
			video.removeEventListener('playing', handlePlaying);
			video.removeEventListener('error', handleError);
		};
	}, [volume]);

	// Manejo de pantalla completa
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () =>
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
	}, []);

	const updateProgress = () => {
		const video = videoRef.current;
		if (!video) return;

		const percentage = (video.currentTime / video.duration) * 100;
		setProgress(percentage);

		if (video.duration - video.currentTime <= 5) {
			onShowButton();
		}
	};

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			video.play().catch((e) => console.error('Error al reproducir:', e));
		} else {
			video.pause();
		}
	};

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) return;

		video.muted = !video.muted;
	};

	const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (videoRef.current) {
			videoRef.current.volume = newVolume;
			videoRef.current.muted = newVolume === 0;
		}
	};

	const requestFullScreen = () => {
		if (containerRef.current) {
			if (!document.fullscreenElement) {
				containerRef.current.requestFullscreen().catch((e) => {
					console.error('Error al entrar en pantalla completa:', e);
				});
			} else {
				document.exitFullscreen();
			}
		}
	};

	const replayVideo = () => {
		const video = videoRef.current;
		if (!video) return;

		video.currentTime = 0;
		video.play().catch((e) => console.error('Error al reproducir:', e));
		setVideoEnded(false);
	};

	return (
		<div
			ref={containerRef}
			className={`relative bg-black rounded-lg overflow-hidden border-4 border-[#ff3a8c] mb-4 ${
				isFullscreen
					? 'fixed inset-0 w-full h-full max-w-none z-50 border-none'
					: 'w-full max-w-[800px] aspect-video'
			}`}
		>
			{/* Spinner de carga */}
			{isLoading && (
				<div className="absolute inset-0 flex flex-col gap-1 items-center justify-center z-10 bg-black/50">
					<Loader2 className="animate-spin text-white h-8 w-8 md:h-12 md:w-12" />
					<span className="text-white">Cargando video...</span>
				</div>
			)}

			{/* Video */}
			<video
				ref={videoRef}
				src="/video.mp4"
				className={`w-full h-full transition-opacity duration-300 ${
					isFullscreen ? 'absolute inset-0 object-contain' : 'object-cover'
				} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
				onTimeUpdate={updateProgress}
				onEnded={() => setVideoEnded(true)}
				autoPlay
				muted
				playsInline
			/>

			{/* Barra de progreso */}
			{!isLoading && (
				<div
					className={`absolute ${
						isFullscreen
							? 'bottom-20 left-4 right-4'
							: 'bottom-[60px] sm:bottom-[70px] left-3 right-3'
					} h-1 bg-gray-400 rounded-full overflow-hidden`}
				>
					<div
						className="h-full bg-white rounded-full transition-all"
						style={{ width: `${progress}%` }}
					/>
				</div>
			)}

			{/* Controles */}
			{!isLoading && (
				<div
					className={`absolute ${
						isFullscreen
							? 'bottom-0 left-0 right-0 p-4'
							: 'bottom-0 left-0 right-0 p-3'
					} bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between transition-opacity duration-300`}
				>
					<div className="flex items-center gap-4">
						{/* Play/Pause */}
						<button
							onClick={togglePlay}
							className="text-white p-2 hover:bg-white/10 rounded-full transition"
							aria-label={videoRef.current?.paused ? 'Reproducir' : 'Pausar'}
						>
							{videoRef.current?.paused ? (
								<Play size={isFullscreen ? 32 : 24} />
							) : (
								<Pause size={isFullscreen ? 32 : 24} />
							)}
						</button>

						{/* Mute/Unmute y Control de Volumen */}
						<div className="flex items-center gap-2">
							<button
								onClick={toggleMute}
								className="text-white p-2 hover:bg-white/10 rounded-full transition"
								aria-label={
									videoRef.current?.muted ? 'Activar sonido' : 'Silenciar'
								}
							>
								{videoRef.current?.muted ? (
									<VolumeX size={isFullscreen ? 32 : 24} />
								) : (
									<Volume2 size={isFullscreen ? 32 : 24} />
								)}
							</button>
							<input
								type="range"
								min="0"
								max="1"
								step="0.05"
								value={volume}
								onChange={changeVolume}
								className={`${
									isFullscreen ? 'w-32 h-2' : 'w-20 h-1'
								} bg-gray-400 rounded-lg appearance-none cursor-pointer hover:bg-gray-300 transition`}
								aria-label="Control de volumen"
							/>
						</div>
					</div>

					{/* Fullscreen */}
					<button
						onClick={requestFullScreen}
						className="text-white p-2 hover:bg-white/10 rounded-full transition"
						aria-label={
							isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'
						}
					>
						<Expand size={isFullscreen ? 32 : 24} />
					</button>
				</div>
			)}

			{/* Volver a ver el video */}
			{!isLoading && videoEnded && (
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
					<button
						onClick={replayVideo}
						className={`bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition ${
							isFullscreen ? 'text-xl' : ''
						}`}
						aria-label="Volver a ver el video"
					>
						<RotateCcw size={isFullscreen ? 24 : 20} /> Volver a ver el video
					</button>
				</div>
			)}

			{/* Botón para salir de pantalla completa */}
			{!isLoading && isFullscreen && (
				<button
					onClick={requestFullScreen}
					className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition"
					aria-label="Salir de pantalla completa"
				>
					<X size={32} />
				</button>
			)}
		</div>
	);
}
