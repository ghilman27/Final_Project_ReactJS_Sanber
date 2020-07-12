import React, { useState, useEffect } from 'react';
import styles from './News.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import API from '../../api';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: 50,
  },
});

// component to render each news article
const NewsItem = ({ article }) => {
  const classes = useStyles();

  return (
    <Link>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='Card Media'
            height='250'
            image={
              article.urlToImage
                ? article.urlToImage
                : 'http://sjd.law.wfu.edu/files/2020/01/No-Photo-Available.jpg' // place holder for no photos available
            }
            title='Card Media'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {article.title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {article.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Read
          </Button>
          <Button size='small' color='primary'>
            Share
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

// main component
const News = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  // fetch news from API when rendered
  useEffect(() => {
    const fetchAPI = async () => {
      setData(await API.getNews());
      setLoading(false);
    };

    fetchAPI();
  }, []);

  // show loading page if the data still processing
  if (isLoading) return <div>Loading .....</div>;

  return (
    <div>
      {/* the error goes here when loaded to codesandbox or google firebase, (after clicked the nav button)
      dunno why, guess it's a router problem in remote hosting. Try to clone the repo and build, it'll works! */}
      {data.map((article, index) => (
        <NewsItem key={index} article={article} />
      ))}
    </div>
  );
};

export default News;
