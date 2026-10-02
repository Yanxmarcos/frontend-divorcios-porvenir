import { useEffect, useState } from 'react'
import { ExternalLink, FileText } from 'lucide-react'

function FilePreview({ file }) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    // La URL pertenece al navegador y debe renovarse y liberarse al cambiar el archivo.
    // eslint-disable-next-line react/set-state-in-effect
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  if (!url) return null
  const isPdf = /\.pdf$/i.test(file.name)

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-neutral-900">Vista previa del archivo cargado</p>
          <p className="mt-1 break-all text-sm text-neutral-600">{file.name} · {(file.size / 1024).toFixed(1)} KB</p>
        </div>
        <a className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-primary hover:bg-primary-light focus:outline-none focus:ring-4 focus:ring-primary-light" href={url} target="_blank" rel="noopener noreferrer">
          <ExternalLink aria-hidden="true" className="h-4 w-4" />Abrir archivo
        </a>
      </div>
      {isPdf ? (
        <object aria-label={`Vista previa de ${file.name}`} className="block h-[450px] w-full sm:h-[550px]" data={url} type="application/pdf">
          <div className="p-8 text-center">
            <FileText aria-hidden="true" className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-3 text-neutral-600">Para revisar este PDF, ábralo en una nueva pestaña.</p>
            <a className="mt-3 inline-block font-bold text-primary underline" href={url} target="_blank" rel="noopener noreferrer">Abrir archivo cargado</a>
          </div>
        </object>
      ) : (
        <img alt={`Documento cargado: ${file.name}`} className="mx-auto max-h-[550px] w-full object-contain p-4" src={url} />
      )}
    </div>
  )
}

export default FilePreview
