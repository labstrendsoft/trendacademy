export type Lesson = {
	id: string;
	title: string;
	content: string;
	videoUrl: string;
	order: number;
	moduleId?: string; // Solo aparece dentro de modules
};

export type Module = {
	id: string;
	title: string;
	order: number;
	courseId?: string; // Solo aparece dentro de modules
	lessons: Lesson[];
};

export type CourseSimilar = {
	id: string;
	title: string;
	description: string;
	imageUrl: string | null;
	authorName: string;
};

export type CourseWithContext = {
	lesson: Omit<Lesson, 'moduleId'>; // no necesitas moduleId aquí
	module: Omit<Module, 'courseId' | 'lessons'>; // ya están por separado
	course: CourseSimilar;
	modules: Module[];
	progress: number; // porcentaje del curso completado
	previousLesson: string;
	nextLesson: string;
};
