'use strict'

import Sequelize from 'sequelize'
import MessageTypesEnum from '../Enums/MessageTypesEnum'

export default function (sequelize, DataTypes) {
  return sequelize.define('Sockets', {
    id: {
      field: 'id',
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    socketId: {
      field: 'socket_id',
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      field: 'user_id',
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    viewPoint: {
      field: 'view_point',
      allowNull: true,
      type: DataTypes.STRING
    },
    registeredAt: {
      field: 'registered_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'sockets',
    underscored: true,
    timestamps: true,
    createdAt: 'registeredAt',
    updatedAt: false,
    deletedAt: false
  })
}
