import {Model, DataTypes} from 'sequelize';
import connection from '../connection';

const CategoriasInit = (sequelize, Types) => {
  class Categorias extends Model {
  }
  Categorias.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorias',
  });
  return Categorias;
};

export default CategoriasInit(connection, DataTypes);
