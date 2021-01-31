/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { getUnAnsweredQuestion, QuestionData } from './QuestionData';
import { QuestionList } from './QuestionList';
import { PrimaryButton } from './styles';

export const HomePage = () => {
    const [
        questions,
        setQuestions
    ] = React.useState<QuestionData[]>([]);

    const [
        qusetionsLoading,
        setQuestionsLoading
    ] = React.useState(true);

    React.useEffect(() => {
        const doGetUnansweredQuestions = async () => {
            const unansweredQuestions = await getUnAnsweredQuestion();
            setQuestions(unansweredQuestions);
            setQuestionsLoading(false);
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
            {qusetionsLoading ? (
                    <div>Loading...</div>
                ) : (<QuestionList data={questions || []} />)}
        </Page>
    );
};