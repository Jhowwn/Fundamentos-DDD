import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entitites/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer By Slug', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to Edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'Conteudo teste content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteudo teste content',
    })
  })

  it('Should not be able to Edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-2',
        content: 'Conteudo teste content',
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
  })
})