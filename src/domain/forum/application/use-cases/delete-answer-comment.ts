import { AnswersCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommenUseCaseResponse { }

export class DeleteAnswerCommenUseCase {
  constructor(private answerCommentRepository: AnswersCommentsRepository) { }

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommenUseCaseResponse> {
    const answerComment = await this.answerCommentRepository.findById(
      answerCommentId,
    )

    if (!answerComment) {
      throw new Error('Answer Comment Not Found!')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not Allowed!')
    }

    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
