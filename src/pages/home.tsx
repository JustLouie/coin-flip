
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import GameTab from "@/modules/game/game-tab";

const Home = () => {
  return (
    <div className='mx-auto mx-w-5xl px-4 py-6'>
      <Tabs defaultValue="game" className="w-full">
        <TabsList className='mb-6 grid w-full grid-cols-3 bg-card/60'>
            <TabsTrigger 
                value="game"
                className='font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
            >
                Game
            </TabsTrigger>
            <TabsTrigger
                value='history'
                className='font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
            >
                History
            </TabsTrigger>
            <TabsTrigger 
                value='statistics'
                className='font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground'
            >
                Statistics
            </TabsTrigger>
        </TabsList>
        <TabsContent value="game" className="mt-0">
          <GameTab />
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          <p>History content goes here...</p>
        </TabsContent>
        <TabsContent value="statistics" className="mt-0">
          <p>Statistics content goes here...</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}


export default Home