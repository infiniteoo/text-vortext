import TextCircles from './TextCircles'
import NoSSR from './NoSSR'
import dynamic from 'next/dynamic'

const TextHurricane = dynamic(() => import('./TextCircles.jsx'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <>
      <TextHurricane />
    </>
  )
}
