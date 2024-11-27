import React from 'react'

function NoData({ text }) {
    return (
        <div className="no-data-container">
            <div className="no-data">
                <img src="/no-data.svg" alt="No data" style={{ width: "150px" }} />
                <h3>No hay datos</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default NoData
