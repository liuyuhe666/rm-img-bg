'use client'

import Link from 'next/link'
import { useVercount } from 'vercount-react'

export default function Footer() {
  const { sitePv, siteUv } = useVercount()
  return (
    <footer>
      <div className="container mx-auto flex flex-col items-center justify-between py-8 gap-2">
        <div>
          Made with ❤ by
          {' '}
          <Link href="https://github.com/liuyuhe666" target="_blank" className="hover:underline">LiuYuhe</Link>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          总访问量
          {' '}
          {sitePv}
          {' '}
          次
          总访客数
          {' '}
          {siteUv}
          {' '}
          人
        </div>
      </div>
    </footer>
  )
}
