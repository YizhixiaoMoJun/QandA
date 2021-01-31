/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import { UserIcon } from './UserIcon';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './styles';
import { sign } from 'crypto';
import { Link, useSearchParams } from 'react-router-dom';

export const Header = () => {

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
    };

 
    const [searchParams] = useSearchParams();
    const criteria = searchParams.get('criteria') || '';
    //const searchParams = new URLSearchParams(location.search);
    
    const[search,setSearch] = React.useState(criteria);

    return (
        <div css={css`

        position: fixed;
    
        box-sizing: border-box;
    
        top: 0;
    
        width: 100%;
    
        display: flex;
    
        align-items: center;
    
        justify-content: space-between;
    
        padding: 10px 20px;
    
        background-color: #fff;
    
        border-bottom: 1px solid ${gray5};
    
        box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
    
      `}>
            <Link to="/"
                css={css`
                font-size:24px;
                font-weight:bold;
                color:${gray1};
                text-decoration:none;
            `}
            >
                Q&A</Link>
            <input
                type="text"
                placeholder="Search..."
                value = {search}
                onChange={handleSearchInputChange}
                css={css`
                    box-sizing : border-box;
                    font-family :${fontFamily};
                    font-size:${fontSize};
                    
                    padding: 8px 10px;
                    border :1px solid ${gray5};
                    border-radius: 3px;
                    color :#dcdada;
                    background-color :white;
                    width:200px;
                    height:30px;
                    :focus {
                        outline-color: ${gray5};
                    }
                    ::placeholder{
                        color:#3685df;
                     }
                `}
            ></input>

            <Link
                to="signin"
                css={css`
              font-family:${fontFamily};
              font-size:${fontSize};
              padding:5px 10px;
              background-color:transparent;
              color:${gray2};
              text-decoration:none;
              cursor:pointer;
              span {
                  margin-left:7px;
              }
              :focus{
                  outline-color:${gray5};
                
                }
               
             `}
            ><UserIcon />
                <span>Sign In</span></Link>
        </div>
    );
};