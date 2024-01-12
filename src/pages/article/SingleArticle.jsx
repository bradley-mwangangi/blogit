import './SingleArticle.css'
import {red} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import AddCommentIcon from '@mui/icons-material/AddComment';
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

const SingleArticle = () => {
    // Dummy data for the article
    const articleData = {
        author: 'Awesome Author',
        date: 'September 14, 2016',
        title: 'Shrimp and Chorizo Paella',
        content:
            'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
        image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    };

    // Dummy function for handling click events
    const handleClick = () => {
        // Implement your click handling logic here
    };

    return (
        <div style={{padding: '1.0625rem'}}>
            <Card style={{ border: "none", boxShadow: "none" }}
                  sx={{maxWidth: 800, margin: '0 auto'}}
            >
                <CardHeader
                    sx={{padding: 0}}
                    title={
                        <div>
                            <Typography variant="h3" sx={{ marginBottom: '0.5rem' }}>
                                {articleData.title}
                            </Typography>
                        </div>
                    }
                    subheader={
                        <div style={{ display: 'flex'}}>
                            <div style={{ marginRight: '1rem' }}>
                                <Avatar sx={{ bgcolor: red[500] }}>AA</Avatar>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="body1">{articleData.author}</Typography>
                                <Typography variant="body2">{articleData.date}</Typography>
                            </div>
                        </div>
                    }
                />

                <CardActions disableSpacing
                             style={{ borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0' }}
                             sx={{
                                 position: 'relative', padding: 0,
                                 marginTop: 5, marginBottom: 5
                             }}
                >
                    <IconButton aria-label="add comment">
                        <AddCommentIcon/>
                    </IconButton>
                    <div style={{marginLeft: 'auto'}}>
                        <IconButton aria-label="bookmark">
                            <BookmarkAddIcon/>
                        </IconButton>
                        <IconButton aria-label="more options">
                            <MoreVertIcon/>
                        </IconButton>
                    </div>
                </CardActions>
                <CardMedia
                    component="img"
                    height="400"
                    image={articleData.image}
                    alt="ArticleCard"
                    style={{ margin: '5px auto 0' }}
                />
                <CardContent style={{maxWidth: 750, margin: '0 auto'}}>
                    <Typography variant="body1" color="text.secondary">
                        {articleData.content}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default SingleArticle;

