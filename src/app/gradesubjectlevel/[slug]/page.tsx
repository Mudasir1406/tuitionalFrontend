import { getPageData } from '@/services/grade-subject-level/grade-subject-level'
import React from 'react'
import Grade from '../page'

const Page = async ({ params }: { params: { slug: string } }) => {
  const data = await getPageData(params.slug)
  return (
    <div>
      <Grade data={data} />
    </div>
  )
}

export default Page
