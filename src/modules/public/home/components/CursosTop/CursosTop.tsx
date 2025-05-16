import ButtonAcademy from '@/common/components/custom/ButtonAcademy';
// import CourseCard from '@/common/components/custom/CardCurso';
// import Curso1 from '@public/curso1.png';
// import Curso2 from '@public/curso2.png';
// import Curso3 from '@public/curso3.png';
export default function CursosTop() {
	return (
		<div className="text-white">
			<h2 className="text-xl font-bold text-white text-center mb-12">
				Conoce nuestros cursos top
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-10  mx-auto">
				{/* <CourseCard
					title="Marketing para salones de belleza"
					imageAlt="Marketing digital"
					imageSrc={Curso1}
					modules="4 módulos"
					originalPrice="1999.00"
					discountedPrice="50"
				/>

				<CourseCard
					title="Fotografía profesional para SALONES con celular"
					imageAlt="Fotografía profesional"
					imageSrc={Curso2}
					trendDescription="Fotografía y video para salones con celular"
					modules="3 módulos"
					originalPrice="1999.00"
					discountedPrice="50"
				/>

				<CourseCard
					title="Aprende a editar con CAP CUT PRO"
					imageAlt="CapCut Pro"
					imageSrc={Curso3}
					trendDescription="Aprender a editar con cap cut para salones"
					modules="3 módulos"
					originalPrice="1999.00"
					discountedPrice="50"
				/> */}
			</div>

			<div className="text-center mt-8">
				<ButtonAcademy
					href="/"
					variant="filled"
					className="bg-trendacademy-azul hover:bg-[#003366] py-2.5"
				>
					Ver todos los cursos
				</ButtonAcademy>
			</div>
		</div>
	);
}
