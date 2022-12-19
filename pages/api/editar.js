import Servicios from "../../database/models/servicios";

export default async function EditarServicio(req, res) {
    if (req.method !== "POST") return res.status(405).json({
        data: {msg: "No Autorizado!"}
    });

    const {body: {id, categoria, nombre, descripcion}} = req;

    try {
        const actualizarServicio = await Servicios.update({
            categoria, nombre, descripcion
        }, {
            where: {
                id: id
            }
        })
        console.log('actualizarServicio', actualizarServicio)
        if (actualizarServicio) {
            const listaServicios = await Servicios.findAll({
                attributes: ['id', 'categoria', 'nombre', 'descripcion']
            })
            res.status(200).json({
                status: 'success',
                message: 'done',
                content: listaServicios
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'done',
                content: []
            });
        }
    } catch (e) {
        res.status(404).json({
            status: 'error',
            message: '',
            content: []
        });
    }
}
