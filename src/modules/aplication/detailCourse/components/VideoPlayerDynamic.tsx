'use client';
import dynamic from 'next/dynamic';

// Importar el componente de VideoPlayer dinámicamente para evitar SSR
const VideoPlayer = dynamic(
	() => import('@root/src/common/components/custom/VideoPlayer'),
	{
		ssr: false, // Esto asegura que solo se renderice en el cliente
	}
);

const DynamicVideoPlayer = () => {
	const videoUrl = 'https://player.vimeo.com/video/1083626851?h=7df3c31175'; // URL de Vimeo o cualquier otro video

	return <VideoPlayer videoUrl={videoUrl} />;
};

export default DynamicVideoPlayer;
