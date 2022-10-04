import { useState, FormEvent, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

// css, interfacde
import classes from './CardItem.module.scss';
import { CardRecipe } from '../../../util/interface';
import { API_URL } from '../../../api/config/http-config';

const CardItem = (props: { card: CardRecipe }) => {
  // const linkDetail = (id: number) => {
  //   <Link></Link>
  // }
  return (
    <>
      <div className={classes.card}>
        <Link to={`/detail/${props.card.id}`}>
          <Card sx={{ maxWidth: 225 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                // image={`${API_URL}image/${props.card.imgURL}`}
                image={`${API_URL}image?path=${props.card.imgURL}`}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.card.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.card.avgScore}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default CardItem;