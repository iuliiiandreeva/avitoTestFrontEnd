// src/App.tsx
import './ant.css';
import {useState, useEffect} from 'react';
import './App.css';
import { Layout, Row, Col, Pagination, Spin, Radio, Select, Button } from 'antd';
import ProductCard from './ProductCard';
import ErrorComponent from './Error';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch} from './redux/store';
import { fetchGames, selectGames } from './redux/gameSlice';
import { setSelectedPlatform, setSelectedGenre, setSelectedSorting, resetSelectedGenre, resetSelectedSorting } from './redux/gameSlice';
import {Link} from 'react-router-dom';


const { Content } = Layout;




function Main() {
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
  const { Option } = Select;
  const { games, isLoading, error, selectedPlatform, selectedGenre, selectedSorting } = useSelector(selectGames);
  const dispatch = useDispatch<AppDispatch>();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 24;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentGames = games.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  const handlePlatformChange = (e:any) => {
    dispatch( setSelectedPlatform(e.target.value));
  };

  const handleGenreChange = (value:any) => {
    dispatch(setSelectedGenre(value));
  };

  const handleSortingChange = (value: any) => {
    dispatch(setSelectedSorting(value));
  };

  const handleGenreReset = (value: any) => {
    dispatch(resetSelectedGenre(value));
  };

  const handleSortingReset = (value: any) => {
    dispatch(resetSelectedSorting(value));
  };
  


  useEffect(() => {
    dispatch(fetchGames({ params: { platform: selectedPlatform, category: selectedGenre, 'sort-by': selectedSorting } }));
  }, [dispatch, selectedPlatform, selectedGenre, selectedSorting]);

  return (
    <Layout>
      {error ? 
      (<ErrorComponent  message={error}/>) 
      : 
      (
      <>
      <div style={{ padding: '20px' }}>
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
      <Button type="link" onClick={handleGenreReset}>
        Reset
      </Button>
      <Select
          placeholder="Select Sotring"
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
        <Button type="link" onClick={handleSortingReset}>
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
                <Link to={`/game/${game.id}`}>
                <ProductCard
                    name={game.title}
                    releaseDate={game.release_date}
                    author={game.publisher}
                    genre={game.genre}
                    imgSrc={game.thumbnail}
                />
                </Link>
            </Col>
            ))}
        </Row>
        <div className="pagination">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={games.length}
          showSizeChanger={false}
          showQuickJumper={true}
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

export default Main;
