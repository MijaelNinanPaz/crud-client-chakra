// Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

// Extend the theme to include custom colors, fonts, etc

const colors = {
    cool: {
        primaryLight: '#63B3ED',
        primaryDark: '#007FFF',
        secondaryLight: 'white',
        secondaryDark: '#132F4C',
        accent: '#2a69ac',
        neutralLight: '#F3F6F9',
        neutralDark: '#0A1929',
    },
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    }
}   // Update colors is posible: add, remove, or modify colors; and the name of group 'brand'

//Modify the fonts
const fonts = {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif'
}

// Add your color mode config
const config = {
    initialColorMode: 'light',  // 'system', 'dark' or 'light' (system, suscribe to user system color mode)
    useSystemColorMode: false, // false by default, true the color mode update automatically with user system color mode
}

const Button = {
    // //baseStyle: change style of all buttons
    // baseStyle: {
    //     fontWeight: 'light',
    //     borderRadius: '30px',
    //     _hover: {
    //         boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.18)',
    //     }
    // },
//     // modify especific variants of buttons
    variants: {
        cool6: {
            // borderRadius:'50px',
            // textTransform: 'uppercase',
            fontWeight: 'light',
            letterSpacing: '1px',
            color: 'white',
            bg: 'cool.primaryLight',
            _hover: {
                bg: 'cool.primary',
                borderColor: 'cool.primary',
                boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.18)'
            },
            _active: {
                bg: '#153e75',
                borderColor: '#153e75'
            }
        },
//         // or add new custom variant 'cool6' is possible
//         cool6: {
//             textTransform: 'uppercase',
//             bg: 'cool.primary',
//             color: 'cool.secondary',
//             border: '1px solid',
//             borderColor: 'cool.primary',
//             _hover: {
//                 bg: 'cool.secondary',
//                 color: 'cool.primary',
//             },
//             fontWeight: 'normal',
//         }
    }
}

// const Heading = {
//     variants: {
//         coolBanner: {
//             testTransform: 'uppercase',
//             fontWeight: 'light',
//             letterSpacing: '5px',
//             color: 'cool.primary',
//         }
//     }
// }
// //Export color and fonts, and Button and Heading as Components
// export const theme = extendTheme({ colors, fonts, config, components: { Button, Heading } })

export const theme = extendTheme({ colors, fonts, config, components: { Button } })