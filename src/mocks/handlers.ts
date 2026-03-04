import { http, HttpResponse, delay } from 'msw';
import { db } from './db';
import type { Bet, CoinFlipRequest, CoinFlipResult, BetHistoryResponse } from '@/constants/types';

export const handlers = [
    http.get('/api/user', async () => {
        await delay(1000);
        const userData = db.getUserData();
        return HttpResponse.json(userData);
    }),
    http.post('/api/coin-flip', async ({ request }) => {
        const body = (await request.json()) as CoinFlipRequest;
        const { amount, currency, chosenSide } = body;

        await delay(800);

        const user = db.getUserData();
        const currentBalance = user.balances[currency];

        if (amount > currentBalance) {
            return HttpResponse.json(
                { error: "Insufficient balance" },
                { status: 400 }
            );
        }

        if (amount <= 0) {
            return HttpResponse.json(
                { error: "Bet amount must be positive" },
                { status: 400 }
            );
        }

        // Randomize the side, then compare to chosen
        const side = Math.random() >= 0.5 ? "heads" : "tails";
        const isWin = side === chosenSide;
        const outcome = isWin ? "win" : "loss";
        const betAfterWin = isWin ? amount * 2 : 0;
        const newBalance = isWin
        ? currentBalance + betAfterWin
        : currentBalance - amount;

        db.updateBalance(currency, newBalance);

        const bet: Bet = {
            id: crypto.randomUUID(),
            amount,
            profit: betAfterWin,
            currency,
            outcome,
            balanceAfter: newBalance,
            timestamp: new Date().toISOString(),
        };

        db.saveBet(bet);

        const result: CoinFlipResult = {
            outcome,
            side,
            newBalance,
            bet,
        };

        return HttpResponse.json(result);
    }),

    http.get('/api/bet-history', async ({ request }) => {
        await delay(200);

        const url = new URL(request.url);
        const outcome = url.searchParams.get("outcome");
        const minAmount = url.searchParams.get("minAmount");
        const maxAmount = url.searchParams.get("maxAmount");
        const currency = url.searchParams.get("currency");

        let bets = db.getBetHistory();

        // Apply filters
        if (outcome && outcome !== "all") {
            bets = bets.filter((b: { outcome: string; }) => b.outcome === outcome);
        }

        if (currency && currency !== "all") {
            bets = bets.filter((b: { currency: string; }) => b.currency === currency);
        }

        if (minAmount) {
            const min = parseFloat(minAmount);
            if (!isNaN(min)) {
                bets = bets.filter((b: { amount: number; }) => b.amount >= min);
            }
        }

        if (maxAmount) {
            const max = parseFloat(maxAmount);
            if (!isNaN(max)) {
                bets = bets.filter((b: { amount: number; }) => b.amount <= max);
            }
        }

        const response: BetHistoryResponse = {
            bets,
            total: bets.length,
        };

        return HttpResponse.json(response);
    }),
]