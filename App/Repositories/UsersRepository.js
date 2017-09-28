'use strict'

import debug from 'debug'
import configs from '../../Configs'
import * as Models from '../Models'

export default class UsersRepository {
  static async fetchUserById (id) {
    const log = debug(`${configs.debugZone}:UsersRepository:fetchUserById`)

    log('fetchUserById')

    const ProducedMap = {
      'user_facebook_id': 'facebookId',
      'user_id': 'id',
      'user_username': 'username',
      'user_name': 'name',
      'user_email': 'email',
      'user_firstname': 'firstName',
      'user_lastname': 'lastName',
      'user_gender': 'gender',
      'user_mobile': 'mobile',
      'user_date_of_birth': 'dateOfBirth',
      'user_is_activated': 'isActivated',
      'user_about_me': 'aboutMe',
      'cloud_avatar_url': 'cloudAvatarUrl',
      'user_registered_at': 'registeredAt',
      'user_updated_at': 'updatedAt',
      'user_hashtags': 'hashtags'
    }

    const users = await Models.sequelize.query(`
      SELECT
        u.facebook_id   AS user_facebook_id,
        u.id            AS user_id,
        u.username      AS user_username,
        u.name          AS user_name,
        u.email         AS user_email,
        u.first_name    AS user_firstname,
        u.last_name     AS user_lastname,
        u.gender        AS user_gender,
        u.mobile        AS user_mobile,
        u.date_of_birth AS user_date_of_birth,
        u.is_activated  AS user_is_activated,
        u.about_me      AS user_about_me,
        ar.cloud_url    AS cloud_avatar_url,
        u.registered_at AS user_registered_at,
        u.updated_at    AS user_updated_at,
        (
          SELECT array_to_json(array_agg(h)) AS hashtags
          FROM users_hashtags AS uh
            JOIN hashtags AS h
              ON uh.hashtag_id = h.id
          WHERE
            uh.user_id = u.id
        )               AS user_hashtags
      FROM users AS u
        LEFT JOIN resources AS ar
          ON ar.id = u.avatar_resource_id
      WHERE
        u.id = :id
      OFFSET 0
      LIMIT 1
    `, {
      replacements: {
        id
      },
      fieldMap: ProducedMap,
      type: Models.sequelize.QueryTypes.SELECT
    })

    if (users.length === 0) {
      return null
    }

    return users[0]
  }
};
