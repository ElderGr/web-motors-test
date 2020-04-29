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

    useEffect(() => {
        async function initialize() {
            try{
                const response = await api.get('/Make');
                setBrands(response.data);
            }catch(err){
                console.log(err)
            }

        }

        document.addEventListener('scroll', handleScroll)

        initialize();
    }, [])

    useEffect(() =>{
        async function initializeVehicles() {
            try{
                if(selectedPage * 10 !== vehicles.length){
                    const response = await api.get(`/Vehicles?Page=${selectedPage}`);
                    let newVehicles = [...vehicles, ...response.data];
        
                    setVehicles(newVehicles);
                }else{
                    console.log('pagina ja carregada')
                }
            }catch(err){
                console.log(err)
            }
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
            let page = selectedPage + 1;
            setSelectedPage(page)
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
        <div style={{display: 'flex', flexDirection: 'column'}} >
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
                <div>
                    <CheckBox text='Novos' />
                    <CheckBox text='Usados' />
                </div>

                <div>
                    <div>
                        <InputGroup />

                        <SelectComponent
                            data={[]}
                            selectedValue={() => { }}
                            event={() => { }}
                            disabled={true}
                            fixedPlaceholder='Ano Desejado:'
                            size='half'
                        />

                        <SelectComponent
                            data={[]}
                            selectedValue={() => { }}
                            event={() => { }}
                            disabled={true}
                            fixedPlaceholder='Faixa de preço:'
                            size='half'
                        />
                    </div>

                    <div>

                        <SelectComponent
                            data={brands}
                            selectedValue={() => selectedBrand ? brands.find(x => +x.ID === +selectedBrand).Name : 'Todas'}
                            event={handleBrand}
                            disabled={false}
                            fixedPlaceholder='Marca:'
                            size='half'
                        />

                        <SelectComponent
                            data={models}
                            selectedValue={() => selectedModel ? models.find(x => +x.ID === +selectedModel).Name : 'Todos'}
                            event={handleModels}
                            disabled={selectedBrand !== '' ? false : true}
                            fixedPlaceholder='Modelo:'
                            size='half'
                        />

                        <SelectComponent
                            data={versions}
                            selectedValue={() => selectedVersion ? versions.find(x => +x.ID === +selectedVersion).Name : 'Todas'}
                            event={handleVersions}
                            disabled={selectedModel !== '' ? false : true}
                            fixedPlaceholder='Versão:'
                            size='stretch'
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

            {/* <div className='pagination-container'>
                <button onClick={() => setSelectedPage(1)}>1</button>
                <button onClick={() => setSelectedPage(2)}>2</button>
                <button onClick={() => setSelectedPage(3)}>3</button>
            </div> */}
        </div>

    );
}

export default App;
