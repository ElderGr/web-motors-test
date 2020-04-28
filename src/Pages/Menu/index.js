import React, { useEffect, useState } from 'react';

//components
import MenuItem from "../../Components/Menu/Item";
import CheckBox from "../../Components/Checkbox";
import SelectComponent from "../../Components/SelectComponent";

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

    const [vehicleType, setVehicleType] = useState('cars');

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

        setSelectedBrand(e);

        const response = await api.get(`/Model?MakeID=${e}`)
        setModels(response.data);
    }

    const handleModels = async (e) => {
        setSelectedModel(e);

        const response = await api.get(`/Version?ModelID=${e}`)
        setVersions(response.data);
    }

    const handleVersions = (e) => {
        setSelectedVersion(e);
    }

    const filter = () => {
        console.log(selectedBrand)
        console.log(selectedModel)
        console.log(selectedVersion)
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
                            selected={vehicleType === 'cars' ? true : false}
                            event={() => setVehicleType('cars')}
                        />

                        <MenuItem
                            img={bike}
                            imgAlt='logo motos'
                            spanText='COMPRAR'
                            mainText='MOTOS'
                            selected={vehicleType === 'bike' ? true : false}
                            event={() => setVehicleType('bike')}
                        />
                    </div>

                    <button className='alt-button'>
                        Vender meu carro
                    </button>
                </nav>
            </div>
            <div className='filter-container'>
                <div style={{ display: 'flex' }}>
                    <CheckBox text='Novos' />
                    <CheckBox text='Usados' />
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%' }}>
                        <input style={{ width: '100%' }} type='text' placeholder='Onde: ' />
                        <input type='text' placeholder='Raio: ' />
                        <input type='text' placeholder='Ano desejado ' />
                        <input type='text' placeholder='Faixa de preço' />
                    </div>

                    <div style={{ width: '50%', padding: '0.5%', display: 'flex', justifyContent:'space-between' , flexWrap: 'wrap' }}>

                        <SelectComponent
                            data={brands}
                            selectedValue={() => selectedBrand ? brands.find(x => +x.ID === +selectedBrand).Name : 'Todas'}
                            event={handleBrand}
                            disabled={false}
                            fixedPlaceholder='Marca:'
                            size='50%'
                        />

                        <SelectComponent
                            data={models}
                            selectedValue={() => selectedModel ? models.find(x => +x.ID === +selectedModel).Name : 'Todos'}
                            event={handleModels}
                            disabled={selectedBrand !== '' ? false : true}
                            fixedPlaceholder='Modelo:'
                            size='48%'
                        />

                        <SelectComponent
                            data={versions}
                            selectedValue={() => selectedVersion ? versions.find(x => +x.ID === +selectedVersion).Name : 'Todas'}
                            event={handleVersions}
                            disabled={selectedModel !== '' ? false : true}
                            fixedPlaceholder='Versão:'
                            size='100%'
                        />

                    </div>
                </div>

                <div>
                    <button>Busca Avançada</button>
                    <button onClick={clearAll}>Limpar filtros</button>
                    <button className='submit-button' onClick={filter} >
                        Ver ofertas
                    </button>
                </div>
            </div>

            <div className='result-container'>
                {vehicles.map(vehicle => (
                    <div className='vehicle-container' key={vehicle.ID}>
                        <div>
                            <img src={vehicle.Image} alt='carro' />
                        </div>

                        <div>{vehicle.Make} {vehicle.Model}</div>
                        <div>{vehicle.Version}</div>
                        <div>Cor: {vehicle.Color}</div>
                        <div>R$ {vehicle.Price}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>{vehicle.YearFab}/{vehicle.YearModel}</div>
                            <div>{vehicle.KM}</div>
                        </div>
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
