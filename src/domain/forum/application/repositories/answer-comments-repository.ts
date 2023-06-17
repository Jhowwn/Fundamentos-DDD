import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentsRepository {
  create(answersComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answersComment: AnswerComment): Promise<void>
}
