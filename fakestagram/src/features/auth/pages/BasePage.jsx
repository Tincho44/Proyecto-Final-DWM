import React from 'react';

const BasePage = ({ children }) => {

    return (
        <div className="globalContainer">
            <div>
                <img src="/telefonos.png" alt="telefonos" className="telefonos" />
            </div>
            <div className='globalPage'>
                {children}
            </div>
        </div>
    );
};

export default BasePage;
