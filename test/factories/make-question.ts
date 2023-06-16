import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entitites/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const newQuestion = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create('example-teste'),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return newQuestion
}
