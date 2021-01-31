/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { gray3, gray6 } from './styles';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from './Page';
import { getQuestion, QuestionData } from './QuestionData';
import { AnswerList } from './AnswerList';

export const QuestionPage = () => {
    const [
        question,
        seQuestion,
    ] = React.useState<QuestionData | null>(null);
    const { questionId } = useParams();

    React.useEffect(() => {
        const doGetQuestiom = async (
            questionId: number
        ) => {
            const foundQuestion = await getQuestion(questionId);
            seQuestion(foundQuestion);
        };

        if (questionId) {
            doGetQuestiom(Number(questionId));
        }
    }, [questionId]);

    return (
        <Page>
            <div
                css={css`
                background-color:white;
                padding: 15px 20px 20px 20px;
                border-radius:4px;
                border:1px solid ${gray6};
                box-shadow: 0 3px 5px 0 rgb(0,0,0,0.16);
        `}>
                <div
                    css={css`
                    font-size: 19px;
                    font-weight: bold;
                    margin: 10px 0px 5px;
                    `}>
                    {question && question.title}
                </div>
                {
                    question && (
                        <React.Fragment>
                            <p
                                css={css`
                                    margin-top:0px;
                                    background-color: white;
                                    `}>
                                {question.content}
                            </p>
                            <div
                                css = {css`
                                    font-size: 12px;
                                    font-style: italic;
                                    color: ${gray3};
                                `}>
                                    {`Asked by ${question.userName} on 
                                    ${question.created.toLocaleDateString()}
                                    ${question.created.toLocaleTimeString()}`}

                            </div>
                            <AnswerList data={question.answers}></AnswerList>
                        </React.Fragment>
                    )
                }

            </div>
        </Page>);
};