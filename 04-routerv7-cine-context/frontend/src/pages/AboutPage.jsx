import { AcademicCapIcon, CodeBracketIcon, DevicePhoneMobileIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-sky-800 mb-6">Sobre Mí</h1>
        <p className="text-gray-700 text-lg mb-8">
          ¡Hola! Soy <span className="font-semibold italic text-2xl">David Gómez Bravo</span>, estoy en proceso de convertirme en un desarrollador web con experiencia en
          tecnologías como React, Tailwind CSS y Node.js entre otras.
        </p>
        <div className="flex justify-center space-x-6">
          <div className="flex flex-col items-center text-gray-700">
            <AcademicCapIcon className="h-10 w-10 text-blue-600" />
            <p className="mt-2 text-sm">Educación</p>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <CodeBracketIcon className="h-10 w-10 text-blue-600" />
            <p className="mt-2 text-sm">Desarrollo</p>
          </div>
          <div className="flex flex-col items-center text-gray-700">
            <EnvelopeIcon className="h-10 w-10 text-blue-600" />
            <p className="mt-2 text-sm">Email</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
