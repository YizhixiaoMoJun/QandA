/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { getUnAnsweredQuestion } from './QuestionData';
import { QuestionList } from './QuestionList';
import { AppState, gettingUnansweredQuestionsAction, gotUnansweredQuestionsAction } from './store';
import { PrimaryButton } from './styles';

export const HomePage = () => {
    const dispatch = useDispatch();

    const questions = useSelector(
        (state: AppState) => state.questions.unanswered,
    );

    const questionsLoading = useSelector(
        (state: AppState) => state.questions.loading,
    );


    React.useEffect(() => {
        const doGetUnansweredQuestions = async () => {
            dispatch(gettingUnansweredQuestionsAction());
            const unansweredQuestions = await getUnAnsweredQuestion();
            console.log(unansweredQuestions);
            dispatch(gotUnansweredQuestionsAction(unansweredQuestions));
        };

        doGetUnansweredQuestions();
    }, []);

    const navigate = useNavigate();

    const handleAskQuestionClick =() =>{
         navigate('ask');
    }
    
    return (
        <Page>
            <div
                css = {css`
                    display:flex;
                    align-items: center;
                    justify-content: space-between;
                `}
            >
                <PageTitle>Unanswered Question</PageTitle>
                <div>
                    <PrimaryButton onClick={handleAskQuestionClick}>Ask a question</PrimaryButton>
                </div>
              
            </div>
            {questionsLoading ? (
                    <div>Loading...</div>
                ) : (<QuestionList data={questions || []} />)}
        </Page>
    );
};