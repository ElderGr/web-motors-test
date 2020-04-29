import React, { useEffect, useState, useRef } from 'react';

//components
import MenuItem from "../../Components/Menu/Item";
import CheckBox from "../../Components/Checkbox";
import SelectComponent from "../../Components/SelectComponent";
import InputGroup from "../../Components/InputGroup";
import VehicleContainer from "../../Components/VehicleContainer";

//assets
import bike from "../../assets/Img/bike.svg";
import car from "../../assets/Img/car.svg";
import logo from "../../assets/Img/logo.png";

//styles
import "./styles.css";

//services
import api from "../../Services/api";
import { FaChevronRight } from 'react-icons/fa';

function App(props) {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [versions, setVersions] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);
   
    const [vehicleType, setVehicleType] = useState('cars');

    const View = useRef(null);

    useEffect(() => {
        async function initialize() {
            const response = await api.get('/Make');
            setBrands(response.data);
        }

        // async function initializeVehicles() {
        //     const response = await api.get(`/Vehicles?Page=${selectedPage}`);
        //     setVehicles(response.data);
        // }

        document.addEventListener('scroll', handleScroll)

        // initializeVehicles()
        initialize();
    }, [])

    useEffect(() =>{
        async function initializeVehicles() {
            console.log('testando')

            const response = await api.get(`/Vehicles?Page=${selectedPage}`);
            let newVehicles = vehicles;

            newVehicles.push(...response.data)
            setVehicles(newVehicles);
        }

        initializeVehicles()
    }, [selectedPage])

    const handleScroll = async () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            setSelectedPage(selectedPage + 1)
            // const response = await api.get(`Vehicles?Page=${selectedPage + 1}`);
            // let existentVehicles = vehicles;
            // console.log(vehicles)

            // existentVehicles.push(...response.data);
            // setVehicles(existentVehicles)
        }
    }


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
    }


    return (
        <div onScroll={() => console.log(View)}>
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
                    <div style={{ width: '50%', padding: '0.5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <InputGroup />

                        <SelectComponent
                            data={[]}
                            selectedValue={() => { }}
                            event={() => { }}
                            disabled={true}
                            fixedPlaceholder='Ano Desejado:'
                            size='48%'
                        />

                        <SelectComponent
                            data={[]}
                            selectedValue={() => { }}
                            event={() => { }}
                            disabled={true}
                            fixedPlaceholder='Faixa de preço:'
                            size='48%'
                        />
                    </div>

                    <div style={{ width: '50%', padding: '0.5%', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

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

                <div className='buttons-container'>
                    <div>
                        <button className='search-button'>
                            <FaChevronRight />
                            Busca Avançada
                        </button>
                    </div>
                    <div>
                        <button className='clear-button' onClick={clearAll}>Limpar filtros</button>
                        <button className='submit-button' onClick={filter} >
                            Ver ofertas
                        </button>
                    </div>
                </div>
            </div>

            <div className='result-container'>
                {vehicles.map(vehicle => (
                    <VehicleContainer key={vehicle.ID} vehicle={vehicle} />
                ))}
            </div>

            <div className='pagination-container'>
                {/* <button onClick={() => setSelectedPage('1')}>1</button>
                <button onClick={() => setSelectedPage('2')}>2</button>
                <button onClick={() => setSelectedPage('3')}>3</button> */}
            </div>
        </div>

    );
}

export default App;