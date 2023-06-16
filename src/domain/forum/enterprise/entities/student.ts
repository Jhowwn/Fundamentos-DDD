import { Entity } from '@/core/entitites/entity'
import { UniqueEntityID } from '@/core/entitites/unique-entity-id'

interface StudendProps {
  name: string
}

export class Student extends Entity<StudendProps> {
  static create(props: StudendProps, id?: UniqueEntityID) {
    const student = new Student(props, id)

    return student
  }
}
