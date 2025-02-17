import './App.css';
import StartupsByState from './components/StartupsByState';
import StartupsOverTime from './components/StartupsOverTime';
import FundingByCategory from './components/FundingByCategory';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Startups Dashboard</h1>
        <div className="grid grid-cols-2 grid-rows-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-1 flex justify-center items-center">
            <StartupsByState />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-1 flex justify-center items-center">
            <FundingByCategory />
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-2 flex justify-center items-center mr-12 ml-12">
            <StartupsOverTime />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;