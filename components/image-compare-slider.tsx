import React, { useState } from 'react'

interface ImageCompareSliderProps {
  originalSrc: string
  modifiedSrc: string
  width: number
  height: number
}

function ImageCompareSlider({ originalSrc, modifiedSrc, width, height }: ImageCompareSliderProps) {
  const [sliderValue, setSliderValue] = useState(50)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSliderValue(Number(e.target.value))
  }

  const clipPathValue = `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`

  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
      }}
    >
      {/* 去背景图 */}
      <img
        src={modifiedSrc}
        alt="Modified"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* 原图 */}
      <img
        src={originalSrc}
        alt="Original"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          clipPath: clipPathValue,
          transition: 'clip-path 0.1s ease',
        }}
      />

      {/* 滑块 */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          zIndex: 10,
        }}
      />
    </div>
  )
}

export default ImageCompareSlider
