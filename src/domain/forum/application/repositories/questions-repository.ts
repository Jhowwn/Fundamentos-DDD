import { PaginationParms } from '@/core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  findById(id: string): Promise<Question | null>
  findManyRecent(parms: PaginationParms): Promise<Question[]>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  create(question: Question): Promise<void>
}
