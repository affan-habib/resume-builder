import PersonalDetails from './components/PersonalDetails';
import SkillsSection from './components/Skills';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <h2 className="text-base font-medium text-gray-900">Resume Editor</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 pb-8 px-4">
        <div className="max-w-[21cm] mx-auto bg-white aspect-[1/1.4142] border border-gray-200">
          <div className="p-8">
            <PersonalDetails />
            <SkillsSection/>
            {/* You can add other sections like Experience, Education, Skills here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
