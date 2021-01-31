/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

import React from 'react';
import { Answer } from './Answer';
import { AnswerData } from './QuestionData';
import { gray5 } from './styles';

interface AnswerListProps {
    data: AnswerData[];
}

export const AnswerList = ({ data }: AnswerListProps) => (
    <ul
        css={css`
            list-style: none;
            margin: 10px 0 0 0;
            padding: 0;
            `}
    >
        {data.map(answer => (
            <li
                css = {css`
                    border-top: 1px solid ${gray5};
                `}
                key = {answer.answerId}
            >
                <Answer data ={answer}></Answer>
            </li>
        ))}

    </ul>
);