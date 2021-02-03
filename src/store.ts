import { combineReducers, createStore, Store } from "redux";
import { QuestionData } from "./QuestionData";

interface QuestionState {
    readonly loading: boolean;
    readonly unanswered: QuestionData[];
    readonly viewing: QuestionData | null;
    readonly searched: QuestionData[];
};

export interface AppState {
    readonly questions: QuestionState;
};

const initialQuestionState: QuestionState = {
    loading: false,
    unanswered: [],
    viewing: null,
    searched: []
};

export const GettingUnansweredQuestions = 'GettingUnansweredQuestions';

export const gettingUnansweredQuestionsAction = () => ({
    type: GettingUnansweredQuestions,
} as const);

export const GotUnansweredQuestions = 'GotUnansweredQuestions';

export const gotUnansweredQuestionsAction = (questions: QuestionData[]) => ({
    type: GotUnansweredQuestions,
    questions: questions
} as const);

export const GettingQuestion = 'GettingQuestion';
export const gettingQuestionAction = () => ({
    type: GettingQuestion,
} as const);

export const GotQuestion = 'GotQuestion';
export const gotQuestionAction = (question: QuestionData | null) => ({
    type: GotQuestion,
    question: question
} as const);

export const SearchingQuestion = 'SearchingQuestion';
export const searchingQuestionAction = () => ({
    type: SearchingQuestion,
} as const);

export const SearchedQuestions = 'searchedQuestions';
export const searchedQuestionAction = (questions: QuestionData[]) => ({
    type: SearchedQuestions,
    questions: questions,
} as const);

type QuestionActions = | ReturnType<typeof gettingUnansweredQuestionsAction>
    | ReturnType<typeof gotUnansweredQuestionsAction>
    | ReturnType<typeof gettingQuestionAction>
    | ReturnType<typeof gotQuestionAction>
    | ReturnType<typeof searchingQuestionAction>
    | ReturnType<typeof searchedQuestionAction>;

const questionReducer = (
    state = initialQuestionState,
    action: QuestionActions
) => {
    switch (action.type) {
        case GettingUnansweredQuestions: {
            return {
                ...state,
                loading: true,
            }
        }
        case GotUnansweredQuestions: {
            return {
                ...state,
                unanswered: action.questions,
                loading: false,
            }

        }
        case GettingQuestion: {
            return {
                ...state,
                viewing: null,
                loading: true,
            }

        }
        case GotQuestion: {
            return {
                ...state,
                viewing: action.question,
                loading: false,
            }

        }
        case SearchingQuestion: {
            return {
                ...state,
                searched: [],
                loading: true,
            }

        }
        case SearchedQuestions: {
            return {
                ...state,
                searched: action.questions,
                loading: false,
            }

        }
    };
    return state;
};

const rootReducer = combineReducers<AppState>({
    questions : questionReducer
});

export function configureStore(): Store<AppState>{
    const store = createStore(rootReducer,undefined);
    return store;
}