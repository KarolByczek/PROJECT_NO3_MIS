import { useRef, useState, useEffect } from "react";

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
    './mock_images/1.jpg',
    './mock_images/2.jpg',
    './mock_images/3.jpg',
    './mock_images/4.jpg',
    './mock_images/5.jpg',
    './mock_images/6.jpg',
    './mock_images/7.jpg',
    './mock_images/8.jpg',
    './mock_images/9.jpg',
    './mock_images/10.jpg',
    './mock_images/11.jpg',
    './mock_images/12.jpg'
  ];

  const trends: string[] = [
    './mock_images/1 - kopia.jpg',
    './mock_images/2 - kopia.jpg',
    './mock_images/3 - kopia.jpg',
    './mock_images/4 - kopia.jpg',
    './mock_images/5 - kopia.jpg',
    './mock_images/6 - kopia.jpg',
    './mock_images/7 - kopia.jpg',
    './mock_images/8 - kopia.jpg',
    './mock_images/9 - kopia.jpg',
    './mock_images/10 - kopia.jpg',
    './mock_images/11 - kopia.jpg',
    './mock_images/12 - kopia.jpg'
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


  return (
    <div className="bestsellers_list" onMouseDown={(e) => { handleDragStart(e); e.preventDefault(); }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd} onTouchMove={(e) => e.preventDefault()}>
      <h1>BESTSELLERS</h1>
      <div className="bestsellers_switch">
        <button onClick={trendSetter}>Trends</button>
        <button onClick={bestsellerSetter}>Bestsellers</button>
      </div>
      <div className="slider_section">
        <button className="slider_button" onClick={handlePrev}><span className="text">&#10094;</span></button>
        <div
          className="bs_slider"
          ref={sliderRef}
          style={{
            transform: `translateX(-${currentIndex * 32}%)`,
            transition: `transform 0.3s ease-in-out`
          }}
        >
          {dbdata.map((slide: string, index: number) => (
            <div className="bs_slide" key={index}>
              <img src={slide} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
        <button className="slider_button" onClick={handleNext}><span className="text">&#10095;</span></button>
      </div>
    </div>
  );
};

export default BestsellersList
