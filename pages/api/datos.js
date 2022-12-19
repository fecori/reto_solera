import Servicios from "../../database/models/servicios";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({
        data: {msg: "No Autorizado!"}
    });

    try {
        const listaServicios = await Servicios.findAll({
            attributes: ['id', 'categoria', 'nombre', 'descripcion']
        })
        res.status(200).json({
            status: 'success',
            message: 'done',
            content: listaServicios
        });
    } catch (e) {
        res.status(404).json({
            status: 'error',
            message: '',
            content: []
        });
    }
}
