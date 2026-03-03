
import { Card, CardContent } from "@/components/ui/card";
import CoinFlip from "./coinflip";


const GameTab = () => {
    return (
        <div className='grid gap-6 lg:grid-cols-2'>
            <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
                <CardContent className='flex flex-col items-center justify-center py-12 min-w-lg'>
                    <CoinFlip />
                </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
                <Card className='border-border/50 bg-card/60 backdrop-blur-sm min-w-lg'>
                    <CardContent className='flex flex-col gap-5 pt-6'>
                        <p>History content goes here...</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default GameTab