"use client"
import React,{useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MAX_FILE_SIZE } from '@/constants';
import { toast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/actions/file.action';
import { usePathname } from 'next/navigation';
import { getFileType } from '@/lib/utils';
import { convertFileToUrl } from '@/lib/utils';
import Thumbnail from './Thumbnail';

interface FileUploaderProps {
  ownerId : string,
  accountId : string,
  className? : string
}

const FileUploader = ({ownerId, accountId, className} : FileUploaderProps) => {
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  
  const onDrop = useCallback(
    async (acceptedFiles:File[]) => {
      //   Do something with the files
      setFiles(acceptedFiles);
      
      const uploadPromises = acceptedFiles.map(async(file)=>{
        if(file.size > MAX_FILE_SIZE){
          setFiles( prevFiles => prevFiles.filter( f => f.name !== file.name))
          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 50MB.
              </p>
            ),
            className: "error-toast",
          })
        }

        return uploadFile({file, ownerId, accountId, path}).then(
          uploadedFile => {
            if(uploadedFile) setFiles( prevFiles => prevFiles.filter( f => f.name !== file.name));  
          }
        )
      })
  },[ownerId, accountId, path])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

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
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex item-center gap-3">
                <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
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
                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
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
