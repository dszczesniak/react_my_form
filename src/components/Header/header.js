import React from 'react';
import { Link } from 'react-router-dom';
import style from './header.css';

const Header = () => {

    const items = [
        {
            text: 'Create',
            link: '/'
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
        return items.map( (item, i) => {
            return(
                <div key={i} className={item.type}>
                    <Link to={item.link}>
                        {item.text}
                    </Link>
                </div>
            )
        })
    }


    return (
        <div className={style.header}>
           {showItems()}
        </div>
    );
};

export default Header;