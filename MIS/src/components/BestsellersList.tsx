import { useRef, useState, useEffect, Key } from "react";

const BestsellersList = () => {

  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 because of clones
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false); // Prevent double actions
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPosition, setStartPosition] = useState<number>(0);
  const sliderRef = useRef<null>(null);
  const autoSwipeInterval = useRef<any>(null);
  const [dbdata, setDbdata] = useState<string[]>([]);
  const totalSlides = dbdata.length;


  const bestsellers: string[] = [
    './../public/mock_images/1.jpg',
    './../public/mock_images/2.jpg',
    './../public/mock_images/3.jpg',
    './../public/mock_images/4.jpg',
    './../public/mock_images/5.jpg',
    './../public/mock_images/6.jpg',
    './../public/mock_images/7.jpg',
    './../public/mock_images/8.jpg',
    './../public/mock_images/9.jpg',
    './../public/mock_images/10.jpg',
    './../public/mock_images/11.jpg',
    './../public/mock_images/12.jpg'
  ];

  const trends: string[] = [
    './../public/mock_images/1 - kopia.jpg',
    './../public/mock_images/2 - kopia.jpg',
    './../public/mock_images/3 - kopia.jpg',
    './../public/mock_images/4 - kopia.jpg',
    './../public/mock_images/5 - kopia.jpg',
    './../public/mock_images/6 - kopia.jpg',
    './../public/mock_images/7 - kopia.jpg',
    './../public/mock_images/8 - kopia.jpg',
    './../public/mock_images/9 - kopia.jpg',
    './../public/mock_images/10 - kopia.jpg',
    './../public/mock_images/11 - kopia.jpg',
    './../public/mock_images/12 - kopia.jpg'
  ];

  const trendSetter = () => {
    setDbdata(trends);
  };

  const bestsellerSetter = () => {
    setDbdata(bestsellers);
  };


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
    const slider: any = sliderRef.current;

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
    <div className="bestsellers_list" onMouseDown={(e) => { handleDragStart(e); e.preventDefault(); }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd} onTouchMove={(e) => e.preventDefault()}>
      <h1>BESTSELLERS</h1>
      <div className="bestsellers_switch">
        <div onClick={trendSetter}>Trends</div>
        <div onClick={bestsellerSetter}>Bestsellers</div>
      </div>
      <button className="slider_button" onClick={handlePrev}><span className="text">&#10094;</span></button>
      <div
        className="bs-slider"
        ref={sliderRef}
        style={{
          transform: `translateX(-${currentIndex * 32}%)`,
          transition: `transform 0.3s ease-in-out`
        }}
      >
        {dbdata.map((slide: string | undefined, index: Key | null | undefined) => (
          <div className="bs-slide" key={index}>
            <img src={slide} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="slider_button" onClick={handleNext}><span className="text">&#10095;</span></button>
    </div>
  );
};

export default BestsellersList
