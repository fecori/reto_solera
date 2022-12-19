import Servicios from "../../database/models/servicios";

export default async function EliminarServicio(req, res) {
    if (req.method !== "DELETE") return res.status(405).json({
        data: {msg: "No Autorizado!"}
    });

    try {
        const {body: {id}} = req;
        console.log('req', id)
        const eliminarServicio = await Servicios.destroy({where: {id}})
        //
        // console.log('eliminarServicio id', id)
        if (eliminarServicio) {
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

        res.status(200).json({
            status: 'success',
            message: 'done',
            content: []
        });
    } catch (e) {
        res.status(404).json({
            status: 'error',
            message: '',
            content: []
        });
    }
}
