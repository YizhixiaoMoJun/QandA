import { Answer } from "./Answer";

export interface QuestionData {
    questionId: number;
    title: string;
    content: string;
    userName: string;
    created: Date;
    answers: AnswerData[];
}

export interface AnswerData {
    answerId: number;
    content: string;
    userName: string;
    created: Date;
}

const questions: QuestionData[] = [
    {
        questionId: 1,
        title: 'Why should I learn TypeScript?',
        content: 'TypeScript seems to be geeting popular',
        userName: 'Shirley',
        created: new Date(),
        answers: [

        ]
    },
    {
        questionId: 2,
        title: 'Why should I learn TypeScript2?',
        content: 'TypeScript seems to be geeting popular2',
        userName: 'Shirley',
        created: new Date(),
        answers: [
            {
                answerId: 1,
                content: 'To catch problems earlier speeding up your developments2',
                userName: 'Jane',
                created: new Date(),
            }
        ]
    },
    {
        questionId: 3,
        title: 'Why I do not have money?',
        content: 'TypeScript seems to be geeting popular3',
        userName: 'Shirley',
        created: new Date(),
        answers: [
            {
                answerId: 1,
                content: 'To catch problems earlier speeding up your developments2',
                userName: 'Jane',
                created: new Date(),
            },
            {
                answerId: 2,
                content: 'To catch problems earlier speeding up your developments2',
                userName: 'hh',
                created: new Date(),
            }
        ]
    }
]

export const getUnAnsweredQuestion = async (): Promise<QuestionData[]> => {
    await wait(500);
    return questions.filter(q => q.answers.length === 0);
}

const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getQuestion = async (
    questionId: number
): Promise<QuestionData | null> => {
    await wait(520);
    const results = questions.filter(q => q.questionId === questionId);
    return results.length === 0 ? null : results[0];
}

export const searchQuestions = async (
    criteria: string
): Promise<QuestionData[]> => {
    await wait(500);
    return questions.filter(q =>
        q.title.toLowerCase().indexOf(criteria.toLowerCase()) >= 0 ||
        q.content.toLowerCase().indexOf(criteria.toLowerCase()) >= 0
    );
}

export interface PostQuestionData {
    title: string;
    content: string;
    userName: string
    created: Date;
}

export const postQuestion = async (
    question: PostQuestionData,
): Promise<QuestionData | undefined> => {
    await wait(500);
    const questionId = Math.max(...questions.map(q => q.questionId)) + 1;
    const newQuestion: QuestionData = {
        ...question,
        questionId,
        answers: [],
    };
    questions.push(newQuestion);
    return newQuestion;
}

export interface PostAnswerData {
    questionId: number;
    content: string;
    userName: string;
    created: Date;
}

export const postAnswer = async (
    answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
    await wait(500);
    const question = questions.filter(q => q.questionId === answer.questionId)[0];
    const answerInQuestion: AnswerData = {
        answerId: 99,
        ...answer,
    };
    question.answers.push(answerInQuestion);
    return answerInQuestion;
}