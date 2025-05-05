'use client'

import React, { useEffect, useRef } from 'react'

interface RawImage {
  data: Uint8ClampedArray
  width: number
  height: number
  channels: number
}

const CanvasImage: React.FC<{ image: RawImage }> = ({ image }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current)
      return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx)
      return

    const { data, width, height } = image
    const imageData = new ImageData(data, width, height)
    ctx.putImageData(imageData, 0, 0)
  }, [image])

  return <canvas ref={canvasRef} width={image.width} height={image.height} />
}

export default CanvasImage
