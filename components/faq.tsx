import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

export default function Faq() {
  return (
    <div className="flex flex-col items-center gap-2 container mx-auto py-4 max-w-5xl">
      <h2 className="text-4xl font-bold">常见问题</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold">为什么第一次处理图片会很慢？</AccordionTrigger>
          <AccordionContent>
            第一次使用时，浏览器需要下载 AI 模型，后续处理会变快。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-bold">图片会上传到服务器吗？</AccordionTrigger>
          <AccordionContent>
            图片不会上传到服务器，所有处理均在浏览器完成，无需担心隐私信息泄露。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-bold">支持的图片格式</AccordionTrigger>
          <AccordionContent>
            image/png, image/jpeg
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-bold">更多问题 ...</AccordionTrigger>
          <AccordionContent>
            <Link href="https://github.com/liuyuhe666/rm-img-bg/issues" target="_blank">https://github.com/liuyuhe666/rm-img-bg/issues</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
