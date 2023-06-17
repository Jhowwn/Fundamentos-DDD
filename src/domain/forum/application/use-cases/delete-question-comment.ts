import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteQuestionCommenUseCaseResponse { }

export class DeleteQuestionCommenUseCase {
  constructor(private questionCommentRepository: QuestionsCommentsRepository) { }

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommenUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(
      questionCommentId,
    )

    if (!questionComment) {
      throw new Error('Question Comment Not Found!')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not Allowed!')
    }

    await this.questionCommentRepository.delete(questionComment)

    return {}
  }
}
