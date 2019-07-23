import {
  container,
  mlAuto,
  mrAuto,
  cardTitle,
  description,
  main,
  mainRaised
} from '../material-kit-pro-react'
import modalStyle from '../material-kit-pro-react/modalStyle'

const styles = theme => {
  return {
    ...modalStyle(theme),
    container,
    cardTitle,
    description,
    mlAuto,
    mrAuto,
    main,
    mainRaised,
    registerButton: {
      backgroundImage: 'linear-gradient(to right, #f6655a, #f9574c, #fc473e, #fe332f, #ff101f)',
      fontSize: [['30px'], '!important']
    },
    tagline: {
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: '17px',
      borderRadius: '20px',
      margin: '10px auto',
      color: '#fafafa',
      textAlign: 'center'
    },
    centerGrid: {
      flexDirection: 'column',
      alignItems: 'center'
    },

    register: {
      backgroundColor: '#262323',
      backgroundImage: 'url("https://www.transparenttextures.com/theme/images/transparent.png")',
      color: '#fafafa',
      border: '2px solid #81d6e3',
      '& h3': {
        color: '#fafafa'
      },
      '& h4': {
        color: '#fafafa'
      },
      '& input': {
        color: '#fafafa',
        height: '19px'
      }
    },

    textCenter: {
      textAlign: 'center'
    },
    loginHeader: {
      backgroundImage:
        'linear-gradient(to right, #81d6e3, #78d5e3, #6ed4e3, #63d2e4, #57d1e4, #4fd0e4, #45cee4, #3acde4, #32cce4, #28cbe5, #1ac9e5, #02c8e6)',
      background: 'transparent'
    },
    cardTitleWhite: {
      ...cardTitle,
      color: '#FFFFFF !important'
    },
    socialLine: {
      marginTop: '1rem',
      textAlign: 'center',
      padding: '0'
    },
    inputAdornment: {
      marginRight: '18px',
      position: 'relative'
    },
    inputAdornmentIcon: {
      color: '#495057'
    },
    socialLineButton: {
      '&, &:hover': { color: '#fff' },
      marginLeft: '5px',
      marginRight: '5px'
    },
    cardLoginBody: {
      paddingTop: '0',
      paddingBottom: '0'
    },
    icon: {
      width: '24px',
      height: '24px',
      color: '#495057'
    },
    infoArea: {
      padding: '0px 0px 20px !important'
    },
    justifyContentCenter: {
      WebkitBoxPack: 'center !important',
      MsFlexPack: 'center !important',
      justifyContent: 'center !important'
    },
    loginButton: {
      backgroundImage:
        'linear-gradient(to right, #81d6e3, #78d5e3, #6ed4e3, #63d2e4, #57d1e4, #4fd0e4, #45cee4, #3acde4, #32cce4, #28cbe5, #1ac9e5, #02c8e6)',
      color: '#fafafa !important'
    },
    section: {
      padding: '70px 0 0'
    },
    resetInput: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      padding: '10px 40px'
    },
    autofillOverride: {
      '& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill, textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, select:-webkit-autofill, select:-webkit-autofill:hover, select:-webkit-autofill:focus': {
        '-webkit-box-shadow': '0 0 0 30px #262323 inset !important',
        border: 'none !important',
        '-webkit-text-fill-color': '#fafafa !important',
        transition: 'background-color 5000s ease-in-out 0s'
      }
    },
    belowTheFold: {
      width: '100%',
      backgroundImage:
        'linear-gradient(to bottom, #000000, #080003, #0d0009, #0f0011, #0d0217, #0d0217, #0d0217, #0d0217, #0f0011, #0d0009, #080003, #000000)'
    },
    mainAddendum: {
      backgroundColor: 'rgb(38, 35, 35)',
      backgroundImage: 'url(https://www.transparenttextures.com/patterns/dark-matter.png)'
    },
    foldBox: {
      borderRadius: '6px',
      padding: '20px',
      marginBottom: '60px',
      backgroundColor: '#8080802e',
      maxWidth: '100%'
    },
    greenGradient: {
      backgroundImage: 'linear-gradient(to left, #4cb5ae, #63c6c0, #79d8d1, #8feae4, #a4fcf6)'
    },
    redGradient: {
      backgroundImage: 'linear-gradient(to right, #ff101f, #fe3037, #fb454b, #f7565e, #f1666f)'
    },
    blueGradient: {
      backgroundImage: 'linear-gradient(to right, #b2ddf7, #9cceed, #86bfe3, #6fb1da, #56a2d0)'
    }
  }
}

export default styles
