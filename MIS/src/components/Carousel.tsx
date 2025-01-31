import React, { useRef, useState, useEffect } from "react";
import { collection, QueryDocumentSnapshot, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const Carousel: React.FC = () => {

  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 because of clones
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false); // Prevent double actions
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<number>(0);
  const sliderRef = useRef<null>(null);
  const autoSwipeInterval = useRef<any>(null);
  const [dbdata, setDbdata] = useState<any>([]);
  const totalSlides = dbdata.length;

  const firebaseConfig = {
    apiKey: "AIzaSyC2lYNp66IAWL-Yjzpr9WIRUuiNqMbsuJo",
    authDomain: "mis-carousel-elements.firebaseapp.com",
    projectId: "mis-carousel-elements",
    storageBucket: "mis-carousel-elements.firebasestorage.app",
    messagingSenderId: "719513831136",
    appId: "1:719513831136:web:d26d7afb6de73d56c37285",
    measurementId: "G-27YFNYFVH6"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const carouselURLsDb = getFirestore(app);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(carouselURLsDb, 'CarouselURLs'));
        const initArray: Record<string, any>[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          console.log(doc.id, ' => ', doc.data());
          const docObject = doc.data();
          initArray.push(...Object.values(docObject));
          console.log(initArray);
        });
        setDbdata(initArray); 
      } catch (error) {
        console.error("Error fetching Firestore data: ", error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, [setDbdata]); // Empty dependency array, runs only once after component mounts

  // Create clones for seamless looping
  const extendedSlides = [
    dbdata[dbdata.length - 1], // Clone last slide at the beginning
    ...dbdata,
    dbdata[0], // Clone first slide at the end
    dbdata[1],
    dbdata[2],
    dbdata[3]
  ];

  const handleNext = () => {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const slider: any = sliderRef.current;

    const teleport = () => {
      if (currentIndex === 0) {
        // Move from clone of last slide to real last slide
        slider.style.transition = "none";
        setCurrentIndex(totalSlides);
      } else if (currentIndex === totalSlides + 1) {
        // Move from clone of first slide to real first slide
        slider.style.transition = "none";
        setCurrentIndex(1);
      }

      setTimeout(() => {
        // Re-enable transition for the next move
        slider.style.transition = "transform 0.5s ease-in-out";
        setIsTransitioning(false); // Allow future interactions
      }, 0);
    };

    // Trigger teleport after the transition completes
    const handleTransitionEnd = () => {
      teleport();
      setIsTransitioning(false); // Allow further interactions
    };

    // Add event listener
    slider.addEventListener("transitionend", handleTransitionEnd);

    // Clean up listener
    return () => {
      slider.removeEventListener("transitionend", handleTransitionEnd);
    };

  }, [currentIndex, totalSlides]);

  // Re-enable transition after teleport
  useEffect(() => {
    const slider: any = sliderRef.current;
    if (slider.style.transition === "none") {
      // Force reflow to apply transition
      slider.offsetHeight; // Trigger reflow
      slider.style.transition = "transform 0.5s ease-in-out";
    }
  }, [currentIndex, totalSlides]);


  const handleDragStart = (e: any) => {
    setStartPosition(e.clientX);
    setIsDragging(true);
  };

  const handleDragMove = (e: any) => {
    if (!isDragging) return;
    const delta = e.clientX - startPosition;
    const direction = delta > 0 ? "right" : "left";

    if (direction === "left") handleNext();
    if (direction === "right") handlePrev();

    setIsDragging(false); // Reset drag state after one action
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Auto-swipe logic
  useEffect(() => {
    const slider:any = sliderRef.current;

    const startAutoSwipe = () => {
      autoSwipeInterval.current = setInterval(() => {
        handleNext();
      }, 3000); // 3 seconds
    };

    const stopAutoSwipe = () => {
      if (autoSwipeInterval.current) {
        clearInterval(autoSwipeInterval.current);
        autoSwipeInterval.current = null;
      }
    };

    // Start auto-swipe
    startAutoSwipe();

    // Stop auto-swipe on user interaction
    const interactionHandler = () => stopAutoSwipe();

    slider.addEventListener("mousedown", interactionHandler); // Mouse interaction
    slider.addEventListener("touchstart", interactionHandler); // Touch interaction

    return () => {
      stopAutoSwipe();
      slider.removeEventListener("mousedown", interactionHandler);
      slider.removeEventListener("touchstart", interactionHandler);
    };
  }, [handleNext]);

  return (
    <div className="carousel" onMouseDown={(e) => { handleDragStart(e); e.preventDefault(); }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd} onTouchMove={(e) => e.preventDefault()}>
      <button className="slider_button" onClick={handlePrev}><span className="text">&#10094;</span></button>
      <div
        className="carousel-slider"
        ref={sliderRef}
        style={{
          transform: `translateX(-${currentIndex * 32}%)`,
          transition: `transform 0.3s ease-in-out`
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div className="carousel-slide" key={index}>
            <img src={slide} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="slider_button" onClick={handleNext}><span className="text">&#10095;</span></button>
    </div>
  );
};

export default Carousel;

