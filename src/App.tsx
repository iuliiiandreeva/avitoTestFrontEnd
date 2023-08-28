// src/App.tsx
import './ant.css';
import {useState, useEffect} from 'react';
import './App.css';
import { Layout, Row, Col, Pagination, Spin, Radio, Select, Button } from 'antd';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import AppHeader from './Header';
import ProductCard from './ProductCard';
import ErrorComponent from './Error';


const { Content } = Layout;


interface Product {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}



function App() {
  const { Option } = Select;
  axiosRetry(axios, { retries: 3 });
  const allGenres = [
    'mmorpg',
    'shooter',
    'strategy',
    'moba',
    'racing',
    'sports',
    'social',
    'sandbox',
    'open-world',
    'survival',
    'pvp',
    'pve',
    'pixel',
    'voxel',
    'zombie',
    'turn-based',
    'first-person',
    'third-Person',
    'top-down',
    'tank',
    'space',
    'sailing',
    'side-scroller',
    'superhero',
    'permadeath',
    'card',
    'battle-royale',
    'mmo',
    'mmofps',
    'mmotps',
    '3d',
    '2d',
    'anime',
    'fantasy',
    'sci-fi',
    'fighting',
    'action-rpg',
    'action',
    'military',
    'martial-arts',
    'flight',
    'low-spec',
    'tower-defense',
    'horror',
    'mmorts',
  ];
  const allSortingOptions = ['release-date', 'popularity', 'alphabetical', 'relevance'];
  const [games, setGames] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(); 
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState<string | null>();
  const [selectedSorting, setSelectedSorting] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string>();


  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 24;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the games array to get products for the current page
  const currentGames = games.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePlatformChange = (e: any) => {
    setSelectedPlatform(e.target.value);
  };
  

  const handleGenreChange = (e: any) => {
    setSelectedGenre(e);
  };
  const handleResetGenres = () => {
    setSelectedGenre(null);
  };

  const handleSortingChange = (value: string) => {
    setSelectedSorting(value);
  };
  const handleResetSorting = () => {
    setSelectedSorting(null);
  }


const fetchData = async (
  selectedPlatform:string,
  selectedGenre: string|null|undefined,
  selectedSorting: string | null | undefined,
  ) => {

  let options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: {
      platform: `${selectedPlatform}`,
    } as { platform: string; category?: string; 'sort-by'?: string;},
    headers: {
      'X-RapidAPI-Key': '43fc9aae6cmsh93bd31160378652p19c5f3jsn42074c0ab659',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
    },
  };

  if (selectedGenre) {
    options.params['category'] = `${selectedGenre}`;
  } else if (selectedGenre === null) {
    delete options.params['category'];
  }

  if (selectedSorting) {
    options.params['sort-by'] = `${selectedSorting}`;
  } else if (selectedSorting == null) {
    delete options.params['sort-by'];
  }
  try {
    const response = await axios.request(options);
    const statusCode: number = response.status;
    if (statusCode === 200) {
      setGames(response.data);
      setIsLoading(false);
    }
  }
  
  catch (error: any) {
    if (error.response.status === 404) {
      setError(true);
      setErrorMessage("Objects not found");
      setIsLoading(false);
    } else if (error.response.status === 500) {
      setError(true);
      setErrorMessage("Something went wrong on our side");
      setIsLoading(false);
    }
  }
  

  // Get the status code from the response

};


  useEffect(() => {
    setIsLoading(true);
    fetchData(selectedPlatform, selectedGenre, selectedSorting);
  }, [selectedPlatform, selectedGenre, selectedSorting]);

  return (
    <Layout>
      <AppHeader />
      {error ? 
      (<ErrorComponent  message={errorMessage}/>) 
      : 
      (
      <>
      <div style={{ padding: '20px' }}>
        {/* Platform Filter */}
        <Radio.Group onChange={handlePlatformChange} value={selectedPlatform}>
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="pc">PC</Radio.Button>
          <Radio.Button value="browser">Browser</Radio.Button>
        </Radio.Group>

        <Select
          placeholder="Select genre"
          style={{ width: '100%' }}
          onChange={handleGenreChange}
          value={selectedGenre}
          optionLabelProp="label"
          >
        {allGenres.map((genre) => (
          <Option key={genre} value={genre}>
            {genre}
          </Option>
        ))}
      </Select>
      <Button type="link" onClick={handleResetGenres}>
        Reset
      </Button>
      <Select
          placeholder="Select genre"
          style={{ width: '100%' }}
          onChange={handleSortingChange}
          value={selectedSorting}
          optionLabelProp="label"
        >
          {allSortingOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <Button type="link" onClick={handleResetSorting}>
        Reset
      </Button>

      </div>
      <Content style={{ padding: '20px' }}>
        {isLoading ? (<div className="loading">
          <Spin size="large"/>
        </div>) : (
          <>
          <Row gutter={[16, 16]}>
          {currentGames.map((game, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <ProductCard
                name={game.title}
                releaseDate={game.release_date}
                author={game.publisher}
                genre={game.genre}
                imgSrc={game.thumbnail}
              />
            </Col>
          ))}
        </Row>
        <div className="pagination">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={games.length}
          showSizeChanger={false}
          showQuickJumper={true} // Enables direct page input
          onChange={handlePageChange}
        />
      </div>
      </>
        )}

      </Content></>)
  }
    </Layout>
  );
}

export default App;
