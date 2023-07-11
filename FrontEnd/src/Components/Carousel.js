import { makeStyles } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import "../Styles/Carousel.css";
// import { numberWithCommas } from "../CoinsTable";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
 

const Carousel = () => {

    const [trending, setTrending] = useState([]);
    const [icons, setIcons] = useState();
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const response = await axios.get('http://localhost:3000/coinlist');
        setTrending(response.data);
        console.log(trending);
    };


    const fetchIcon = async() => {
        const icons = await axios.get(`https://cryptoicons.org/api/black/${trending.id}/400`)
        // settrend(icons);
    }

    useEffect(() => {
        fetchTrendingCoins();
    }, []);


    const items = trending.map((coin) => {
        let profit = coin.price_change_24h >= 0;

        return (

            <Link
                className="CarouselItem"
                to={`/coins/${coin.id}`}
            >
                <img
                    src={coin.image}
                    alt={coin.name}
                    height="90"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "gold" : "red",
                            fontWeight: 'bold',
                        }}
                    >
                        {profit && "+"}
                        {coin.price_change_24h.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price)}
                </span>
            </Link >
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div className="Carousel">
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    );
};

export default Carousel;