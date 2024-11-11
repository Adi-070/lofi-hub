import React, { useState, useEffect } from 'react';
import { Timer, Clipboard, X } from 'lucide-react';

const ProductivityPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('timers');
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [wasPaused, setWasPaused] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [wasStopwatchPaused, setWasStopwatchPaused] = useState(false);
  const [notes, setNotes] = useState('');

  // Timer and Stopwatch useEffect
  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    }
    if (isStopwatchRunning) {
      interval = setInterval(() => setStopwatchTime((prevTime) => prevTime + 1), 1000);
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
    setWasPaused(false);
  };

  const resetStopwatch = () => {
    setStopwatchTime(0);
    setIsStopwatchRunning(false);
    setWasStopwatchPaused(false);
  };

  const handleTimerToggle = () => {
    if (isRunning) {
      setIsRunning(false);
      setWasPaused(true);
    } else {
      setIsRunning(true);
      setWasPaused(false);
    }
  };

  const handleStopwatchToggle = () => {
    if (isStopwatchRunning) {
      setIsStopwatchRunning(false);
      setWasStopwatchPaused(true);
    } else {
      setIsStopwatchRunning(true);
      setWasStopwatchPaused(false);
    }
  };

  return (
    <>
      {/* Panel Toggle Button */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="fixed left-6 top-6 z-20 p-3 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 shadow-lg transition-all duration-300"
      >
        <Timer size={24} />
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
          className="absolute top-4 right-4 text-gray-300 hover:text-teal-500 transition-colors duration-200 focus:outline-none"
        >
          <X size={24} />
        </button>

        {/* Panel Header */}
        <div className="p-4 border-b border-gray-700 mt-12">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('timers')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'timers' ? 'bg-teal-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Timer size={20} />
              <span>Timers</span>
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                activeTab === 'notes' ? 'bg-teal-500 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Clipboard size={20} />
              <span>Notes</span>
            </button>
          </div>
        </div>

        {/* Panel Content */}
        <div className="p-4">
          {activeTab === 'timers' && (
            <div className="space-y-6">
              {/* Pomodoro Timer */}
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4">Pomodoro Timer</h3>
                <div className="text-4xl font-bold text-center mb-4">{formatTime(time)}</div>
                <div className="flex justify-center space-x-4">
                  <button onClick={handleTimerToggle} className="px-4 py-2 bg-teal-500 rounded-lg">
                    {isRunning ? 'Pause' : wasPaused ? 'Resume' : 'Start'}
                  </button>
                  <button onClick={resetTimer} className="px-4 py-2 bg-gray-600 rounded-lg">
                    Reset
                  </button>
                </div>
              </div>

              {/* Stopwatch */}
              <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4">Stopwatch</h3>
                <div className="text-4xl font-bold text-center mb-4">{formatTime(stopwatchTime)}</div>
                <div className="flex justify-center space-x-4">
                  <button onClick={handleStopwatchToggle} className="px-4 py-2 bg-teal-500 rounded-lg">
                    {isStopwatchRunning ? 'Pause' : wasStopwatchPaused ? 'Resume' : 'Start'}
                  </button>
                  <button onClick={resetStopwatch} className="px-4 py-2 bg-gray-600 rounded-lg">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4">Quick Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-64 bg-gray-700 rounded-lg p-3 text-white"
                placeholder="Jot down your thoughts here..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Floating Widget */}
      {!isPanelOpen && (isRunning || isStopwatchRunning) && (
        <div
          className="fixed bottom-20 left-10 z-30 flex items-center bg-black bg-opacity-80 p-4 rounded-lg shadow-lg cursor-pointer"
          onClick={() => setIsPanelOpen(true)}
        >
          <Timer size={24} className="text-teal-500 mr-2" />
          <span className="text-white text-lg font-semibold">
            {isRunning ? formatTime(time) : formatTime(stopwatchTime)}
          </span>
        </div>
      )}
    </>
  );
};

export default ProductivityPanel;