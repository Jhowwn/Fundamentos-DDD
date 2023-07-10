import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entitites/unique-entity-id'

import {
  Notification,
  NotificationProps,
} from '@/domain/notification/enterprise/entities/notification'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const newNotification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      content: faker.lorem.sentences(10),
      ...override,
    },
    id,
  )

  return newNotification
}
