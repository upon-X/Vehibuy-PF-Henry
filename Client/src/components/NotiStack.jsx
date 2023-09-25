import { enqueueSnackbar } from "notistack";

const autoHideDurationInSeconds = 3000; // Tiempo en segundos para que la notificación se cierre automáticamente

export const CarRemovedFromCart = () => {
    enqueueSnackbar('The car has been removed from cart', {
        variant: 'info',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const CarAddedToCart = () => {
    enqueueSnackbar('The car has been added to cart', {
        variant: 'info',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const SignedSuccesfully = () => {
    enqueueSnackbar('Signed in successfully', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const AlreadyAccountWithEmail = () => {
    enqueueSnackbar('Already have a user account with this email', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const WrongEmailPassword = () => {
    enqueueSnackbar('Wrong email or password', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const PutEmailPassword = () => {
    enqueueSnackbar('Put your email and password', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const RegisteredSucessfully = () => {
    enqueueSnackbar('Your account has been created successfully!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const RegisterFail = () => {
    enqueueSnackbar('An error occurred while creating your account. Please try again later', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const FillInputsFixErrors = () => {
    enqueueSnackbar('Please fill all required fields and fix any validation errors', {
        variant: 'warning',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const MercadoPagoSuccess = () => {
    enqueueSnackbar('Thanks for buying at VehiBuy', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        },
        autoHideDuration: autoHideDurationInSeconds,
    })
}

export const MercadoPagoFail = () => {
    enqueueSnackbar('There was a problem with the payment method, try with another later', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const NeedToLogin = () => {
    enqueueSnackbar('You need to Log In to buy a car', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const Banned = () => {
    enqueueSnackbar('You have been banned by an Admin', {
        variant: "error",
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}
export const logOut = () => {
    enqueueSnackbar('You logged out successfully', {
        variant: "info",
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}
export const modificationUserSuccess = () => {
    enqueueSnackbar('Your product has been successfully modified!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const deleteUserSuccess = () => {
    enqueueSnackbar('Your account has been deleted successfully!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const uploadImageSuccess = () => {
    enqueueSnackbar('Your image has been upload successfully!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}
export const uploadImageFail = () => {
    enqueueSnackbar('The image upload failed', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const postReviewNoti = () => {
    enqueueSnackbar('Your review is successfully published', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const deleteReviewNoti = () => {
    enqueueSnackbar('Your review is successfully deleted', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const updateReviewNoti = () => {
    enqueueSnackbar('Your review is successfully updated', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const errorReviewNoti = () => {
    enqueueSnackbar('You have already published a review', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const logOutUserSuccess = () => {
    enqueueSnackbar('session has been successfully log out!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const verifyDeleteFav = () => {
    enqueueSnackbar('You removed the cart from Favorites', {
        variant: 'info',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const typeUser = (userName) => {
    enqueueSnackbar(`Welcome ${userName}!`, {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const typeAdmin = () => {
    enqueueSnackbar(`Welcome Admin!`, {
        variant: 'warning',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    })
}

export const alertFilterValues = () => {
    enqueueSnackbar('Please enter supported values', {
        variant: 'error',
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        }
    })
}

export const createProductSuccess = () => {
    enqueueSnackbar('Your product has been created successfully!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

export const removeImage = () => {
    enqueueSnackbar('Your product has been removed successfully!', {
        variant: 'success',
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }
    });
}

