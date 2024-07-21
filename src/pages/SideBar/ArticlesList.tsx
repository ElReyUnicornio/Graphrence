import FileZone from "@/components/fileZone";
import { Button, Modal } from "flowbite-react";
import { setDocumentModalOpen, setSelectedDocument, setCurrentNode } from "@/storage/AppSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";


export default function() {
    const [openArticle, setOpenArticle] = useState(false);
    const { articles } = useAppSelector((state) => state.articles);
    const dispatch = useAppDispatch();

    const handleOpenFile = (uid: string) => {
        dispatch(setDocumentModalOpen(true));
        dispatch(setSelectedDocument(uid));
    }

    return (
        <div className="w-full h-full flex flex-col px-3 pt-3">
            <p className="font-raleway font-bold text-xl mb-3">Nombre del Proyecto</p>
            <Button color="primary" size="xs" className="font-semibold mb-3" onClick={() => setOpenArticle(true)}>
                <svg className="w-5 h-5 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                </svg>
                Añadir artículo
            </Button>
            {articles.map((article) => (
                <button onDoubleClick={() => handleOpenFile(article.uid)}
                    onMouseEnter={() => dispatch(setCurrentNode(article.uid))}
                    onMouseLeave={() => dispatch(setCurrentNode(0))}
                    key={article.uid} 
                    className="px-2 py-1 w-full h-8 mb-1 text-xs font-bold font-raleway text-start rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                    {article.name}
                </button>
            ))}

            {/* Article modal */}
            <Modal show={openArticle} dismissible onClose={() => setOpenArticle(false)}>
                <form>
                    <Modal.Body>
                        <FileZone />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => setOpenArticle(false)}>
                            Cancelar
                        </Button>
                        <Button gradientMonochrome="blue" type="submit">
                            Analizar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}