'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import ImagePreview from './image-preview'

interface Item {
  before: string
  after: string
}

interface DemoItem {
  name: string
  children: Item[]
}

const data: DemoItem[] = [
  {
    name: 'People',
    children: [
      {
        before: '/images/people.jpg',
        after: '/images/people.png',
      },
    ],
  },
  {
    name: 'Animals',
    children: [
      {
        before: '/images/bear.jpg',
        after: '/images/bear.png',
      },
    ],
  },
  {
    name: 'Cars',
    children: [
      {
        before: '/images/car.jpg',
        after: '/images/car.png',
      },
    ],
  },
]

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-2 container mx-auto py-4 max-w-5xl">
      <h2 className="text-4xl font-bold py-2">示例</h2>
      <Tabs defaultValue={data[0].name}>
        <TabsList className="grid w-full grid-cols-3">
          {
            data.map((item) => { return (<TabsTrigger value={item.name} key={item.name}>{item.name}</TabsTrigger>) })
          }
        </TabsList>
        {
          data.map((item1) => {
            return (
              <TabsContent value={item1.name} key={item1.name}>
                {
                  item1.children.map((item2) => {
                    return (
                      <div key={`${item1}-${item2.before}-${item2.after}`} className="bg-card rounded-4xl shadow-2xl p-4 flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-col items-center justify-between gap-2">
                          <ImagePreview src={item2.before} alt={item2.before} />
                          <span className="text-sm text-gray-500 dark:text-gray-200">Original</span>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-2">
                          <ImagePreview src={item2.after} alt={item2.after} />
                          <span className="text-sm text-gray-500 dark:text-gray-200">Transparent background</span>
                        </div>
                      </div>
                    )
                  })
                }
              </TabsContent>
            )
          })
        }
      </Tabs>
    </div>
  )
}
