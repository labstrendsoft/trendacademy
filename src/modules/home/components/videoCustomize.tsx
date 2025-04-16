'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
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
	const [volume, setVolume] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	// Efecto principal para carga inicial de este  video
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// eslint-disable-next-line prefer-const
		let timeoutId: NodeJS.Timeout;

		const handleSuccess = () => {
			clearTimeout(timeoutId);
			setIsLoading(false);
			setHasError(false);

			// Configuración inicial muteada para autoplay
			video.muted = true;
			video.volume = 0;

			const playPromise = video.play();

			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						setIsPlaying(true);
						// Restaurar volumen después de iniciar
						setTimeout(() => {
							video.muted = volume === 0;
							video.volume = volume;
						}, 1000);
					})
					.catch((error) => {
						console.warn('Autoplay bloqueado:', error);
						setIsPlaying(false);
						onShowButton();
					});
			}
		};

		const handleError = () => {
			clearTimeout(timeoutId);
			setIsLoading(false);
			setHasError(true);
		};

		timeoutId = setTimeout(handleError, 8000);

		video.addEventListener('loadeddata', handleSuccess);
		video.addEventListener('canplay', handleSuccess);
		video.addEventListener('playing', () => setIsPlaying(true));
		video.addEventListener('pause', () => setIsPlaying(false));
		video.addEventListener('error', handleError);

		video.preload = 'auto';
		video.src = '/video.mp4';
		video.load();

		return () => {
			clearTimeout(timeoutId);
			video.removeEventListener('loadeddata', handleSuccess);
			video.removeEventListener('canplay', handleSuccess);
			video.removeEventListener('playing', () => setIsPlaying(true));
			video.removeEventListener('pause', () => setIsPlaying(false));
			video.removeEventListener('error', handleError);
		};
	}, []);

	// Efecto específico para actualización de volumen
	useEffect(() => {
		if (videoRef.current && !isLoading) {
			videoRef.current.volume = volume;
			videoRef.current.muted = volume === 0;
		}
	}, [volume, isLoading]);

	// Manejo de pantalla completa
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	}, []);

	// Barra de progreso optimizada
	const updateProgress = useCallback(() => {
		const video = videoRef.current;
		if (!video || video.readyState === 0) return;

		requestAnimationFrame(() => {
			const duration = video.duration || 1;
			const percentage = (video.currentTime / duration) * 100;
			setProgress(percentage);

			if (duration - video.currentTime <= 5) {
				onShowButton();
			}
		});
	}, [onShowButton]);

	const togglePlay = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;

		if (video.paused) {
			video
				.play()
				.then(() => setIsPlaying(true))
				.catch((e) => console.error('Error al reproducir:', e));
		} else {
			video.pause();
			setIsPlaying(false);
		}
	}, []);

	const toggleMute = useCallback(() => {
		const newVolume = volume > 0 ? 0 : 0.5;
		setVolume(newVolume);
	}, [volume]);

	const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
	}, []);

	const requestFullScreen = useCallback(() => {
		if (containerRef.current) {
			if (!document.fullscreenElement) {
				containerRef.current.requestFullscreen().catch((e) => {
					console.error('Error al entrar en pantalla completa:', e);
				});
			} else {
				document.exitFullscreen();
			}
		}
	}, []);

	const replayVideo = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;

		video.currentTime = 0;
		setVideoEnded(false);
		video
			.play()
			.then(() => setIsPlaying(true))
			.catch((e) => console.error('Error al reproducir:', e));
	}, []);

	const handleRetry = useCallback(() => {
		setHasError(false);
		setIsLoading(true);
		if (videoRef.current) {
			videoRef.current.src = '/video.mp4';
			videoRef.current.load();
		}
	}, []);

	return (
		<div
			ref={containerRef}
			className={`relative bg-black rounded-lg overflow-hidden border-4 border-[#ff3a8c] mb-4 ${
				isFullscreen
					? 'fixed inset-0 w-full h-full max-w-none z-50 border-none'
					: 'w-full max-w-[800px] aspect-video'
			}`}
		>
			{/* Estado de carga */}
			{isLoading && (
				<div className="absolute inset-0 flex flex-col gap-1 items-center justify-center z-10 bg-black/50">
					<Loader2 className="animate-spin text-white h-8 w-8 md:h-12 md:w-12" />
					<span className="text-white">Cargando video...</span>
				</div>
			)}

			{/* Mensaje de error */}
			{hasError && (
				<div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/50 p-4 text-center">
					<p className="text-white text-lg mb-4">Error al cargar el video</p>
					<button
						onClick={handleRetry}
						className="bg-[#ff3a8c] text-white px-4 py-2 rounded-lg hover:bg-[#e0357d] transition"
					>
						Reintentar
					</button>
				</div>
			)}

			{/* Video */}
			<video
				ref={videoRef}
				src="/video.mp4"
				className={`w-full h-full transition-opacity duration-300 ${
					isFullscreen ? 'absolute inset-0 object-contain' : 'object-cover'
				} ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
				onTimeUpdate={updateProgress}
				onEnded={() => setVideoEnded(true)}
				autoPlay
				muted={volume === 0}
				playsInline
			/>

			{/* Barra de progreso (solo cuando el video está reproduciendo) */}
			{!isLoading && !hasError && !videoEnded && (
				<div
					className={`absolute ${
						isFullscreen
							? 'bottom-20 left-4 right-4'
							: 'bottom-[60px] sm:bottom-[70px] left-3 right-3'
					} h-1 bg-gray-400 rounded-full overflow-hidden`}
				>
					<div
						className="h-full bg-white rounded-full transition-all duration-100"
						style={{ width: `${progress}%` }}
					/>
				</div>
			)}

			{/* Controles (solo cuando el video está reproduciendo) */}
			{!isLoading && !hasError && !videoEnded && (
				<div
					className={`absolute ${
						isFullscreen
							? 'bottom-0 left-0 right-0 p-4'
							: 'bottom-0 left-0 right-0 p-3'
					} bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between`}
				>
					<div className="flex items-center gap-4">
						{/* Play/Pause */}
						<button
							onClick={togglePlay}
							className="text-white p-2 hover:bg-white/10 rounded-full transition"
							aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
						>
							{isPlaying ? (
								<Pause size={isFullscreen ? 32 : 24} />
							) : (
								<Play size={isFullscreen ? 32 : 24} />
							)}
						</button>

						{/* Mute/Unmute y Control de Volumen */}
						<div className="flex items-center gap-2">
							<button
								onClick={toggleMute}
								className="text-white p-2 hover:bg-white/10 rounded-full transition"
								aria-label={volume === 0 ? 'Activar sonido' : 'Silenciar'}
							>
								{volume === 0 ? (
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

			{/* Volver a ver el video (solo cuando el video ha terminado) */}
			{!isLoading && !hasError && videoEnded && (
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
					<button
						onClick={replayVideo}
						className={`bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition ${
							isFullscreen ? 'text-xl' : 'text-sm'
						}`}
						aria-label="Volver a ver el video"
					>
						<RotateCcw size={isFullscreen ? 24 : 20} /> Volver a ver el video
					</button>
				</div>
			)}

			{/* Botón para salir de pantalla completa (solo cuando está en pantalla completa y reproduciendo) */}
			{!isLoading && !hasError && isFullscreen && !videoEnded && (
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
