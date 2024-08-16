'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState } from 'react'
import { Physics } from '@react-three/rapier'

const Avatar = dynamic(() => import('@/components/canvas/models/Avatar').then((model) => model.Avatar), { ssr: false })
const Exhibition = dynamic(() => import ('@/components/canvas/models/Exhibition').then((model) => model.Exhibition), { ssr: false })
const Guard = dynamic(() => import('@/components/canvas/models/Guard').then((model) => model.Guard), { ssr: false })
const Nick = dynamic(() => import('@/helpers/components/CharacterController').then((model) => model.CharacterController), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((model) => model.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-96 w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 size-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  const [isExhibitionReady, setIsExhibitionReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExhibitionReady(true)
    }, 4000) // Simulate loading time

    return () => clearTimeout(timer)
  }, [])

  /**
          <Exhibition position={[0, -1, 0]} />
          {isExhibitionReady && <Nick/>} 
  */
  return (
    <>
      <View orbit className='relative size-full'>
        <Common/>
        <Physics debug>
          <Exhibition position={[0, -1, 0]} />
          {isExhibitionReady && <Nick/>} 
        </Physics>
      </View>
    </>
  )
}
