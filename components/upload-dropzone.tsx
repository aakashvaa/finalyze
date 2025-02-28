'use client'

import { useTransactions } from '@/hooks/store'
import { Loader2, Upload } from 'lucide-react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'

interface UploadDropzoneProps {
  onDrop: (files: File[]) => void
  loading: boolean
}

export function UploadDropzone({ onDrop, loading }: UploadDropzoneProps) {
  const { data } = useTransactions()
  const { transactions } = data
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    disabled: loading, // Disable dropzone when loading
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed  w-full flex justify-center items-center rounded-lg p-5 text-center cursor-pointer transition-colors bg-black/[0.4] backdrop-blur-md',
        loading
          ? 'border-black/[0.1] cursor-not-allowed'
          : isDragActive
          ? 'border-primary bg-black/[0.1]'
          : 'border-black/[0.1]',
        transactions.length ? 'h-fit' : 'h-96'
      )}
    >
      <input {...getInputProps()} disabled={loading} />
      <div
        className={cn(
          'w-full flex flex-col select-none justify-center items-center gap-2'
        )}
      >
        {loading ? (
          <Loader2 className={cn('h-4 w-4 animate-spin')} />
        ) : (
          <>
            {!loading && transactions.length ? (
              <Image
                className={cn(loading ? 'text-gray-300' : 'text-gray-400')}
                src="XpenseLogo.svg"
                alt="logo"
                width={35}
                height={35}
              />
            ) : (
              <Upload
                size={35}
                className={cn(
                  'w-full',
                  loading ? 'text-white/[0.2] ' : 'text-white/[0.4]'
                )}
              />
            )}
            {transactions.length === 0 && (
              <>
                <div className={cn('text-lg font-medium')}>
                  {loading ? (
                    'Uploading, please wait...'
                  ) : isDragActive ? (
                    'Drop the PDF here'
                  ) : (
                    <p>
                      Drag & drop a{' '}
                      <span className="text-emerald-400 tracking-wider underline decoration-1 underline-offset-8 underline-thickness-1">
                        Bank Statement PDF
                      </span>{' '}
                      file here, or click to select{' '}
                    </p>
                  )}
                </div>
                <p className={cn('text-sm text-white/[0.7]')}>
                  {loading ? '' : 'Only PDF files are supported'}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
