/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

declare global {
	interface Document {
		webkitFullscreenElement?: Element;
		mozFullScreenElement?: Element;
		msFullscreenElement?: Element;
		webkitExitFullscreen?: () => Promise<void>;
		mozCancelFullScreen?: () => Promise<void>;
		msExitFullscreen?: () => Promise<void>;
	}

	interface HTMLElement {
		webkitRequestFullscreen?: () => Promise<void>;
		mozRequestFullScreen?: () => Promise<void>;
		msRequestFullscreen?: () => Promise<void>;
	}

	interface HTMLVideoElement {
		webkitEnterFullscreen?: () => void;
		webkitDisplayingFullscreen?: boolean;
		webkitbeginfullscreen?: any;
		webkitendfullscreen?: any;
	}
}

export default function CustomVideoPlayer({ onShowButton }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [progress, setProgress] = useState(0);
	const [videoEnded, setVideoEnded] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [volume, setVolume] = useState(0);
	const [prevVolume, setPrevVolume] = useState(0.5);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showControls, setShowControls] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

	// Detectar si es móvil
	useEffect(() => {
		const checkIsMobile = () => {
			setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
		};
		checkIsMobile();
		window.addEventListener('resize', checkIsMobile);
		return () => window.removeEventListener('resize', checkIsMobile);
	}, []);

	// Mostrar/ocultar controles
	const handleShowControls = useCallback(() => {
		setShowControls(true);
		if (controlsTimeout.current) {
			clearTimeout(controlsTimeout.current);
		}
		controlsTimeout.current = setTimeout(() => {
			setShowControls(false);
		}, 3000);
	}, []);

	// Resetear el timeout cuando se interactúa
	const handleControlsInteraction = useCallback(() => {
		if (controlsTimeout.current) {
			clearTimeout(controlsTimeout.current);
		}
		controlsTimeout.current = setTimeout(() => {
			setShowControls(false);
		}, 3000);
	}, []);

	// Carga inicial del video
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		// eslint-disable-next-line prefer-const
		let timeoutId: NodeJS.Timeout;

		const handleSuccess = () => {
			clearTimeout(timeoutId);
			setIsLoading(false);
			setHasError(false);

			video.volume = volume;
			video.muted = volume === 0;

			const playPromise = video.play();

			if (playPromise !== undefined) {
				playPromise
					.then(() => setIsPlaying(true))
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

	// Actualización de volumen
	useEffect(() => {
		const video = videoRef.current;
		if (video && !isLoading) {
			video.volume = volume;
			video.muted = volume === 0;
		}
	}, [volume, isLoading]);

	// Pantalla completa para iOS
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handleFullscreenChange = () => {
			if (video.webkitDisplayingFullscreen) {
				setIsFullscreen(true);
				video.controls = true;
			} else {
				setIsFullscreen(false);
				video.controls = false;
			}
		};

		video.addEventListener('webkitbeginfullscreen', handleFullscreenChange);
		video.addEventListener('webkitendfullscreen', handleFullscreenChange);

		return () => {
			video.removeEventListener(
				'webkitbeginfullscreen',
				handleFullscreenChange
			);
			video.removeEventListener('webkitendfullscreen', handleFullscreenChange);
		};
	}, []);

	// Pantalla completa para otros dispositivos
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(
				!!document.fullscreenElement ||
					!!document.webkitFullscreenElement ||
					!!document.mozFullScreenElement ||
					!!document.msFullscreenElement
			);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.addEventListener('mozfullscreenchange', handleFullscreenChange);
		document.addEventListener('MSFullscreenChange', handleFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener(
				'webkitfullscreenchange',
				handleFullscreenChange
			);
			document.removeEventListener(
				'mozfullscreenchange',
				handleFullscreenChange
			);
			document.removeEventListener(
				'MSFullscreenChange',
				handleFullscreenChange
			);
		};
	}, []);

	// Barra de progreso
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
	}, []);

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
		if (volume > 0) {
			setPrevVolume(volume);
			setVolume(0);
		} else {
			setVolume(prevVolume > 0 ? prevVolume : 0.5);
		}
	}, [volume, prevVolume]);

	const changeVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);
		if (newVolume > 0) {
			setPrevVolume(newVolume);
		}
	}, []);

	// Función de pantalla completa
	const requestFullScreen = useCallback(() => {
		const video = videoRef.current;
		const container = containerRef.current;
		if (!video || !container) return;

		const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

		if (isIOS && video.webkitEnterFullscreen) {
			// Método específico para iOS
			video.webkitEnterFullscreen();
			video.controls = true;
		} else {
			// Método estándar para otros navegadores
			if (!document.fullscreenElement) {
				if (container.requestFullscreen) {
					container.requestFullscreen().catch((e) => console.error(e));
				} else if (container.webkitRequestFullscreen) {
					container.webkitRequestFullscreen();
				} else if (container.mozRequestFullScreen) {
					container.mozRequestFullScreen();
				} else if (container.msRequestFullscreen) {
					container.msRequestFullscreen();
				}
			} else {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			}
		}
	}, []);

	const replayVideo = useCallback(() => {
		const video = videoRef.current;
		if (!video) return;

		video.currentTime = 0;
		setVideoEnded(false);
		setShowControls(true);
		video
			.play()
			.then(() => setIsPlaying(true))
			.catch((e) => console.error('Error al reproducir:', e));

		if (controlsTimeout.current) {
			clearTimeout(controlsTimeout.current);
		}
		controlsTimeout.current = setTimeout(() => {
			setShowControls(false);
		}, 3000);
	}, []);

	const handleRetry = useCallback(() => {
		setHasError(false);
		setIsLoading(true);
		if (videoRef.current) {
			videoRef.current.src = '/video.mp4';
			videoRef.current.load();
		}
	}, []);

	// Limpiar timeout
	useEffect(() => {
		return () => {
			if (controlsTimeout.current) {
				clearTimeout(controlsTimeout.current);
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={`group relative bg-black rounded-lg overflow-hidden border-4 border-[#ff3a8c] mb-4 ${
				isFullscreen
					? 'fixed inset-0 w-full h-full max-w-none z-50 border-none'
					: 'w-full max-w-[800px] aspect-video'
			}`}
			onMouseEnter={() => !isMobile && setShowControls(true)}
			onMouseLeave={() => !isMobile && setShowControls(false)}
			onClick={handleShowControls}
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
				webkit-playsinline="true"
			/>

			{/* Barra de progreso (SOLO cuando showControls es true) */}
			{!isLoading && !hasError && !videoEnded && showControls && (
				<div
					className={`absolute ${
						isFullscreen
							? 'bottom-20 left-4 right-4'
							: 'bottom-[60px] sm:bottom-[65px] left-3 right-3'
					} h-1 bg-gray-400 rounded-full overflow-hidden transition-opacity duration-300`}
				>
					<div
						className="h-full bg-white rounded-full transition-all duration-100"
						style={{ width: `${progress}%` }}
					/>
				</div>
			)}

			{/* Controles (SOLO cuando showControls es true) */}
			{!isLoading && !hasError && !videoEnded && showControls && (
				<div
					className={`absolute ${
						isFullscreen
							? 'bottom-0 left-0 right-0 p-4'
							: 'bottom-0 left-0 right-0 p-3'
					} bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between`}
					onMouseEnter={handleControlsInteraction}
					onTouchStart={handleControlsInteraction}
				>
					<div className="flex items-center gap-4">
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

			{/* Volver a ver */}
			{!isLoading && !hasError && videoEnded && (
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
					<button
						onClick={replayVideo}
						className={`bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition ${
							isFullscreen ? 'text-xl' : 'text-sm'
						}`}
						aria-label="Volver a ver el video"
					>
						<RotateCcw size={isFullscreen ? 24 : 20} /> Volver a ver el video
					</button>
				</div>
			)}

			{/* Salir de pantalla completa */}
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
