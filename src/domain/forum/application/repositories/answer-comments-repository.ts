import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentsRepository {
  create(answersComment: AnswerComment): Promise<void>
}
