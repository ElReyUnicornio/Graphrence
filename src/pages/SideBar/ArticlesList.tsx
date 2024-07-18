import FileZone from "@/components/fileZone";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import pdf from "@assets/testPDF.pdf"

const articles = [
    {
        name: "Artículo 1",
        content: "Contenido del artículo 1"
    },
    {
        name: "Artículo 2",
        content: "Contenido del artículo 2"
    },
    {
        name: "Artículo 3",
        content: "Contenido del artículo 3"
    }
]

// type props = {
//     onOpenFile: (id:string) => {},
// }

export default function() {
    const [openArticle, setOpenArticle] = useState(false)
    const [openRead, setOpenRead] = useState(false)

    return (
        <div className="w-full h-full flex flex-col px-3 pt-3">
            <p className="font-raleway font-bold text-xl mb-3">Nombre del Proyecto</p>
            <Button color="primary" size="xs" className="font-semibold mb-3" onClick={() => setOpenArticle(true)}>
                <svg className="w-5 h-5 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                </svg>
                Añadir artículo
            </Button>
            {articles.map((article, index) => (
                <button onDoubleClick={() => setOpenRead(true)} key={index} className="px-2 py-1 w-full h-8 mb-1 text-xs font-bold font-raleway text-start rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100">
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

            {/* Read Modal */}
            <Modal show={openRead}
                size={"7xl"}
                dismissible 
                onClose={() => setOpenRead(false)}>
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
    );
}