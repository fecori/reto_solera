import categorias from "../../database/models/categorias";

export default async function listaCategorias(req, res) {
    if (req.method !== "GET") return res.status(405).json({
        data: {msg: "No Autorizado!"}
    });

    try {

        const listaCategorias = await categorias.findAll({
            attributes: ['nombre']
        })

        res.status(200).json({
            status: 'success',
            message: 'done',
            categorias: listaCategorias
        });
    } catch (e) {
        res.status(404).json({
            status: 'error',
            message: '',
            categorias: []
        });
    }
}
