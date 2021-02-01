import React from 'react';
import { useForm } from 'react-hook-form';
import { Page } from './Page';
import { postQuestion } from './QuestionData';
import { FieldContainer, FieldError, FieldInput, FieldLabel, Fieldset, FieldTextArea, FormButtonContainer, PrimaryButton, SubmissionSuccess } from './styles';

type FormData = {
    title: string;
    content: string;
};

export const AskPage = () => {
    const { register, errors, handleSubmit, formState } = useForm<FormData>({
        mode: `onBlur`,
    });

    const [
        successfullySubmitted,
        setsuccessfullySubmitted,
    ] = React.useState(false);

    const submitForm = async (data: FormData) =>{
        const result = await postQuestion({
            title: data.title,
            content: data.content,
            userName: 'Shirley',
            created: new Date()
        });
        setsuccessfullySubmitted(result ? true: false);
    }


    return (
        <Page title="Ask a question">
            <form onSubmit={handleSubmit(submitForm)}>
                <Fieldset
                    disabled ={
                        formState.isSubmitting||
                        successfullySubmitted}>
                    <FieldContainer>
                        <FieldLabel htmlFor="title">
                            Title
                        </FieldLabel>
                        <FieldInput
                            id="title"
                            name="title"
                            type="text"
                            ref={register({
                                required: true,
                                minLength: 5,
                            })}>
                        </FieldInput>
                        {errors.title && errors.title.type === 'required' && (
                            <FieldError>
                                You must enter the question title
                            </FieldError>
                        )}
                        {errors.title && errors.title.type === 'minLength' && (
                            <FieldError>
                                The title must be at least 5 characters
                            </FieldError>
                        )}
                    </FieldContainer>
                    <FieldContainer>
                        <FieldLabel htmlFor="content">
                            Content
                        </FieldLabel>
                        <FieldTextArea
                            id="content"
                            name="content"
                            ref={register({
                                required: true,
                                minLength: 50,
                            })}>
                        </FieldTextArea>
                        {errors.content && errors.content.type === 'required' && (
                            <FieldError>
                                You must enter the question content
                            </FieldError>
                        )}
                        {errors.content && errors.content.type === 'minLength' && (
                            <FieldError>
                                The content must be at least 50 characters
                            </FieldError>
                        )}
                    </FieldContainer>
                    <FormButtonContainer>
                        <PrimaryButton type="submit">
                            Submit Your Question
                        </PrimaryButton>
                    </FormButtonContainer>
                    {successfullySubmitted && (
                        <SubmissionSuccess>
                            Your question was successfully submitted
                        </SubmissionSuccess>
                    )}
                </Fieldset>
            </form>
        </Page>
    );
};



export default AskPage;