import { Drawer, Modal } from "flowbite-react";
import { useState } from "react";
import ArticlesList from "./SideBar/ArticlesList";
import Grapher from "@/components/grapher";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setDocumentModalOpen,  } from "@/storage/AppSlice";
import pdf from "@assets/testPDF.pdf";

const sigmaStyle = { height: "100vh", width: "100vw" };

export default function GrapherPage() {
    const [open, setOpen] = useState(false)
    const { documentModalOpen } = useAppSelector((state) => state.app)
    const dispatch = useAppDispatch();

    return (
        <div>
            <Grapher style={sigmaStyle} />

            <Drawer className="flex flex-col p-2 shadow-lg shadow-gray-200"
                backdrop={false}
                open={open} 
                onClose={() => setOpen(!open)}>
                {/* Menu Buttons */}
                <div className="flex justify-between py-2 w-full">
                    <button className="w-10 h-10 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-200 flex justify-center items-center" onClick={() => setOpen(!open)}>
                        <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button className="w-10 h-10 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-200 flex justify-center items-center" onClick={() => setOpen(!open)}>
                        <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                    <button className="w-10 h-10 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-200 flex justify-center items-center" onClick={() => setOpen(!open)}>
                        <svg className="w-6 h-6 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7.833 2c-.507 0-.98.216-1.318.576A1.92 1.92 0 0 0 6 3.89V21a1 1 0 0 0 1.625.78L12 18.28l4.375 3.5A1 1 0 0 0 18 21V3.889c0-.481-.178-.954-.515-1.313A1.808 1.808 0 0 0 16.167 2H7.833Z"/>
                        </svg>
                    </button>
                    <button className="w-10 h-10 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-200 flex justify-center items-center" onClick={() => setOpen(!open)}>
                        <svg className={`w-6 h-6 dark:text-white transition-transform delay-150 duration-200 ${!open ? 'rotate-180 text-gray-800': ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M13.729 5.575c1.304-1.074 3.27-.146 3.27 1.544v9.762c0 1.69-1.966 2.618-3.27 1.544l-5.927-4.881a2 2 0 0 1 0-3.088l5.927-4.88Z" clipRule="evenodd"/>
                        </svg>
                    </button>
                </div>
                {/* Drawer Body */}
                {open && (
                    <ArticlesList />
                )}
            </Drawer>
            
            <Modal show={documentModalOpen}
                size={"7xl"}
                dismissible 
                onClose={() => dispatch(setDocumentModalOpen(false))}>
                <Modal.Header>
                    <p className="font-raleway font-bold text-xl">Artículo 1</p>
                </Modal.Header>
                <Modal.Body className="min-h-[75vh] flex">
                    <iframe src={pdf} className="w-full min-h-96 grow">
                        Contenido del artículo 1
                    </iframe>
                </Modal.Body>
            </Modal>
        </div>
    )
}