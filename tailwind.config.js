/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                gold: "#A0830B",
                blueGray: "#617091",
                inputGray: "#667085",
                gray2: "#A3ABBC",
                dbGray: "#283656",
                lightGray: "#E6E9ED",
            },
            boxShadow: {
                vc: "0px 4px 15px 0px rgba(0, 0, 0, 0.05)",
                nav: "0 0 22px rgba(0,0,0,.1)",
                card: "0px 0px 15px 0px rgba(159, 169, 191, 0.10)",
            },
            fontFamily: {
                "J-Black": ["Jost-Black", "sans-serif"],
                "J-Regular": ["Jost-Regular", "sans-serif"],
                "J-Medium": ["Jost-Medium", "sans-serif"],
                "J-Bold": ["Jost-Bold", "sans-serif"],
                "J-SemiBold": ["Jost-SemiBold", "sans-serif"],
            },
        },
    },
    plugins: [],
};
