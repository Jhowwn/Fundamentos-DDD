import { Notification } from '../../enterprise/entities/notification'

export interface notificationsRepository {
  create(notifcation: Notification): Promise<void>
}
