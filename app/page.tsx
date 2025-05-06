'use client'

import Faq from '@/components/faq'
import ImageCompareSlider from '@/components/image-compare-slider'
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Loader2, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface RawImage {
  data: Uint8ClampedArray
  width: number
  height: number
  channels: number
}

export default function Home() {
  const [start, setStart] = useState<boolean>(false)
  const [finish, setFinish] = useState<boolean>(false)
  const [originalSrc, setOriginalSrc] = useState<string>('')
  const [modifiedSrc, setModifiedSrc] = useState<string>('')
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const worker = useRef<Worker>(null)

  function rawImageToBase64(rawImage: RawImage): string {
    const { data, width, height, channels } = rawImage

    // 创建 Canvas
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx)
      throw new Error('Failed to get canvas context')

    // 构造 ImageData
    let imageData: ImageData

    if (channels === 4) {
      imageData = new ImageData(data, width, height) // RGBA 直接使用
    }
    else {
      // 构造 RGBA（强制添加 alpha = 255）
      const rgbaData = new Uint8ClampedArray(width * height * 4)
      for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
        rgbaData[j] = data[i] // R
        rgbaData[j + 1] = data[i + 1] || 0 // G
        rgbaData[j + 2] = data[i + 2] || 0 // B
        rgbaData[j + 3] = 255 // A
      }
      imageData = new ImageData(rgbaData, width, height)
    }

    // 写入 canvas 并转为 base64
    ctx.putImageData(imageData, 0, 0)
    return canvas.toDataURL('image/png') // 或 'image/jpeg'
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./worker.js', import.meta.url), {
        type: 'module',
      })
    }

    const onMessageReceived = (e: MessageEvent) => {
      if (e.data.status === 'complete') {
        const rawImage = e.data.output[0]
        setWidth(rawImage.width)
        setHeight(rawImage.height)
        setModifiedSrc(rawImageToBase64(rawImage))
        setFinish(true)
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current?.removeEventListener('message', onMessageReceived)
  })

  const segmenter = useCallback((text: string) => {
    if (worker.current) {
      worker.current.postMessage({ text })
    }
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const base64String = reader.result as string
      setOriginalSrc(base64String)
      segmenter(base64String)
      setStart(true)
    }
    reader.readAsDataURL(file)
  }

  function handleDownload() {
    if (!modifiedSrc) {
      return
    }
    const link = document.createElement('a')
    link.href = modifiedSrc
    link.download = `image-${uuidv4()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function handleRestart() {
    setStart(false)
    setFinish(false)
    setOriginalSrc('')
    setModifiedSrc('')
  }

  return (
    <div className="flex flex-col items-center px-4">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        {!finish && (
          <div className="bg-card rounded-4xl shadow-2xl py-24 px-32">
            {!start
              && (
                <Button asChild className="rounded-full">
                  <label htmlFor="uploadImageInput">上传图片</label>
                </Button>
              )}
            { start && !finish
              && (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  请稍等...
                </Button>
              )}
            <input id="uploadImageInput" type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleInputChange} />
          </div>
        )}
        {originalSrc && modifiedSrc && (
          <div className="bg-card rounded-md shadow-2xl p-2">
            <ImageCompareSlider originalSrc={originalSrc} modifiedSrc={modifiedSrc} width={width} height={height} />
          </div>
        )}
        {modifiedSrc && (
          <div className="flex items-center justify-center gap-2">
            <Button onClick={handleDownload}>下载图片</Button>
            <Button variant="outline" size="icon" onClick={handleRestart}>
              <RotateCcw />
            </Button>
          </div>
        )}
        <div className="max-w-xl py-4">
          <Alert>
            <AlertDescription>
              <Link href="https://huggingface.co/briaai/RMBG-1.4" target="_blank">Model From RMBG-1.4</Link>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <Faq />
      </div>
    </div>
  )
}
