import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entitites/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to Edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteudo teste content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteudo teste content',
    })
  })

  it('Should not be able to Edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteudo teste content',
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
  })
})
