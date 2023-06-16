import { UniqueEntityID } from '../../../../core/entitites/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionRepository: QuestionsRepository,
  ) { }

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Answer not found')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not found')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
