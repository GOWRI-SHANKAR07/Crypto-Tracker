import { Pagination } from "@mui/lab";
import {
  Container,
  InputBase,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import "../Styles/CoinsTable.css";

export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [ids, setIds] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { currency, symbol } = CryptoState();

  // Fetch coins function
  const fetchCoins = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/coin");
      if (Array.isArray(response.data)) {
        console.log(response.data, "DATA");
        setCoins(response.data);
        setDataLoaded(true); // Assuming you have a state variable to track data loading
      } else {
        console.error("Coins data is not an array:", response.data);
        // Handle the unexpected data format appropriately
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
      // Handle the error appropriately
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  // Handle search function
  const handleSearch = () => {
    if (!dataLoaded) return []; // If data is not loaded yet, return empty array
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        style={{
          margin: 20,
          fontFamily: "Montserrat",
        }}>
        Cryptocurrency Price by Market Gap
      </Typography>
      <InputBase
        placeholder="Search for a Crypto Currency"
        style={{
          marginBottom: 20,
          fontSize: 20,
          fontFamily: "Montserrat",
          width: "100%",
          border: "2px solid #eebc10",
          color: "#fff",
          padding: 10,
          borderRadius: 15,
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: "#eebc10" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Gap"].map((head) => (
                  <TableCell
                    style={{
                      color: "#000",
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}>
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ fontFamily: "Montserrat" }}>
              {coins.length > 0 &&
                handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className="Row"
                        key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 15,
                          }}>
                          <img src={row.image} alt={row.name} height="50" />
                          <div
                            className="TableCont"
                            style={{
                              fontFamily: "Montserrat",
                            }}>
                            <span
                              className="CoinTxt"
                              style={{
                                color: "#eebc10",
                                fontSize: 18,
                              }}>
                              {row.symbol}
                            </span>
                            <span
                              style={{
                                color: "#eebc10",
                              }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: "#eebc10",
                            fontSize: 18,
                            fontFamily: "Montserrat",
                          }}>
                          ₹ {numberWithCommas(row.current_price)}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontSize: 18,
                            fontFamily: "Montserrat",
                          }}>
                          {profit && "+"}
                          {numberWithCommas(row.price_change_24h.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: "#eebc10",
                            fontSize: 18,
                            fontFamily: "Montserrat",
                          }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Pagination
        style={{
          display: "flex",
          justifyContent: "center",
          padding: 15,
          backgroundColor: "gold",
        }}
        count={(handleSearch()?.length / 10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  );
}
