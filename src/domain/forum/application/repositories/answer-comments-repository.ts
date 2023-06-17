import { PaginationParms } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentsRepository {
  create(answersComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    parms: PaginationParms,
  ): Promise<AnswerComment[]>
  delete(answersComment: AnswerComment): Promise<void>
}
