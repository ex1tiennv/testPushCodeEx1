/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'landing-about-bg':
                    'linear-gradient(to bottom right, rgba(81, 81, 229, 1), rgba(209, 109, 151, .4)), url(/images/landing-about-bg.png)',
                'landing-registration-bg':
                    'url(/images/landing-registration-bg.png)',
                'login-bg': 'url(/images/login-bg.png)',
            },
            colors: {
                primary: 'rgba(81, 81, 229, 1)',
                secondary: 'rgba(106, 40, 190, 1)',
                'yellow-sunrise': 'rgba(255, 236, 61, 1)',
                'neutral/5': 'rgba(217, 217, 217, 1)',
                'neutral/4': 'rgba(240, 240, 240, 1)',
                'neutral/2': 'rgba(250, 250, 250, 1)',
                'orange-sunset': 'rgba(255, 247, 230, 1)',
                'gray-sunset': 'rgb(245, 245, 245)',
                'black-45': 'rgba(0, 0, 0, .45)',
                'black-25': 'rgba(0, 0, 0, .25)',
                'dust-red': 'rgba(255, 77, 79, 1)',
                'polar-green': 'rgba(82, 196, 26, 1)',
            },
            boxShadow: {
                '01': '0px -1px 0px 0px #F0F0F0 inset',
                '02':'0px 2px 0px 0px #0000000B'
            },
            keyframes:{
                'scale-up-card' : {
                    '0%': {
                      '-webkit-transform': "scale(1)",
                              transform:' scale(1)',
                    },
                    '100%' : {
                      '-webkit-transform': 'scale(1.02)',
                              transform: 'scale(1.02)',
                    }
                  },
                  'scale-down-card' : {
                    '0%': {
                      '-webkit-transform': "scale(1.02)",
                              transform:' scale(1.02)',
                    },
                    '100%' : {
                      '-webkit-transform': 'scale(1)',
                    }
                  },
            },
            animation:{
                'scale-up-card' :'scale-up-card 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
                'scale-down-card' :'scale-down-card 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
            }
        },
    },
    plugins: [
        function ({ addVariant }) {
            addVariant('child', '& > *')
            addVariant('child-hover', '& > *:hover')
        },
    ],
    important: true,
}
