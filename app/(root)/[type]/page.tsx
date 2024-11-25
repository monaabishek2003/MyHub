import Card from '@/components/Card';
import { getFiles } from '@/lib/actions/file.action'
import { Models } from 'node-appwrite';
import React from 'react'

const page = async ({params} : SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const files = await getFiles();
  

  return (
    <div className='page-container'>
      <section className='w-full'>
        <h1 className='h1 capitalize'>
          {type}
        </h1>
        <div className="total-size-section">
          <p className='body-1'>
            Total:<span className="h5">0 MB</span>
          </p>
          <div className='sort-container'>
            <p className="body-1 hidden text-light-200 sm:block">
              SORT
            </p>
          </div>
        </div>
      </section>
      {files.total > 0 ?
          files.documents.map((file : Models.Document)=><Card/>)
        : <p>No Files Uploaded</p>
      }
    </div>
  )
}

export default page