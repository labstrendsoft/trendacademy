'use client';

import { useEffect, useRef, useState } from 'react';
import {
	FastForward,
	Loader2,
	Maximize,
	Minimize,
	Pause,
	Play,
	Rewind,
	Volume,
	Volume1,
	Volume2,
	VolumeX,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/common/components/shadcnui/button';
import { Slider } from '@/common/components/shadcnui/slider';

interface CustomVideoPlayerProps {
	src: string;
	poster?: string;
	className?: string;
}

export default function CustomVideoPlayers({
	src,
	poster,
	className,
}: CustomVideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	const [showControls, setShowControls] = useState(true);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [hideControlsTimeout, setHideControlsTimeout] =
		useState<NodeJS.Timeout | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	// Initialize video
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onLoadedMetadata = () => {
			setDuration(video.duration);
			setIsLoading(false);
		};

		const onLoadedData = () => {
			setIsLoading(false);
		};

		const onError = () => {
			setIsLoading(false);
			setHasError(true);
			console.error('Error loading video');
		};

		video.addEventListener('loadedmetadata', onLoadedMetadata);
		video.addEventListener('loadeddata', onLoadedData);
		video.addEventListener('error', onError);

		return () => {
			video.removeEventListener('loadedmetadata', onLoadedMetadata);
			video.removeEventListener('loadeddata', onLoadedData);
			video.removeEventListener('error', onError);
		};
	}, []);

	// Update current time
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onTimeUpdate = () => {
			setCurrentTime(video.currentTime);
		};

		video.addEventListener('timeupdate', onTimeUpdate);

		return () => {
			video.removeEventListener('timeupdate', onTimeUpdate);
		};
	}, []);

	// Handle play state changes
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const onPlay = () => setIsPlaying(true);
		const onPause = () => setIsPlaying(false);
		const onEnded = () => setIsPlaying(false);

		video.addEventListener('play', onPlay);
		video.addEventListener('pause', onPause);
		video.addEventListener('ended', onEnded);

		return () => {
			video.removeEventListener('play', onPlay);
			video.removeEventListener('pause', onPause);
			video.removeEventListener('ended', onEnded);
		};
	}, []);

	// Handle fullscreen changes
	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	}, []);

	// Auto-hide controls
	useEffect(() => {
		if (!showControls) return;

		if (hideControlsTimeout) {
			clearTimeout(hideControlsTimeout);
		}

		if (isPlaying) {
			const timeout = setTimeout(() => {
				setShowControls(false);
			}, 3000);

			setHideControlsTimeout(timeout);
		}

		return () => {
			if (hideControlsTimeout) {
				clearTimeout(hideControlsTimeout);
			}
		};
	}, [showControls, isPlaying, hideControlsTimeout]);

	const togglePlay = () => {
		const video = videoRef.current;
		if (!video || isLoading || hasError) return;

		if (isPlaying) {
			video.pause();
		} else {
			// Using promise to handle autoplay restrictions
			const playPromise = video.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						// Autoplay started successfully
					})
					.catch((error) => {
						// Autoplay was prevented
						console.error('Autoplay prevented:', error);
						setIsPlaying(false);
					});
			}
		}
	};

	const handleProgressChange = (value: number[]) => {
		const video = videoRef.current;
		if (!video || isLoading || hasError) return;

		const newTime = (value[0] / 100) * duration;
		video.currentTime = newTime;
		setCurrentTime(newTime);
	};

	const handleVolumeChange = (value: number[]) => {
		const video = videoRef.current;
		if (!video) return;

		const newVolume = value[0] / 100;
		video.volume = newVolume;
		setVolume(newVolume);

		if (newVolume === 0) {
			setIsMuted(true);
			video.muted = true;
		} else if (isMuted) {
			setIsMuted(false);
			video.muted = false;
		}
	};

	const toggleMute = () => {
		const video = videoRef.current;
		if (!video) return;

		if (isMuted) {
			video.muted = false;
			setIsMuted(false);
			if (volume === 0) {
				const newVolume = 0.5;
				video.volume = newVolume;
				setVolume(newVolume);
			}
		} else {
			video.muted = true;
			setIsMuted(true);
		}
	};

	const toggleFullscreen = () => {
		const container = containerRef.current;
		if (!container) return;

		if (!document.fullscreenElement) {
			container.requestFullscreen().catch((err) => {
				console.error(`Error attempting to enable fullscreen: ${err.message}`);
			});
		} else {
			document.exitFullscreen();
		}
	};

	const rewind = () => {
		const video = videoRef.current;
		if (!video || isLoading || hasError) return;

		video.currentTime = Math.max(0, video.currentTime - 10);
	};

	const fastForward = () => {
		const video = videoRef.current;
		if (!video || isLoading || hasError) return;

		video.currentTime = Math.min(duration, video.currentTime + 10);
	};

	const formatTime = (timeInSeconds: number) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = Math.floor(timeInSeconds % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	const getVolumeIcon = () => {
		if (isMuted || volume === 0) return <VolumeX />;
		if (volume < 0.3) return <Volume />;
		if (volume < 0.7) return <Volume1 />;
		return <Volume2 />;
	};

	const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

	return (
		<div
			ref={containerRef}
			className={cn(
				'relative group overflow-hidden rounded-xl max-w-[700px] bg-black',
				isFullscreen ? 'w-full h-full' : 'w-full aspect-video',
				className
			)}
			onMouseMove={() => {
				setShowControls(true);
				if (hideControlsTimeout) {
					clearTimeout(hideControlsTimeout);
					setHideControlsTimeout(null);
				}
			}}
		>
			{/* Video element */}
			<video
				ref={videoRef}
				src={src}
				poster={poster}
				className="w-full h-full cursor-pointer"
				onClick={togglePlay}
				onDoubleClick={toggleFullscreen}
				preload="auto"
			/>

			{/* Loading indicator */}
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/50">
					<Loader2 className="w-12 h-12 text-primary animate-spin" />
				</div>
			)}

			{/* Error message */}
			{hasError && (
				<div className="absolute inset-0 flex items-center justify-center bg-black/50">
					<div className="text-center p-4 bg-black/80 rounded-lg">
						<p className="text-red-500 font-semibold mb-2">
							Error al cargar el video
						</p>
						<p className="text-white text-sm">
							Por favor, intenta con otra fuente de video
						</p>
					</div>
				</div>
			)}

			{/* Play/Pause overlay icon */}
			{!isPlaying && !isLoading && !hasError && (
				<div className="absolute inset-0 flex items-center justify-center">
					<Button
						variant="ghost"
						size="icon"
						className="w-20 h-20 rounded-full bg-black/30 text-white hover:bg-black/50 hover:scale-110 transition-all"
						onClick={togglePlay}
					>
						<Play className="w-10 h-10 fill-white" />
					</Button>
				</div>
			)}

			{/* Controls */}
			<div
				className={cn(
					'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300',
					showControls ? 'opacity-100' : 'opacity-0 pointer-events-none',
					(isLoading || hasError) && 'opacity-0 pointer-events-none'
				)}
			>
				{/* Progress bar */}
				<div className="mb-2">
					<Slider
						value={[progressPercentage]}
						min={0}
						max={100}
						step={0.1}
						onValueChange={handleProgressChange}
						className="[&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-primary"
					/>
				</div>

				{/* Control buttons */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/10"
							onClick={togglePlay}
						>
							{isPlaying ? (
								<Pause className="w-5 h-5" />
							) : (
								<Play className="w-5 h-5" />
							)}
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/10"
							onClick={rewind}
						>
							<Rewind className="w-5 h-5" />
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="text-white hover:bg-white/10"
							onClick={fastForward}
						>
							<FastForward className="w-5 h-5" />
						</Button>

						<div className="flex items-center gap-2 ml-2">
							<Button
								variant="ghost"
								size="icon"
								className="text-white hover:bg-white/10"
								onClick={toggleMute}
							>
								{getVolumeIcon()}
							</Button>

							<div className="w-24 hidden sm:block">
								<Slider
									value={[volume * 100]}
									min={0}
									max={100}
									step={1}
									onValueChange={handleVolumeChange}
									className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&>span:first-child_span]:bg-white"
								/>
							</div>
						</div>

						<span className="text-white text-sm ml-2">
							{formatTime(currentTime)} / {formatTime(duration)}
						</span>
					</div>

					<Button
						variant="ghost"
						size="icon"
						className="text-white hover:bg-white/10"
						onClick={toggleFullscreen}
					>
						{isFullscreen ? (
							<Minimize className="w-5 h-5" />
						) : (
							<Maximize className="w-5 h-5" />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
