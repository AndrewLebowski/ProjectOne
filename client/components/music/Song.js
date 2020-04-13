import React from 'react';
import ReactPlayer from 'react-player';
import { Card, 
         CardContent, 
         CardHeader,
         Typography } from '@material-ui/core';

const styles = {
    song: {
        marginBottom: 60
    },
    container: {
        padding: 37
    },
    video: {
        width: '100%',
        height: 420,
        marginTop: 30,
        backgroundColor: 'black'
    },
    songDate: {
        color: 'grey',
        marginTop: 50
    }
};

const Song = (props) => {
    return (
        <div style={styles.song}>
            <Card style={styles.container}>
                <CardHeader
                    title={props.song.author}
                    subheader={props.song.genre}
                />
                <CardContent>
                    <audio controls>
                        <source src={'/myapi/music/' + props.song._id} />
                    </audio>
                    {/* <ReactPlayer 
                        url={'/myapi/music/' + props.song._id}
                        controls
                    /> */}
                    <Typography style={styles.songDate}>
                        {new Date(props.song.created).toDateString()}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Song;
