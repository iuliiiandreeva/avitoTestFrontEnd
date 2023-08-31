import React from 'react';
import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Typography, Image, Carousel, Spin, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import axios from 'axios';
import ErrorComponent from './Error';
import './GameCard.css';

const { Title, Text } = Typography;


interface ScreenShot {
  id: number;
  image: string;
}


const CardGame: React.FC<{}> = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [system, setSystem] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [screenshots, setScreenshots] = useState<ScreenShot[]>([]);
  const [genre, setGenre] = useState("");
  const [developer, setDeveloper] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchGameData = async (id:any) => {
    // Check if cached data exists and is not expired
    const cachedData = localStorage.getItem(`game_${id}`);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - timestamp <= 300000) {
        setTitle(data.title);
        setPublisher(data.publisher);
        setDeveloper(data.developer);
        setReleaseDate(data.release_date);
        setGenre(data.genre);
        setScreenshots(data.screenshots);
        setImgSrc(data.thumbnail);
        setSystem(data.minimum_system_requirements);
        setIsLoading(false);
        return;
      }
    }

    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
      params: { id: id },
      headers: {
        'X-RapidAPI-Key': '43fc9aae6cmsh93bd31160378652p19c5f3jsn42074c0ab659',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const statusCode = response.status;
      if (statusCode === 200) {
        // Cache the fresh data in Local Storage
        const currentTime = new Date().getTime();
        localStorage.setItem(
          `game_${id}`,
          JSON.stringify({ data: response.data, timestamp: currentTime })
        );

        setTitle(response.data.title);
        setPublisher(response.data.publisher);
        setDeveloper(response.data.developer);
        setReleaseDate(response.data.release_date);
        setGenre(response.data.genre);
        setScreenshots(response.data.screenshots);
        setImgSrc(response.data.thumbnail);
        setSystem(response.data.minimum_system_requirements);
      }
      setIsLoading(false);
    } catch (error:any) {
      if (error.response.status === 404) {
        setError(true);
        setErrorMessage('Objects not found');
        setIsLoading(false);
      } else if (error.response.status === 500) {
        setError(true);
        setErrorMessage('Something went wrong on our side');
        setIsLoading(false);
      } else {
        setError(true);
        setErrorMessage('SomeError');
      }
    }
  };
  useEffect(() => {fetchGameData(id)}, [id]);


  return (
    <div className="game">
      {error ? (<div className="game_back-btn">
        <Link to="/">
        <ArrowLeftOutlined />
          <Text className="game_back-btn_text">Back to Main Page</Text>
          </Link>
        <ErrorComponent message={errorMessage} />
        </div>
        
      ) : (
        <>
        <div className="game_back-btn">
        <Link to="/">
          <Button>
            <ArrowLeftOutlined />
            <Text className="game_back-btn_text">Back to Main Page</Text>
          </Button>
          </Link>
        </div>
          {isLoading ? (
            <div className="loading">
              <Spin size="large" />
            </div>
          ) : (
            <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
          <Title>{title}</Title>
        </Col>
      </Row>

      {/* Game Information Row */}
      <Row gutter={16}>
        <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
          <Image src={imgSrc} alt={title} width="100%" />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={14} xxl={14}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Text strong>Publisher: </Text>
              <Text>{publisher}</Text>
              <br />
              <br/>
              <br/>
              <Text strong>Developer: </Text>
              <Text>{developer}</Text>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Text strong>Genre: </Text>
              <Text>{genre}</Text>
              <br />
              <br/>
              <br/>
              <Text strong>Release Date: </Text>
              <Text>{releaseDate}</Text>
              <br />
            </Col>
          </Row>
          {!(system === undefined) ? (
            <Row style={{ marginTop: '5vh' }}>
            <Col offset={6} span={12}>
          <Title level={3} >System:</Title>
          <br/>
            {Object.entries(system).map(([key, value], index) => (
              <div key={index}>
                <Text strong>{key}:</Text>
                <Text>{value}</Text>
              </div>
            ))}
            </Col>
          </Row>
          ) : (
            <></>
          )}
        </Col>
      </Row>

      {/* Screenshots */}
      <Row>
        <Col span={24}>
          {screenshots.length === 0 ? (
            <></>
          ) : (
            <div>
              <div style={{ textAlign: 'center' }}>
                <Title>Screenshots</Title>
              </div>
              <Carousel autoplay >
                {screenshots.map((screenshot, index) => (
                  <div key={index}>
                    <Image src={screenshot.image} alt={`Screenshot ${index}` } width={"100vw"} />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </Col>
      </Row>
              
            </>
          )}
        </>
      )}
    </div>
  );
}
  

export default CardGame;
