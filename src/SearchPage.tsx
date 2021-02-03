/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Page } from './Page';
import { useSearchParams } from 'react-router-dom';
import { QuestionData, searchQuestions } from './QuestionData';
import { QuestionList } from './QuestionList';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, searchedQuestionAction, searchingQuestionAction } from './store';

export const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const questions = useSelector(
        (state: AppState) => state.questions.searched,
    );
    const search = searchParams.get("criteria") || "";

    React.useEffect(()=>{
        const doSearch = async(criteria:string) =>{
            dispatch(searchingQuestionAction());
            const foundResult = await searchQuestions(criteria);
            dispatch(searchedQuestionAction(foundResult));
        };

        doSearch(search);
    },[search])
    
    return (
        <Page title="Search Results">{search && (
            <p
                css={css`
                    font-size:16px;
                    font-style:italic;
                    margin-top: 0px;
                    `}
            >
                for "{search}"

            </p>
        )}
            <QuestionList data ={questions}></QuestionList>
        </Page>
    )
};
