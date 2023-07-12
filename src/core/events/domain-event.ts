import { UniqueEntityID } from '../entitites/unique-entity-id'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityID
}
