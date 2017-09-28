'use strict'

import Sequelize from 'sequelize'
import DeviceTypesEnum from '../Enums/DeviceTypesEnum'

export default function (sequelize, DataTypes) {
  return sequelize.define('PushTokensRegistry', {
    id: {
      field: 'id',
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      field: 'user_id',
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
      }
    },
    deviceType: {
      field: 'device_type',
      type: DataTypes.ENUM(
        DeviceTypesEnum.apple,
        DeviceTypesEnum.android,
        DeviceTypesEnum.windows,
        DeviceTypesEnum.web,
      ),
      allowNull: false
    },
    token: {
      field: 'token',
      allowNull: false,
      type: DataTypes.STRING
    },
    registeredAt: {
      field: 'registered_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'push_tokens_registry',
    underscored: true,
    timestamps: true,
    createdAt: 'registeredAt',
    updatedAt: false,
    deletedAt: false
  })
}
