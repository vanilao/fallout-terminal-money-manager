import Terminal from './components/Terminal';

function App() {
  const handleCommand = (command: string) => {
    console.log('Command executed:', command);
    // Command handling will be implemented in the command parser
  };

  return (
    <div className="w-full h-screen bg-gray-900">
      <Terminal onCommand={handleCommand} />
    </div>
  );
}

export default App
