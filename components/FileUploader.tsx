"use client"
import React,{useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  ownerId : string,
  accountId : string,
  className? : string
}

const FileUploader = ({ownerId, accountId, className} : FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    (acceptedFiles:File[]) => {
      //   Do something with the files
      setFiles((prev)=>[...prev,...acceptedFiles] );
      // 
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button",className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <p className="text-white">Upload</p>
      </Button>
      {
       files.length>0 && 
       <>
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">
              Uploading
          </h4>
          {files.map((file,index)=>{
            console.log(files)
            //get the file type and extension

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex item-center gap-3">
                  thumbnail
                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      alt="Loading"
                      height={26}
                      width={80}
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
       </>
      }
    </div>
  )
}

export default FileUploader;
