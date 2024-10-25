import React from 'react'

function WIPPage() {
    return (
        <div className="wip-page">
            <img src="/ucugram.svg" alt="UCU Gram" />
            <img src="/wip.svg" alt="Work In Progress" />
            <h1>Work In Progress</h1>
            <p>Esta página aún no está disponible</p>
            <button onClick={() => window.history.back()}>Volver a un lugar seguro</button>
        </div>
    )
}

export default WIPPage