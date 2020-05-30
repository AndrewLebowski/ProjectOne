import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         Button,
         CardActions } from '@material-ui/core';
import userApi from '../../api/user.api';
import paletteController from '../../PaletteController';
import SuccessWindow from '../SuccessWindow';

const styles = {
    card: {
        width: '55%',
        minHeight: 200,
        padding: 50
    },
    passwordInput: {
        marginTop: 40,
        width: '100%'
    },
    confirmPassword: {
        marginTop: 30,
        width: '100%'
    },
    linkContainer: {
        marginTop: 30
    },
    changePasswordButton: {
        color: 'white',
        marginTop: 60
    },
    loginButton: {
        color: 'white',
        marginTop: 60
    }
};

const ResetPasswordForm = () => {
    const [ requestedPassword, setPassword ] = React.useState('');
    const [ confirmedPassword, setConfirmedPassword ] = React.useState('');
    const [ passwordError, setPasswordError ] = React.useState('');
    const [ successed, setSuccessed ] = React.useState(false);

    let { email, resetToken } = useParams();

    const onChangePassword = async () => {
        const userData = {
            password: requestedPassword,
            confirmedPassword: confirmedPassword
        };
        const data = await userApi.resetPassword(userData, email, resetToken);
        data.passwordError ? setPasswordError(data.passwordError) : setPasswordError('');
        data.message ? setSuccessed(true) : null;
    };
    
    return (
        <div>
            <Card 
                style={{
                    backgroundColor: paletteController.cardColor,
                    ...styles.card
                }}
            >   
                <CardContent>
                    <Typography
                        id='page-title'
                        variant='h5'
                        style={{
                            color: paletteController.textColor
                        }}
                    >
                        Set new password
                    </Typography>

                    <TextField
                        id='password'
                        required
                        label='Password' 
                        variant='outlined'
                        placeholder='Type your new password...'
                        type='password'
                        value={requestedPassword} 
                        style={styles.passwordInput} 
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <br/>
                    <TextField
                        id='confirm-password'
                        required
                        label='Confirm password' 
                        variant='outlined'
                        placeholder='Confirm password...'
                        type='password'
                        value={confirmedPassword} 
                        style={styles.confirmPassword} 
                        onChange={(event) => setConfirmedPassword(event.target.value)}
                    />
                    <br/>
                    { passwordError ? (<Typography id='password-error' color='error'>{passwordError}</Typography>) : null }

                    <CardActions>
                        <Button
                            id='change-password-button'
                            onClick={onChangePassword}
                            style={{
                                backgroundColor: paletteController.mainColor,
                                ...styles.changePasswordButton
                            }} 
                        >
                            Change password
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
            <SuccessWindow
                open={successed}
                message='Password has been changed successfully'
                onClick={() => setSuccessed(false)}
            />
        </div>
    )
};

export default ResetPasswordForm;
