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

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.volume = volume;
		video
			.play()
			.catch(() =>
				console.warn('Autoplay bloqueado, esperando interacción del usuario.')
			);
	}, [volume]);

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
			video.play();
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
				containerRef.current.requestFullscreen();
			} else {
				document.exitFullscreen();
			}
		}
	};

	const replayVideo = () => {
		const video = videoRef.current;
		if (!video) return;

		video.currentTime = 0;
		video.play();
		setVideoEnded(false);
	};

	return (
		<div
			ref={containerRef}
			className={`relative w-full max-w-[800px] aspect-video bg-black rounded-lg overflow-hidden border-4 border-[#ff3a8c] mb-4 ${
				isFullscreen
					? 'fixed inset-0 w-full h-full max-w-none z-50 border-none'
					: ''
			}`}
		>
			{/* Video */}
			<video
				ref={videoRef}
				src="/video.mp4"
				className="w-full h-full object-cover"
				onTimeUpdate={updateProgress}
				onEnded={() => setVideoEnded(true)}
				autoPlay
				muted
				playsInline
			/>
			{/* Barra de progreso encima de los controles */}
			<div className="absolute bottom-[70px] left-0 right-0 h-1 bg-gray-400 rounded-full overflow-hidden mx-3">
				<div
					className="h-full bg-white rounded-full transition-all"
					style={{ width: `${progress}%` }}
				/>
			</div>

			{/* Controles */}
			<div
				className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between transition-opacity duration-300 ${
					isFullscreen ? 'p-5' : ''
				}`}
			>
				<div className="flex items-center gap-4">
					{/* Play/Pause */}
					<button onClick={togglePlay} className="text-white p-2">
						{videoRef.current?.paused ? (
							<Play size={24} />
						) : (
							<Pause size={24} />
						)}
					</button>

					{/* Mute/Unmute y Control de Volumen */}
					<div className="flex items-center gap-2">
						<button onClick={toggleMute} className="text-white p-2">
							{videoRef.current?.muted ? (
								<VolumeX size={24} />
							) : (
								<Volume2 size={24} />
							)}
						</button>
						<input
							type="range"
							min="0"
							max="1"
							step="0.05"
							value={volume}
							onChange={changeVolume}
							className="w-20 h-1 bg-gray-400 rounded-lg appearance-none cursor-pointer"
						/>
					</div>
				</div>

				{/* Barra de progreso */}
				{/* <div className="flex-1 mx-3 h-1 bg-gray-400 rounded-full overflow-hidden">
					<div
						className="h-full bg-white rounded-full transition-all"
						style={{ width: `${progress}%` }}
					/>
				</div> */}

				{/* Fullscreen */}
				<button onClick={requestFullScreen} className="text-white p-2">
					<Expand size={24} />
				</button>
			</div>

			{/* Volver a ver el video */}
			{videoEnded && (
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60">
					<button
						onClick={replayVideo}
						className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
					>
						<RotateCcw size={20} /> Volver a ver el video
					</button>
				</div>
			)}

			{/* Botón para salir de pantalla completa */}
			{isFullscreen && (
				<button
					onClick={requestFullScreen}
					className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-lg"
				>
					<X size={24} />
				</button>
			)}
		</div>
	);
}
