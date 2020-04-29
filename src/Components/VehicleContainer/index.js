import React from "react";
import './styles.css'

export default function VehicleContainer({vehicle}) {
    return (
        <div className='vehicle-container' key={vehicle.ID}>
            <header>
                <img src={vehicle.Image} alt='carro' />
            </header>

            <main>
                <h3>{vehicle.Make} {vehicle.Model}</h3>
                <span>{vehicle.Version}</span>
            </main>

            <footer>
                <h4>R$ {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(vehicle.Price.replace(',', '.'))}</h4>
                <div>
                    <div>{vehicle.YearFab}/{vehicle.YearModel}</div>
                    <div>{vehicle.KM} KM</div>
                </div>
            </footer>
        </div>
    )
}