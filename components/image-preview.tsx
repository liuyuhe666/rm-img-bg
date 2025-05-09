'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'

export default function ImagePreview(props: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) {
  const image = useRef<HTMLImageElement>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    image.current?.complete && setLoading(false)
  }, [])
  return (
    <>
      <div style={{ display: loading ? 'block' : 'none' }} className="p-4">
        <Button disabled>
          <Loader2 className="animate-spin" />
          Please wait...
        </Button>
      </div>
      <div style={{ display: loading ? 'none' : 'block' }}>
        <img ref={image} {...props} onLoad={() => setLoading(false)} />
      </div>
    </>
  )
}
