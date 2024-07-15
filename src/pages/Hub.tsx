import { useState, useEffect } from "react";
import { Button, HR, Table, Modal, TextInput, Label } from "flowbite-react";
import Heading from "@components/heading";
import InputError from "@components/inputError";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    name: "Proyecto 1",
    articles: 3,
    lastModified: "Hace 2 días",
  },
  {
    name: "Proyecto 2",
    articles: 5,
    lastModified: "Hace 3 días",
  },
  {
    name: "Proyecto 3",
    articles: 1,
    lastModified: "Hace 4 días",
  },
]

type Data = {
  name: string;
} | null;

function Hub() {
  const [openModal, setOpenModal] = useState(false);
  const [errors, setErrors] = useState<Data>(null);
    const navigate = useNavigate();

  useEffect(() => {
    setErrors(null);
  }, [openModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (formData.get("name") === "") {
      setErrors({ name: "El nombre del proyecto es requerido" });
      return;
    }

    setOpenModal(false);
    navigate("/graph");
  }

  return (
    <div className="min-h-screen flex flex-col p-7">
      <div className="flex items-center justify-between p-3 pb-0">
        <Heading>Proyectos</Heading>
        <Button color={'primary'} size={"sm"} onClick={() => setOpenModal(true)}>
          <svg className="w-5 h-5 mr-2 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
          </svg>
          Crear Proyecto
        </Button>
      </div>

      <HR></HR>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Número de artículos</Table.HeadCell>
          <Table.HeadCell>Última modificación</Table.HeadCell>
          <Table.HeadCell>Acciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {projects.map((project, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-semibold dark:text-white">
                {project.name}
              </Table.Cell>
              <Table.Cell>
                {project.articles}
              </Table.Cell>
              <Table.Cell>
                {project.lastModified}
              </Table.Cell>
              <Table.Cell className="flex justify-between">
                <a href="#" className="font-medium text-cyan-600 hover:text-cyan-600 hover:underline dark:text-cyan-500">
                  Editar
                </a>
                <a href="#" className="font-medium text-red-600 hover:text-red-600 hover:underline dark:text-red-500">
                  Eliminar
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Create project modal */}

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Crear proyecto</Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre del proyecto" />
              </div>
              <TextInput id="name" 
                name="name"
                type="text" 
                placeholder="Nuevo proyecto" 
                color={errors?.name ? 'failure' : '' }
                helperText={<InputError>{errors?.name}</InputError>} />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
            <Button gradientMonochrome="blue" type="submit">Comenzar</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Hub;
