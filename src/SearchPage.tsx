/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react';
import { Page } from './Page';
import { useSearchParams } from 'react-router-dom';
import { QuestionData, searchQuestions } from './QuestionData';
import { QuestionList } from './QuestionList';

export const SearchPage = () => {
    const [searchParams] = useSearchParams();

    const[
        questions,
        setQuestions,
    ] = React.useState<QuestionData[]>([]);

    const search = searchParams.get("criteria") || "";

    React.useEffect(()=>{
        const doSearch = async(criteria:string) =>{
            const foundResult = await searchQuestions(criteria);
            setQuestions(foundResult);
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