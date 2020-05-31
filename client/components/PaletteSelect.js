import React from 'react';
import { useCookies } from 'react-cookie';
import { MenuItem,
         FormControl,
         Typography,
         Select,
         Button } from '@material-ui/core';
import paletteController from '../PaletteController';

const styles = {
    container: {
        padding: 15
    },
    formControl: {
        width: '100%',
    },
    applyButton: {
        marginTop: 15,
        color: 'white'
    }
};

const PaletteSelect = (props) => {
    const [ cookies, setCookie ] = useCookies(['OneProjectPalette']);

    const handleChange = (event) => {
        props.setPalette(event.target.value);
    };

    return (
        <div style={styles.container}>
            <Typography 
                variant='caption'
                style={{color: paletteController.textColor}} 
            >
                Color palette
            </Typography>
            <FormControl size='small' style={styles.formControl}>
                <Select
                    variant='outlined'
                    onChange={handleChange}
                    value={props.palette}
                >
                    <MenuItem value='standart'>Standart</MenuItem>
                    <MenuItem value='dark classic'>Dark Classic</MenuItem>
                    <MenuItem value='dark blue'>Dark Blue</MenuItem>              
                    <MenuItem value='lime'>Lime</MenuItem>       
                    <MenuItem value='metal'>Metal</MenuItem>            
                </Select>
            </FormControl>
            <Button
                onClick={() => setCookie('OneProjectPalette', props.palette)}
                style={{
                    backgroundColor: paletteController.mainColor,
                    ...styles.applyButton
                }}
            >
                Apply
            </Button>
        </div>
    );
}

export default PaletteSelect;
