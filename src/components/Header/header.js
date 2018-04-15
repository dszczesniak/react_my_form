import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './header.css';

const Header = () => {

    const items = [
        {
            text: 'Create',
            link: '/home'
        },
        {
            text: 'Preview',
            link: '/preview'
        },
        {
            text: 'Export',
            link: '/export'
        }
    ]

    const showItems = () => {
        return (
                items.map( (item, i) => (
                    <NavLink key={i} to={item.link} activeStyle={{ backgroundColor: '#d1d1d1',  display: 'inline-flex'}}>
                        <div className={style.item} >
                            <span>
                                {item.text}
                            </span>
                        </div>
                    </NavLink>
            ))
          
        )
    }


    return (
        <div className={style.header}>
            <h1>Form Builder</h1>
           {showItems()}
           <hr/>
        </div>
    );
};

export default Header;