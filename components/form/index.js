import {Button, Card, Form} from "react-bootstrap";
import {useState} from "react";

function EditarItem({item, guardarItem, cancelarEdicion}) {
    const [validacion, setValidacion] = useState(false);
    const [formData, setFormData] = useState(item);

    const guardarDatos = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            guardarItem(formData);
        }
        setValidacion(true);
    }

    const actualizarForm = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [key]: value});
    }

    return <Card>
        <Form noValidate validated={validacion} onSubmit={guardarDatos}>
            <Card.Body>
                {/*<Card.Title>Titulo</Card.Title>
            <Card.Text>descripcion</Card.Text>*/}

                <div className="form-datos__items">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        required
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={actualizarForm}
                    />
                    <Form.Control.Feedback type="invalid">
                        Debe ingresar nombre del evento.
                    </Form.Control.Feedback>
                </div>
                <div className="form-datos__items">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        required
                        name="descripcion"
                        as="textarea" rows={5}
                        value={formData.descripcion}
                        onChange={actualizarForm}
                    />
                    <Form.Control.Feedback type="invalid">
                        Debe ingresar nombre del evento.
                    </Form.Control.Feedback>
                </div>

            </Card.Body>
            <Card.Footer className="text-muted">
                <Button type="submit" variant="primary">Guardar</Button>{' '}
                <Button onClick={() => cancelarEdicion()}
                        variant="danger">Cancelar</Button>
            </Card.Footer>
        </Form>
    </Card>
}

export default EditarItem;
