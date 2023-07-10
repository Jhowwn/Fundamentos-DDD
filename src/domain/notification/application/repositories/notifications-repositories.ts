import { Notification } from '../../enterprise/entities/notification'

export interface NotificationsRepository {
  findById(id: string): Promise<Notification | null>
  create(notifcation: Notification): Promise<void>
  save(notifcation: Notification): Promise<void>
}
