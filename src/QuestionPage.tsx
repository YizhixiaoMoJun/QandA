/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FieldContainer, FieldError, FieldLabel, Fieldset, FieldTextArea, FormButtonContainer, gray3, gray6, PrimaryButton, SubmissionSuccess } from './styles';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from './Page';
import { getQuestion, postAnswer, postQuestion, QuestionData } from './QuestionData';
import { AnswerList } from './AnswerList';
import { useForm } from 'react-hook-form';

type FormData = {
    content: string;
}

export const QuestionPage = () => {
    const { register, errors, handleSubmit, formState } = useForm<FormData>({
        mode: 'onBlur',
    });

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

    const [
        successfullySumbitted,
        setsuccessfullySumbitted,
    ] = React.useState(false);

    const submitForm = async (data: FormData) => {
        const result = await postAnswer({
            questionId: question!.questionId,
            content: data.content,
            userName: 'Shirley',
            created: new Date(),
        });

        setsuccessfullySumbitted(result ? true : false);

    };

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
                                css={css`
                                    font-size: 12px;
                                    font-style: italic;
                                    color: ${gray3};
                                `}>
                                {`Asked by ${question.userName} on 
                                    ${question.created.toLocaleDateString()}
                                    ${question.created.toLocaleTimeString()}`}

                            </div>
                            <AnswerList data={question.answers}></AnswerList>

                            <form
                                css={css`
                                    margin-top: 20px;
                                `}
                                onSubmit={handleSubmit(submitForm)}>
                                <Fieldset
                                    disabled={
                                        formState.isSubmitting || successfullySumbitted
                                    }>
                                    <FieldContainer>
                                        <FieldLabel htmlFor="content">
                                            Your Answer
                                    </FieldLabel>
                                        <FieldTextArea
                                            id="content"
                                            name="content"
                                            ref={register({
                                                required: true,
                                                minLength: 5,
                                            })}>
                                        </FieldTextArea>
                                        {errors.content && errors.content.type === 'required' && (
                                            <FieldError>
                                                You must enter the answer
                                            </FieldError>
                                        )}
                                        {errors.content && errors.content.type === 'minLength' && (
                                            <FieldError>
                                                The answer must be at least 5 characters
                                            </FieldError>
                                        )}
                                    </FieldContainer>
                                    <FormButtonContainer>
                                        <PrimaryButton type="submit">
                                            Submit Your Answer
                                        </PrimaryButton>
                                    </FormButtonContainer>
                                    {successfullySumbitted && (
                                        <SubmissionSuccess>
                                            Your answer was successfully submitted
                                        </SubmissionSuccess>
                                    )}
                                </Fieldset>
                            </form>
                        </React.Fragment>
                    )
                }

            </div>
        </Page>);
};