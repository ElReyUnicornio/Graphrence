import { Label, FileInput } from "flowbite-react";
import { useState } from "react";

export default function FileZone() {
    const [files, setFiles] = useState<File[] | null>(null);
    const [dragging, setDragging] = useState(false);

    const dropZOneStyles = "flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600";
    const fileStyles = "flex h-64 w-full flex-col";
    const styles = files ? fileStyles : dropZOneStyles;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesArr = e.target.files;

        if (filesArr) {
            setFiles(prev => {
                if (prev) {
                    console.log(filesArr);
                    const newValue = [...prev, ...Array.from(filesArr)];
                    return newValue;
                } else {
                    return Array.from(filesArr);
                }
            });
        }

        setDragging(false);
    }

    return (
        <div className="flex w-full items-center relative justify-center">
            <Label
                htmlFor="dropzone-file"
                className={styles}>
                {files ? (
                    <div onDragOver={() => setDragging(true)}
                        onDragLeave={() => setTimeout(() => setDragging(false), 300)}
                        className="flex flex-col m-4 h-full relative overflow-y-scroll">
                        {Array.from(files).map((file, index) => (
                            <p key={index} className="flex text-sm p-2 text-gray-500 rounded-md hover:bg-gray-100 dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clipRule="evenodd"/>
                                </svg>
                                {file.name}
                            </p>
                        ))}
                    </div>
                ):(
                    <>
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Haz click</span> para subir un archivo o arrástralo aquí
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">(solo PDF)</p>
                    </div>
                    </>
                )}
                <FileInput id="dropzone-file" className={`absolute w-full h-full ${dragging || !files ? 'z-10':'-z-10'}`} accept=".pdf" multiple onChange={handleFileChange} />
            </Label>
            </div>
    );
}