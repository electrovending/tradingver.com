import ccxt
import numpy as np

def calcular_rsi_abajo_de_30(symbol, timeframe):
    exchange = ccxt.binance()
    ohlcv = exchange.fetch_ohlcv(symbol, timeframe)
    close_prices = np.array([data[4] for data in ohlcv])  # Precios de cierre
    rsi = calculate_rsi(close_prices, period=14)  # Calcula el RSI con un período de 14

    count_below_30 = np.sum(rsi < 30)

    return count_below_30

def calculate_rsi(prices, period=14):
    changes = np.diff(prices)
    gains = np.where(changes > 0, changes, 0)
    losses = np.where(changes < 0, -changes, 0)

    avg_gain = np.mean(gains[:period])
    avg_loss = np.mean(losses[:period])

    rs = avg_gain / avg_loss if avg_loss != 0 else 0
    rsi = 100 - (100 / (1 + rs))

    for i in range(period, len(prices)):
        current_gain = max(changes[i - 1], 0)
        current_loss = -min(changes[i - 1], 0)
        avg_gain = (avg_gain * (period - 1) + current_gain) / period
        avg_loss = (avg_loss * (period - 1) + current_loss) / period
        rs = avg_gain / avg_loss if avg_loss != 0 else 0
        rsi = np.append(rsi, 100 - (100 / (1 + rs)))

    return rsi

# Uso del script
symbol = 'DOGE/USDT'  # Cambia el símbolo según el par de criptomonedas de futuros que quieras analizar
timeframe = '5m'  # Marco de tiempo (5 minutos)
count = calcular_rsi_abajo_de_30(symbol, timeframe)
print(f"El RSI estuvo por debajo de 30 {count} veces en los últimos 5 minutos.")
