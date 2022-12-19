import {Button, Card} from "react-bootstrap";

function Itemcard({item, editarItem, eliminarItem}) {
    return <Card>
        <Card.Body>
            <Card.Title>{item.nombre}</Card.Title>
            <Card.Text>{item.descripcion}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
            <Button variant="primary" onClick={() => editarItem(item)}>Editar</Button>{' '}
            <Button onClick={() => eliminarItem(item)}
                    variant="danger">Eliminar</Button>
        </Card.Footer>
    </Card>
}

export default Itemcard;
