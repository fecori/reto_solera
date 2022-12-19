import Head from 'next/head'
import {absoluteUrl} from "../utils";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import Itemcard from "../components/card";
import EditarItem from "../components/form";

function Home({origin, data, categorias}) {
    const {content} = data;
    const [getDatos, setDatos] = useState(content);
    const [getEdit, setEdit] = useState(null);
    const listaCategorias = categorias.map((categoria, key) => {
        return <li onClick={() => filtrarMenu(categoria.nombre)} key={`categoria-items-${key}`}>{categoria.nombre}</li>
    })
    const filtrarMenu = (categoria) => {
        const filtroDatos = content.filter(item => {
            if (categoria === 'todos') {
                return item;
            }
            return item.categoria === categoria;
        })
        setDatos(filtroDatos)
    }
    const editarItem = (datos) => {
        setEdit(datos);
    }
    const eliminarItem = async (datos) => {
        const {id} = datos;
        const resultadoEliminar = await axios.delete(`${origin}/api/eliminar`, {data: {id}})
        const {status, data} = resultadoEliminar;
        if (status === 200) {
            const {content} = data;
            setDatos(content);
        }
    }
    const guardarItem = async (datos) => {
        const {id, categoria, nombre, descripcion} = datos;
        const resultadoEditar = await axios.post(`${origin}/api/editar`, {
                id, categoria, nombre, descripcion
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        const {status, data} = resultadoEditar;
        if (status === 200) {
            const {content} = data;
            setDatos(content);
            setEdit(null);
        }
    }
    const cancelarEdicion = () => {
        setEdit(null);
    }

    return <>
        <Head>
            <title>Reto Solera</title>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <Container>
            <Row>
                <Col md={{span: 12}}>
                    <h1 className="text-center">Servicios</h1>
                </Col>
            </Row>
            <Row className="nav-categorias">
                <Col md={{span: 12}}>
                    <ul>
                        <li onClick={() => filtrarMenu("todos")}>Todos</li>
                        {listaCategorias}
                    </ul>
                </Col>
            </Row>

            <Row>
                <Col md={{span: 8}}>
                    <Row>
                        {getDatos.length && getDatos.map((item, key) => {
                            return <Col key={`dato-lista-${key}`} md={{span: 4}}>
                                <Itemcard item={item} editarItem={editarItem} eliminarItem={eliminarItem}/>
                            </Col>
                        })}
                    </Row>
                </Col>
                <Col md={{span: 4}}>
                    {getEdit && (
                            <EditarItem item={getEdit} guardarItem={guardarItem} cancelarEdicion={cancelarEdicion}/>) ||
                        <div>Seleccione un item para editar.</div>}
                </Col>
            </Row>

        </Container>

    </>
}

export async function getServerSideProps(context) {
    const {req} = context;
    const {origin} = absoluteUrl(req);
    const result = await axios.get(`${origin}/api/datos`);
    const resultCategorias = await axios.get(`${origin}/api/categorias`);
    return {
        props: {
            origin,
            data: result.data || [],
            categorias: resultCategorias.data.categorias || []
        },
    };
}

export default Home;
