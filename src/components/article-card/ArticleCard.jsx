import "./ArticleCard.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import {Chip, Stack} from "@mui/material";

const ArticleCard = () => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        AA
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Awesome Author"
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6">Shrimp and Chorizo Paella</Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <Stack direction="row" spacing={1} sx={{justifyContent: "space-between", alignItems: "center"}}>
                <div className="chips">
                    <Chip size="small" label="peas" onClick={handleClick} />
                    <Chip size="small" label="shrimp" onClick={handleClick} />
                </div>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <BookmarkAddIcon />
                    </IconButton>
                </CardActions>
            </Stack>
        </Card>
    );
};

export default ArticleCard;
