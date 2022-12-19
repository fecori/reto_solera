import Servicios from "../../database/models/servicios";
import Categorias from "../../database/models/categorias";

export default async function AgregarServicio(req, res) {

    if (req.method !== "POST") return res.status(405).json({
        data: {msg: "No Autorizado!"}
    });

    const {body: {categoria, nombre, descripcion}} = req;

    try{
        const agregarServicio = await Servicios.create({
            categoria, nombre, descripcion
        })
        // const agregarServicio = await Categorias.create({
        //     nombre
        // })
        res.status(200).json({
            status: 'success',
            message: 'done',
            content: agregarServicio
        });
    }catch (e) {
        res.status(404).json({
            status: 'error',
            message: '',
            content: []
        });
    }

}
