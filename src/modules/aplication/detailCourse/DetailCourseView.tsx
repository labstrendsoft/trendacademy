import { Progress } from '@shadcnui/progress';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@shadcnui/accordion';
import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { CourseWithContext } from '@root/src/common/types/detailCourse';
import Link from 'next/link';
import Adorno from '@public/home/adornoCaracteristicas.png';
import Image from 'next/image';
import { getLessonProgress } from './helper/lessonProgress';
import { cn } from '@root/src/lib/utils';
import VimeoPlayer from '@root/src/common/components/custom/VimeoPlayer';
// import DynamicVideoPlayer from './components/VideoPlayerDynamic';
// import VideoPlayer from '@root/src/common/components/custom/VideoPlayer';

type CursosViewProps = {
	detalle: CourseWithContext;
};

export const DetailCourseView = ({ detalle }: CursosViewProps) => {
	const { course, modules, progress, lesson, previousLesson, nextLesson } =
		detalle;

	const { current, total } = getLessonProgress(modules, lesson.id);

	const currentModule = modules.find((module) =>
		module.lessons.some((l) => l.id === lesson.id)
	);

	return (
		<div className="max-w-[1500px] mx-auto min-h-screen py-16 text-white font-montserrat-fuente">
			<div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
				<Image
					src={Adorno}
					alt="adorno"
					className="object-cover absolute right-0 opacity-70 top-10"
				/>
				{/* Video Player Section */}
				<div className="lg:col-span-2 bg-gradient-to-r from-[#161A31] to-[#080B1A] rounded-xl overflow-hidden border border-[#161A31] relative z-10">
					<div className="relative aspect-video bg-indigo-900 w-full">
						<VimeoPlayer videoUrl={lesson.videoUrl} />
						{/* <DynamicVideoPlayer /> */}
						{/* <div className="absolute inset-0 flex items-center justify-center">
							<Button
								variant="outline"
								size="icon"
								className="rounded-full bg-white/20 backdrop-blur-sm border-white/40 hover:bg-white/30 w-16 h-16"
							>
								<Play className="h-8 w-8 text-white" fill="white" />
							</Button>
						</div> */}
					</div>

					<div className="py-6 px-8">
						<h2 className="text-white text-xl font-semibold mb-2">
							{lesson.title}
						</h2>
						<div className="flex gap-4 items-center text-gray-400 text-sm mb-6">
							<div>
								Leccion {current}/{total}
							</div>
							<div>6 minutos</div>
						</div>

						<div className="flex items-center justify-between mt-4">
							{previousLesson && (
								<Link
									href={`/curso/${course.id}/clase/${previousLesson}`}
									className="text-gray-400 hover:text-white flex items-center text-sm "
								>
									<ArrowLeft className="mr-2 size-5 p-0.5 bg-[#636378] rounded-full text-[#161A31]" />
									Anterior
								</Link>
							)}
							{nextLesson && (
								<Link
									href={`/curso/${course.id}/clase/${nextLesson}`}
									className={cn(
										'text-gray-400 hover:text-white flex items-center text-sm',
										!previousLesson && 'ml-auto'
									)}
								>
									Siguiente
									<ArrowRight className="ml-2 size-5 p-0.5 bg-[#636378] rounded-full text-[#080B1A]" />
								</Link>
							)}
						</div>
					</div>
				</div>

				{/* Course Sidebar */}
				<div className="relative z-10">
					<div className="bg-[#111122] rounded-xl overflow-hidden border border-[#161A31]">
						<div className="bg-gradient-to-r from-[#161A31] to-[#080B1A] py-10 px-8">
							<h2 className="text-white text-xl font-semibold text-center mb-4">
								{course.title}
							</h2>
							<div className="flex items-center gap-4">
								<Progress
									value={progress}
									className="h-0.5  bg-[#DEDEDE] [&_[data-slot=progress-indicator]]:bg-[#50C046]"
								/>
								<span className="text-gray-400 text-sm">{progress}%</span>
							</div>
						</div>

						{/* Module List */}
						<Accordion
							type="single"
							collapsible
							defaultValue={`module-${currentModule?.id}`}
							className="bg-black"
						>
							{modules.map((module) => (
								<AccordionItem
									key={module.id}
									value={`module-${module.id}`}
									className=" border-gray-900"
								>
									<AccordionTrigger className="py-6 px-8 hover:no-underline text-white font-medium cursor-pointer  rounded-none ">
										<div className="flex flex-col gap-2">
											{module.title}
											<p className="text-gray-400 text-xs">
												{module.lessons.length} Lecciones{' '}
											</p>
										</div>
									</AccordionTrigger>
									<AccordionContent className=" bg-[#1C1C1C] pb-0">
										{/* Lesson items */}
										{module.lessons.map((lessonItem) => {
											const isActive = lessonItem.id === lesson.id;

											return (
												<Link
													href={lessonItem.id}
													key={lessonItem.id}
													className={cn(
														'px-8 py-6 flex justify-between items-center border-gray-700 border-b last:border-b-0 hover:bg-gray-800',
														isActive && 'bg-gray-800' // o el color que prefieras
													)}
												>
													<p className="text-white text-xs">
														{lessonItem.title}
													</p>
													<div className="flex items-center gap-2">
														<span className="text-gray-400 text-xs">6 min</span>
														{lessonItem.order === 1 ? (
															<CheckCircle className="h-4 w-4 text-green-500" />
														) : (
															<div className="h-4 w-4 rounded-full border border-gray-500"></div>
														)}
													</div>
												</Link>
											);
										})}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</div>
		</div>
	);
};
