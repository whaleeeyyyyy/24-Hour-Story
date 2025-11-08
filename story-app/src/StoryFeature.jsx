import React, { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";

const StoryFeature = () => {
  const [stories, setStories] = useState([]);
  const [viewingStory, setViewingStory] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const viewerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const progressInterval = useRef(null);

  useEffect(() => {
    loadStories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      cleanExpiredStories();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (viewingStory !== null) {
      setProgress(0);
      startProgress();
    } else {
      stopProgress();
    }
    return () => stopProgress();
  }, [viewingStory, currentStoryIndex]);

  const loadStories = () => {
    const stored = localStorage.getItem("stories");
    if (stored) {
      const parsed = JSON.parse(stored);
      const valid = parsed.filter((story) => !isExpired(story.timestamp));
      setStories(valid);
      if (valid.length !== parsed.length) {
        localStorage.setItem("stories", JSON.stringify(valid));
      }
    }
  };

  const cleanExpiredStories = () => {
    const stored = localStorage.getItem("stories");
    if (stored) {
      const parsed = JSON.parse(stored);
      const valid = parsed.filter((story) => !isExpired(story.timestamp));
      if (valid.length !== parsed.length) {
        setStories(valid);
        localStorage.setItem("stories", JSON.stringify(valid));
      }
    }
  };

  const isExpired = (timestamp) => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return now - timestamp > twentyFourHours;
  };

  const startProgress = () => {
    stopProgress();
    const duration = 3000;
    const interval = 30;
    let elapsed = 0;

    progressInterval.current = setInterval(() => {
      elapsed += interval;
      const newProgress = (elapsed / duration) * 100;
      setProgress(newProgress);

      if (elapsed >= duration) {
        handleNextStory();
      }
    }, interval);
  };

  const stopProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);

    if (!file) {
      console.log("No file selected");
      return;
    }

    if (!file.type.startsWith("image/")) {
      console.log("File is not an image");
      alert("Please select an image file");
      return;
    }

    try {
      console.log("Resizing image...");
      const resizedBase64 = await resizeImage(file, 1080, 1920);
      const newStory = {
        id: Date.now(),
        image: resizedBase64,
        timestamp: Date.now(),
      };

      const updatedStories = [...stories, newStory];
      setStories(updatedStories);
      localStorage.setItem("stories", JSON.stringify(updatedStories));
      console.log("Story added successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Check console for details.");
    }
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.9));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const openStoryViewer = (index) => {
    console.log("Opening story viewer, index:", index);
    setViewingStory(stories);
    setCurrentStoryIndex(index);
  };

  const closeStoryViewer = () => {
    setViewingStory(null);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      closeStoryViewer();
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleNextStory();
      } else {
        handlePreviousStory();
      }
    }
  };

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const hours = Math.floor(seconds / 3600);
    if (hours > 0) return `${hours}h ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Stories</h1>

        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          <div className="flex flex-col items-center flex-shrink-0">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <Plus className="w-6 h-6 text-gray-600" />
            </button>
            <span className="text-xs mt-2 text-gray-600">Add Story</span>
          </div>

          {stories.map((story, index) => (
            <div
              key={story.id}
              className="flex flex-col items-center flex-shrink-0"
            >
              <button
                onClick={() => openStoryViewer(index)}
                className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:opacity-80 transition-opacity flex-shrink-0"
              >
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
                  <img
                    src={story.image}
                    alt={`Story ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>
              <span className="text-xs mt-2 text-gray-600 max-w-[64px] text-center truncate">
                {getTimeAgo(story.timestamp)}
              </span>
            </div>
          ))}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {stories.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 mb-4">No stories yet</p>
            <p className="text-sm text-gray-400">
              Click the + button to add your first story
            </p>
          </div>
        )}
      </div>

      {viewingStory !== null && (
        <div
          ref={viewerRef}
          className="fixed inset-0 bg-black flex items-center justify-center"
          style={{ zIndex: 9999 }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
            {stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{
                    width:
                      index < currentStoryIndex
                        ? "100%"
                        : index === currentStoryIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={closeStoryViewer}
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full max-w-md flex items-center justify-center">
            <img
              src={stories[currentStoryIndex]?.image}
              alt="Story"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="absolute inset-0 flex">
            <div
              className="w-1/3 h-full cursor-pointer"
              onClick={handlePreviousStory}
            />
            <div
              className="w-1/3 h-full cursor-pointer"
              onClick={closeStoryViewer}
            />
            <div
              className="w-1/3 h-full cursor-pointer"
              onClick={handleNextStory}
            />
          </div>

          <div className="absolute top-16 left-4 text-white text-sm z-10">
            {getTimeAgo(stories[currentStoryIndex]?.timestamp)}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryFeature;
