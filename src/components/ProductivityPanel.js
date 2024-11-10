import React, { useState, useEffect } from 'react';
import { Timer, Clock, AlarmClock, Clipboard, X } from 'lucide-react';

const ProductivityPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('timer');
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState('');
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isStopwatchRunning, time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setStopwatchTime(0);
    setIsStopwatchRunning(false);
  };

  return (
    <>
      {/* Productivity Panel Toggle Button */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed left-6 top-6 z-20 p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all duration-300"
      >
        <Clock size={24} />
      </button>

      {/* Productivity Panel */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-black bg-opacity-70 backdrop-filter backdrop-blur-lg z-20 transform transition-transform duration-300 ease-in-out ${
          isPanelOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsPanelOpen(false)} 
          className="absolute top-4 right-4 focus:outline-none hover:text-teal-500 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        {/* Panel Header */}
        <div className="p-4 border-b border-gray-700 mt-12"> {/* Added mt-12 to account for close button */}
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('timer')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'timer' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Timer size={20} />
              <span>Timer</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'notes' ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Clipboard size={20} />
              <span>Notes</span>
            </button>
          </div>
        </div>

        {/* Panel Content */}
        <div className="p-4">
          {activeTab === 'timer' && (
            <div className="space-y-6">
              {/* Timer */}
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Pomodoro Timer</h3>
                <div className="text-4xl font-bold text-center mb-4">
                  {formatTime(time)}
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    {isRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Stopwatch */}
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Stopwatch</h3>
                <div className="text-4xl font-bold text-center mb-4">
                  {formatTime(stopwatchTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
                    className="px-4 py-2 bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    {isStopwatchRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={resetStopwatch}
                    className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Quick Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-64 bg-gray-700 bg-opacity-50 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Write your notes here..."
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductivityPanel;