import {useState} from 'react'
import { pdfjs,Document, Page, } from "react-pdf";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Reader = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-4">
      <Document file="/books/TITLE_Quiet_Hearts.pdf">
        <Page pageNumber={page} />
      </Document>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>

  )
}

export default Reader
