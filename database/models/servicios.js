import {Model, DataTypes} from 'sequelize';
import connection from '../connection';

const ServiciosInit = (sequelize, Types) => {
    class Servicios extends Model {
    }

    Servicios.init({
        categoria: DataTypes.STRING,
        nombre: DataTypes.STRING,
        descripcion: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'servicios',
        tableName: 'servicios'
    });
    return Servicios;
};

export default ServiciosInit(connection, DataTypes);
