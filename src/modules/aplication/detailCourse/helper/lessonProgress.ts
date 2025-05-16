// helpers/lessonProgress.ts

type Lesson = {
	id: string;
	order: number;
};

type Module = {
	order: number;
	lessons: Lesson[];
};

export function getLessonProgress(
	modules: Module[],
	currentLessonId: string
): {
	current: number;
	total: number;
} {
	const allLessons = modules
		.sort((a, b) => a.order - b.order)
		.flatMap((module) => module.lessons.sort((a, b) => a.order - b.order));

	const currentIndex = allLessons.findIndex(
		(lesson) => lesson.id === currentLessonId
	);

	return {
		current: currentIndex + 1,
		total: allLessons.length,
	};
}
