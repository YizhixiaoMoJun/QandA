/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { title } from 'process';
import React, { Children } from 'react';
import { PageTitle } from './PageTitle';

interface PageProps{
    title?:string;
    children: React.ReactNode;
}

export const Page =({title,children}:PageProps) =>(
    <div
        css = {css`
              margin: 50px auto 20px auto;
              padding: 30px 20px;
              max-width: 600px;
        `}
    >       
        {title && <PageTitle>{title}</PageTitle>}
        {children}
    </div>
)