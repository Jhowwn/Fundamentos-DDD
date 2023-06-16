import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
}