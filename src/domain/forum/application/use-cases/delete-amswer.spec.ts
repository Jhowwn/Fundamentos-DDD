import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entitites/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer By Slug', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to Delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('Should not be able to Delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
  })
})
