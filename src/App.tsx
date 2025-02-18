import './App.css';
import StartupsByState from './components/StartupsByState';
import StartupsOverTime from './components/StartupsOverTime';
import FundingByCategory from './components/FundingByCategory';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">Startups Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md flex justify-center items-center">
            <StartupsByState />
          </div>
          <div className="bg-gray-800 p-4 md:p-6 lg:col-span-2 rounded-lg shadow-md flex justify-center items-center">
            <FundingByCategory />
          </div>
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-md flex justify-center items-center lg:col-span-3">
            <StartupsOverTime />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;