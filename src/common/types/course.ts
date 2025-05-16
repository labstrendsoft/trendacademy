import { StaticImageData } from 'next/image';

export interface CourseMe {
	id: string;
	userId: number;
	courseId: string;
	createdAt: string;
	canceled: boolean;
	course: Course;
	progress: number;
	firstLessonId: string;
}

export interface Course {
	id: string;
	title: string;
	description: string;
	imageUrl: string | StaticImageData;
	published: boolean;
	authorName: string;
	price: string;
	moduleCount: number;
}

// Nueva interfaz sin los campos que no usarás
export type CourseCart = Omit<
	Course,
	'description' | 'published' | 'authorName' | 'moduleCount'
>;
