import React, { useEffect, useState, useRef } from 'react';

//components
import MenuItem from "../../Components/Menu/Item";

//assets
import bike from "../../assets/Img/bike.svg";
import car from "../../assets/Img/car.svg";
import logo from "../../assets/Img/logo.png";

//styles
import "./styles.css";

//services
import api from "../../Services/api";

function App(props) {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [versions, setVersions] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');
    const [selectedPage, setSelectedPage] = useState('1');

    const brandInput = useRef(null);

    useEffect(() => {
        async function initialize() {
            const response = await api.get('/Make');
            setBrands(response.data);
        }

        initialize();
    }, [])

    useEffect(() => {
        async function initializeVehicles() {
            const response = await api.get(`/Vehicles?Page=${selectedPage}`);
            setVehicles(response.data);
        }

        initializeVehicles();
    }, [selectedPage])

    const handleBrand = async (e) => {

        setSelectedBrand(e.target.value);

        const response = await api.get(`/Model?MakeID=${e.target.value}`)
        setModels(response.data);
    }

    const handleModels = async (e) => {
        setSelectedModel(e.target.value);

        const response = await api.get(`/Version?ModelID=${e.target.value}`)
        setVersions(response.data);
    }

    const handleVersions = (e) => {
        setSelectedVersion(e.target.value);
    }

    const clearAll = () => {
        setSelectedBrand('');
        setSelectedModel('');
        setSelectedVersion('');
        setSelectedPage('1');
    }

    return (
        <div>
            <div className='menu-container'>

                <img src={logo} alt='logo webmotors' className='logo' />

                <nav className='menu-options-container'>
                    <div style={{ display: 'flex' }}>

                        <MenuItem
                            img={car}
                            imgAlt='logo carros'
                            spanText='COMPRAR'
                            mainText='CARROS'
                        />

                        <MenuItem
                            img={bike}
                            imgAlt='logo motos'
                            spanText='COMPRAR'
                            mainText='MOTOS'
                        />
                    </div>

                    <button className='alt-button'>
                        Vender meu carro
                    </button>
                </nav>
            </div>

            <div className='filter-container'>
                <div className='checkBox'>
                    <input type='checkbox' />
                    <span className='checkbox-custom'></span>
                    <label>Novos</label>
                </div>
                <div>
                    <input type='checkbox' />
                    <label>Usados</label>
                </div>

                <input type='text' placeholder='Onde: ' />
                <input type='text' placeholder='Raio: ' />

                <input type='text' placeholder='Ano desejado ' />
                <input type='text' placeholder='Faixa de preço' />

                <label htmlFor='selectBrand'>Marca: Todas
                    <select id='selectBrand' onChange={handleBrand}>
                        {brands.map(brand => (
                            <option value={brand.ID} key={brand.ID}>
                                {brand.Name}
                            </option>
                        ))}
                    </select>
                </label>

                <select placeholder='Marca' disabled={selectedBrand !== '' ? false : true} onChange={handleModels}>
                    {models.map(model => (
                        <option value={model.ID} key={model.ID}>
                            {model.Name}
                        </option>
                    ))}
                </select>

                <select disabled={selectedModel !== '' ? false : true} onChange={handleVersions}>
                    {versions.map(version => (
                        <option value={version.ID} key={version.ID}>
                            {version.Name}
                        </option>
                    ))}
                </select>

                <div>
                    <button>Busca Avançada</button>
                    <button onClick={clearAll}>Limpar filtros</button>
                    <button>Ver ofertas</button>
                </div>
            </div>
            <div>
                {vehicles.map(vehicle => (
                    <div key={vehicle.ID}>
                        <img src={vehicle.Image} alt='carro' />

                        <div>Color: {vehicle.Color}</div>
                        <div>KM: {vehicle.KM}</div>
                        <div>Marca: {vehicle.Make}</div>
                        <div>Modelo: {vehicle.Model}</div>
                        <div>Preço: {vehicle.Price}</div>
                        <div>Versão: {vehicle.Version}</div>
                        <div>Ano de fabricação: {vehicle.YearFab}</div>
                        <div>Ano do modelo: {vehicle.YearModel}</div>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => setSelectedPage('1')}>1</button>
                <button onClick={() => setSelectedPage('2')}>2</button>
                <button onClick={() => setSelectedPage('3')}>3</button>
            </div>
        </div>

    );
}

export default App;
